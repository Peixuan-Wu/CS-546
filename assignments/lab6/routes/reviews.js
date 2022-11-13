//require express and express router as shown in lecture code
const express = require('express');  
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const reviewData = data.reviews;
const helpers = require('../helpers');
const {ObjectId} = require('mongodb');

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    // check and operate movieId
    try {
      await helpers.checkIsProperString(req.params.movieId, "moviedId");
      req.params.movieId = req.params.movieId.trim();
      if (!ObjectId.isValid(req.params.movieId)) throw `Error: request ID invalid object ID`;
    } catch(e) {
      return res.status(400).json({error: e});
    }

    // check the movieId is exist in database
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'movie not found'});
    }

    // extrac reviews from this movie
    try {
      const reviewList = await reviewData.getAllReviews(req.params.movieId);
      res.json(reviewList);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const addReviewData = req.body;
    // check and operate movieId
    try {
      await helpers.checkIsProperString(req.params.movieId, "moviedId");
      req.params.movieId = req.params.movieId.trim();
      if (!ObjectId.isValid(req.params.movieId)) throw `Error: request ID invalid object ID`;
    } catch(e) {
      return res.status(400).json({error: e});
    }

    // check the movieId is exist in database
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'movie not found'});
    }

    // input check
    // check and modify reviewTitle
    try {
      await helpers.checkIsProperString(addReviewData.reviewTitle, "addReviewData.reviewTitle");
      addReviewData.reviewTitle = addReviewData.reviewTitle.trim();
      if(addReviewData.reviewTitle.length<2){
        throw `reviewTitle must be at least two characters`;
      }

    // check and modify reviewerName
      await helpers.checkIsProperString(addReviewData.reviewerName, "reviewerName");
      addReviewData.reviewerName = addReviewData.reviewerName.trim();
      await helpers.checkIsProperName(addReviewData.reviewerName, "reviewerName");

    // check review
      await helpers.checkIsProperString(addReviewData.review, "review");

    // check and modify rating
      await helpers.checkIsProperRating(addReviewData.rating, "rating");
      addReviewData.rating = Math.round(addReviewData.rating * 10) / 10;

    } catch(e) {
      return res.status(400).json({error: e});
    }

    // post review
    try {
      // add review
      const {reviewTitle, reviewerName, review, rating} = addReviewData;
      await reviewData.createReview(req.params.movieId, reviewTitle, reviewerName, review, rating);

      // caulc overall rating
      const addReviewMovieReviewList = await reviewData.getAllReviews(req.params.movieId);
      let overallRatingAfterAdd = 0;
      for (var i = 0; i < addReviewMovieReviewList.length; i++) {
        overallRatingAfterAdd = overallRatingAfterAdd + addReviewMovieReviewList[i].rating;
      }
      overallRatingAfterAdd = (overallRatingAfterAdd / addReviewMovieReviewList.length);
      const movieAfterAddReview = await movieData.updateOverallRating(req.params.movieId, overallRatingAfterAdd);
      res.json(movieAfterAddReview);

    } catch(e) {
      return res.status(500).json({error: e});
    }
    
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET

    // check and operate reviewId
    try {
      await helpers.checkIsProperString(req.params.reviewId, "reviewId");
      req.params.reviewId = req.params.reviewId.trim();
      if (!ObjectId.isValid(req.params.reviewId)) throw `Error: request ID invalid object ID`;
    } catch(e) {
      return res.status(400).json({error: e});
    }

    // get review
    try {
      const getReview = await reviewData.getReview(req.params.reviewId);
      res.json(getReview);
    } catch(e) {
      return res.status(404).json({error: "This review doesn't exist"});
    }

  })
  .delete(async (req, res) => {
    //code here for DELETE

    // check and operate reviewId
    try {
      await helpers.checkIsProperString(req.params.reviewId, "reviewId");
      req.params.reviewId = req.params.reviewId.trim();
      if (!ObjectId.isValid(req.params.reviewId)) throw `Error: request ID invalid object ID`;
    } catch(e) {
      return res.status(400).json({error: e});
    }

    // check the review exist
    try {
      await reviewData.getReview(req.params.reviewId);
    } catch(e) {
      return res.status(404).json({error: "This review doesn't exist"});
    }

    // delete the review
    try {
      // delete the review 
      let movieAfterDeleteReview = await reviewData.removeReview(req.params.reviewId);

      // caulc overall rating
      const deleteReviewMovieReviewList = movieAfterDeleteReview.reviews;
      let overallRatingAfterDelete = 0
      if (deleteReviewMovieReviewList.length == 0) {
        overallRatingAfterDelete = 0;
      } else {
        for (var i = 0; i < deleteReviewMovieReviewList.length; i++) {
          overallRatingAfterDelete = overallRatingAfterDelete + deleteReviewMovieReviewList[i].rating;
        }
        overallRatingAfterDelete = overallRatingAfterDelete / deleteReviewMovieReviewList.length;
      }
      
      // update overall rating
      movieAfterDeleteReview = await movieData.updateOverallRating(movieAfterDeleteReview._id, overallRatingAfterDelete);
      res.json(movieAfterDeleteReview);

    } catch(e) {
      return res.status(500).json({error: e});
    }

  });


module.exports = router;