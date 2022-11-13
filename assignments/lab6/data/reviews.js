const { ObjectId } = require("mongodb");
const { getMovieById } = require("./movies");
const helpers = require('../helpers');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;


const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  // check movieId
  await helpers.checkIsProperString(movieId, "id");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  // check reviewTitle
  await helpers.checkIsProperString(reviewTitle, "reviewTitle");
  if(reviewTitle.trim().length != reviewTitle.length){
    throw `The provided reviewTitle has spaces in front or end`
  }
  if(reviewTitle.length<2){
    throw `reviewTitle must be at least two characters`;
  }

  // check reviewerName
  await helpers.checkIsProperString(reviewerName, "reviewerName");
  await helpers.checkIsProperName(reviewerName.trim(), "reviewerName");

  // check review
  await helpers.checkIsProperString(review, "review");

  // check rating
  await helpers.checkIsProperRating(rating, "rating");
  rating = Math.round(rating * 10) / 10;

  // create review date variable
  let nowDate = new Date();
  let reviewDate = (nowDate.getMonth() + 1) + "/" + nowDate.getDate() + "/" + nowDate.getFullYear();
  
  // create reiew object

  const movieCollection = await movies(); 
  let reviewId = ObjectId();
  let newReview = {
    _id: reviewId,
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName.trim(),
    review: review,
    rating: rating
  };

  // insert to database
 
  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$push: {
      reviews:newReview
      }
    }
  )

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie review successfully';
  }

  return await getReview(reviewId.toString());

};

const getAllReviews = async (movieId) => {

  // check the movieId
  await helpers.checkIsProperString(movieId, "movieId");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  let movie = await getMovieById(movieId); // if doesn't exist throw


  // extract reviews from one movie
  reviewList = movie.reviews;
  for (var i = 0; i < reviewList.length; i++) {
    reviewList[i]._id = reviewList[i]._id.toString();
  }

  return reviewList;
};

const getReview = async (reviewId) => {

  // check reviewId
  await helpers.checkIsProperString(reviewId, "reviewId");
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';

  const movieCollection = await movies();
  const movieWithReview = await movieCollection.findOne({'reviews._id': ObjectId(reviewId)});

  if (!movieWithReview) {
    throw `No movie with that review`
  };
  let movieWithReviewObjectId = movieWithReview['_id'];
  let movieWithReviewId = movieWithReviewObjectId.toString();

  let reviewList = await getAllReviews(movieWithReviewId);

  for (var i = 0; i < reviewList.length; i++) {
    if (reviewList[i]._id === reviewId) {
      return reviewList[i];
    }
  }

  // if not return throw(dead code)
  // throw 'No movie with that review';
};

const removeReview = async (reviewId) => {
  // check reviewId
  await helpers.checkIsProperString(reviewId,"reviewId");
  reviewId = reviewId.trim();
  if (!ObjectId.isValid(reviewId)) throw 'invalid object ID';

  // find the movie with that review
  const movieCollection = await movies();
  const movieWithReview = await movieCollection.findOne({'reviews._id': ObjectId(reviewId)});
  if (movieWithReview === null) throw 'No movie with that review';
  let movieWithReviewObjectId = movieWithReview._id;

  // delete the review from this movie
  const updatedInfo = await movieCollection.updateOne(
    {_id: movieWithReviewObjectId},
    {
      $pull: {reviews:{ _id: ObjectId(reviewId)}}
    }
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not remove review successfully';
  }

  return await getMovieById(movieWithReviewObjectId.toString());

};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
