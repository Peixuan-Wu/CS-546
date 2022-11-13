//require express and express router as shown in lecture code
const {ObjectId} = require('mongodb');
const express = require('express');  
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const helpers = require('../helpers');


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const movieShorList = await movieData.getAllMovies();
      res.json(movieShorList);  
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const moviePostData = req.body;

    // input check
    try {
      if (!moviePostData) {
        throw `you must provide request body`;
      } 
      // check and operate title
      await helpers.checkIsProperString(moviePostData.title, "moviePostData.title");
      moviePostData.title = moviePostData.title.trim(); // trim the title input
      await helpers.checkIsLetterOrNum(moviePostData.title.replace(/ /g, ""),"moviePostData.title");
      if(moviePostData.title.length<2){
        throw `title must be at least two characters`;
      }
      // check plot
      await helpers.checkIsProperString(moviePostData.plot,"moviePostData.plot");

      // check genres
      if(!moviePostData.genres||!Array.isArray(moviePostData.genres)){
        throw `genres must be an array`;
      }
      if(moviePostData.genres.length == 0){
        throw `genres must have at leat on element`;
      }
      for(var i =0; i<moviePostData.genres.length; i++){
        await helpers.checkIsProperString(moviePostData.genres[i],"genres's element");
        await helpers.checkIsOnlyLetter(moviePostData.genres[i],"genres's element");
        if(moviePostData.genres[i].length<5){
          throw `genres's element  must be at least five characters long`;
        }
      }

      // check rating
      await helpers.checkIsProperString(moviePostData.rating, "moviePostData.rating");
      if(moviePostData.rating!="G" && moviePostData.rating!="PG" && moviePostData.rating!="PG-13" && moviePostData.rating!="R" && moviePostData.rating!="NC-17"){
        throw `rating is not valid`;
      }
      
      // check studio
      await helpers.checkIsProperString(moviePostData.studio, "moviePostData.studio");
      await helpers.checkIsOnlyLetter(moviePostData.studio.replace(/ /g, ""),"studio");
      if(moviePostData.studio.length<5){
        throw `studio must be at least 5 characters long`;
      }

      // check director
      await helpers.checkIsProperString(moviePostData.director, "moviePostData.director");
      moviePostData.director = moviePostData.director.trim();
      await helpers.checkIsProperName(moviePostData.director,"director");
      
      // check castMembers
      if(!moviePostData.castMembers||!Array.isArray(moviePostData.castMembers)){
        throw `castMembers must be an array`;
      }
      if(moviePostData.castMembers.length<1){
        throw `castMembers must have at least on element`;
      }
      for(var i=0; i<moviePostData.castMembers.length; i++){
        await helpers.checkIsProperString(moviePostData.castMembers[i],"castMember's name in array");
        await helpers.checkIsProperName(moviePostData.castMembers[i],"castMember's name in array");
      }

      // check dataReleased
      await helpers.checkIsProperString(moviePostData.dateReleased,"dateReleased");
      await helpers.checkIsProperDate(moviePostData.dateReleased);

      // check runtime
      await helpers.checkIsProperString(moviePostData.runtime,"runtime");
      await helpers.checkIsProperRuntime(moviePostData.runtime);

    } catch (e) {
      return res.status(400).json({error: e});
    }

    // create new movie in the database
    try {
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = moviePostData;
      const newMovie = await movieData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(newMovie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    // check the request movieId
    try {
      await helpers.checkIsProperString(req.params.movieId, "moviedId");
      req.params.movieId = req.params.movieId.trim();
      if (!ObjectId.isValid(req.params.movieId)) {
        throw `request ID invalid object ID`;
      }
    } catch(e) {
      return res.status(400).json({error: e});
    }

    // get requested movie from database
    try {
      const getMovie = await movieData.getMovieById(req.params.movieId);
      res.json(getMovie);
    } catch(e) {
      res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    // check and operate movieId
    try {
      await helpers.checkIsProperString(req.params.movieId, "moviedId url param");
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

    // remove the movie
    try {
      await movieData.removeMovie(req.params.movieId);
      res.status(200).json({movieId: req.params.movieId, deleted: true});
    } catch (e) {
      res.status(500).json({error: e});
    }
    
  })
  .put(async (req, res) => {
    //code here for PUT
    const updatedMovie = req.body;
    try {
      // check and operate the movieId
      await helpers.checkIsProperString(req.params.movieId, "moviedId url param");
      req.params.movieId = req.params.movieId.trim();
      if (!ObjectId.isValid(req.params.movieId)) throw `Error: request ID invalid object ID`;
  
      
      // check and operate title
      await helpers.checkIsProperString(updatedMovie.title, "updatedMovie.title");
      updatedMovie.title = updatedMovie.title.trim(); // trim the title input
      await helpers.checkIsLetterOrNum(updatedMovie.title.replace(/ /g, ""),"title");
      if(updatedMovie.title.length<2){
        throw `updatedMovie title must be at least two characters`;
      }

      // check plot
      await helpers.checkIsProperString(updatedMovie.plot, "updatedMovie.plot");

      // check genres
      if(!updatedMovie.genres||!Array.isArray(updatedMovie.genres)){
        throw `genres must be an array`;
      }
      if(updatedMovie.genres.length == 0){
        throw `genres must have at leat on element`;
      }
      for(var i =0; i<updatedMovie.genres.length; i++){
        await helpers.checkIsProperString(updatedMovie.genres[i],"genres's element");
        await helpers.checkIsOnlyLetter(updatedMovie.genres[i],"genres's element");
        if(updatedMovie.genres[i].length<5){
          throw `genres's element  must be at least five characters long`;
        }
      }

      // check rating
      await helpers.checkIsProperString(updatedMovie.rating, "updatedMovie.rating");
      if(updatedMovie.rating!="G" && updatedMovie.rating!="PG" && updatedMovie.rating!="PG-13" && updatedMovie.rating!="R" && updatedMovie.rating!="NC-17"){
        throw `rating is not valid`;
      }

      // check studio
      await helpers.checkIsProperString(updatedMovie.studio, "updatedMovie.studio");
      await helpers.checkIsOnlyLetter(updatedMovie.studio.replace(/ /g, ""),"studio");
      if(updatedMovie.studio.length<5){
        throw `studio must be at least 5 characters long`;
      }

      // check and operate director
      await helpers.checkIsProperString(updatedMovie.director, "updatedMovie.director");
      updatedMovie.director = updatedMovie.director.trim();
      await helpers.checkIsProperName(updatedMovie.director,"director");

      // check castMembers
      if(!updatedMovie.castMembers||!Array.isArray(updatedMovie.castMembers)){
        throw `castMembers must be an array`;
      }
      if(updatedMovie.castMembers.length<1){
        throw `castMembers must have at least on element`;
      }
      for(var i=0; i<updatedMovie.castMembers.length; i++){
        await helpers.checkIsProperString(updatedMovie.castMembers[i],"castMember's name in array");
        await helpers.checkIsProperName(updatedMovie.castMembers[i],"castMember's name in array");
      }

      // check dataReleased
      await helpers.checkIsProperString(updatedMovie.dateReleased,"dateReleased");
      await helpers.checkIsProperDate(updatedMovie.dateReleased);
 
      // check runtime
      await helpers.checkIsProperString(updatedMovie.runtime,"runtime");
      await helpers.checkIsProperRuntime(updatedMovie.runtime);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    // check the id is exist in database
    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json({error: 'Movie not found'});
    }
    // check isEqualMovie
    try {
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = updatedMovie
      let newMovie = {
        title: title,
        plot: plot,
        genres: genres,
        rating: rating,
        studio:studio,
        director: director.trim(),
        castMembers: castMembers,
        dateReleased: dateReleased,
        runtime: runtime
      }
      let originMovie = await data.movies.getMovieById(req.params.movieId)
      if (await helpers.checkisEqualMovie(newMovie, originMovie)) {
        throw `the new movie are completely same as the original movie`
      }
    } catch(e) {
      return res.status(400).json({error: e});
    }
    // update movie
    try {
      const {title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime} = updatedMovie;
      const afterUpdatedMovie = await movieData.updateMovie(req.params.movieId,title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(afterUpdatedMovie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

module.exports = router;