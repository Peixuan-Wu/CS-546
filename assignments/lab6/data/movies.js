const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');



const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime,
) => {
  //check title
  await helpers.checkIsProperString(title,"title");
  if(title.trim().length != title.length){
    throw `The provided title has spaces in front or end`
  }
  await helpers.checkIsLetterOrNum(title.replace(/ /g, ""),"title");
  if(title.trim().length<2){
    throw `title must be at least two characters`;
  }

  //check plot
  await helpers.checkIsProperString(plot,"plot");

  //check genres
  if(!genres||!Array.isArray(genres)){
    throw `genres must be an array`;
  }
  if(genres.length == 0){
    throw `genres must have at leat on element`;
  }
  for(var i =0; i<genres.length; i++){
    await helpers.checkIsProperString(genres[i],"genres's element");
    await helpers.checkIsOnlyLetter(genres[i],"genres's element");
    if(genres[i].length<5){
      throw `genres's element  must be at least five characters long`;
    }
  }

  //check rating
  await helpers.checkIsProperString(rating,"rating");
  if(rating!="G" && rating!="PG" && rating!="PG-13" && rating!="R" && rating!="NC-17"){
    throw `rating is not valid`;
  }

  //check studio
  await helpers.checkIsProperString(studio,"studio");
  await helpers.checkIsOnlyLetter(studio.replace(/ /g, ""),"studio");
  if(studio.length<5){
    throw `studio must be at least 5 characters long`;
  }

  //check director
  await helpers.checkIsProperString(director,"director");
  await helpers.checkIsProperName(director.trim(),"director");

  //check castMembers
  if(!castMembers||!Array.isArray(castMembers)){
    throw `castMembers must be an array`;
  }
  if(castMembers.length<1){
    throw `castMembers must have at least on element`;
  }
  for(var i=0; i<castMembers.length; i++){
    await helpers.checkIsProperString(castMembers[i],"castMember's name in array");
    await helpers.checkIsProperName(castMembers[i],"castMember's name in array");
  }

  //check dateReleased
  await helpers.checkIsProperString(dateReleased,"dateReleased");
  await helpers.checkIsProperDate(dateReleased);

  //check runtime
  await helpers.checkIsProperString(runtime,"runtime");
  await helpers.checkIsProperRuntime(runtime);

  // review and overallRatings are set to [] and 0

  //create object
  const movieCollection = await movies();
  let newMovie = {
    title: title.trim(),
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director.trim(),
    castMembers: castMembers,
    dateReleased:  dateReleased,
    runtime: runtime,
    reviews:[],
    overallRating:0
  };

  // insert to database
  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'Could not add movie';
  }
  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  return movie;

};

// getAllMovies(only return id and title)
const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection
  .find({},{projection: {_id: 1, title: 1}})
  .toArray();
  for (var i = 0; i < movieList.length; i++) {
    movieList[i]._id = movieList[i]._id.toString();
  }
  if (!movieList) {
    throw `there is no movie in database`;
  }
  return movieList;
};

// getMoviesByID
const getMovieById = async (movieId) => {
  await helpers.checkIsProperString(movieId,"movieId");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(movieId)});
  if (movie === null) throw 'No movie with that id';
  movie._id = movie._id.toString();

  return movie;

};

const removeMovie = async (movieId) => {
  await helpers.checkIsProperString(movieId,"movieId");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';
  const origin = await getMovieById(movieId);
  const movieCollection = await movies();
  const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(movieId)});
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete dog with id of ${movieId}`;
  }
    return await origin.title+" has been successfully deleted!";
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  // check movieId
  await helpers.checkIsProperString(movieId,"movieId");
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  //check title
  await helpers.checkIsProperString(title,"title");
  if(title.trim().length!=title.length){
    throw `The provided title has spaces in front or end`
  }
  await helpers.checkIsLetterOrNum(title.replace(/ /g, ""),"title");
  if(title.trim().length<2){
    throw `title must be at least two characters`;
  }

  //check plot
  await helpers.checkIsProperString(plot,"plot");

  //check genres
  if(!genres||!Array.isArray(genres)){
    throw `genres must be an array`;
  }
  if(genres.length == 0){
    throw `genres must have at leat on element`;
  }
  for(var i =0; i<genres.length; i++){
    await helpers.checkIsProperString(genres[i],"genres's element");
    await helpers.checkIsOnlyLetter(genres[i],"genres's element");
    if(genres[i].length<5){
      throw `genres's element  must be at least five characters long`;
    }
  }

  //check rating
  await helpers.checkIsProperString(rating,"rating");
  if(rating!="G" && rating!="PG" && rating!="PG-13" && rating!="R" && rating!="NC-17"){
    throw `rating is not valid`;
  }

  //check studio
  await helpers.checkIsProperString(studio,"studio");
  await helpers.checkIsOnlyLetter(studio.replace(/ /g, ""),"studio");
  if(studio.length<5){
    throw `studio must be at least 5 characters long`;
  }

  //check director
  await helpers.checkIsProperString(director,"director");
  await helpers.checkIsProperName(director.trim(),"director");

  //check castMembers
  if(!castMembers||!Array.isArray(castMembers)){
    throw `castMembers must be an array`;
  }
  if(castMembers.length<1){
    throw `castMembers must have at least on element`;
  }
  for(var i=0; i<castMembers.length; i++){
    await helpers.checkIsProperString(castMembers[i],"castMember's name in array");
    await helpers.checkIsProperName(castMembers[i],"castMember's name in array");
  }

  //check dateReleased
  await helpers.checkIsProperString(dateReleased,"dateReleased");
  await helpers.checkIsProperDate(dateReleased);

  //check runtime
  await helpers.checkIsProperString(runtime,"runtime");
  await helpers.checkIsProperRuntime(runtime);

  // check the original movie exists
  let originalMovie = await getMovieById(movieId);
  if(!originalMovie){
    throw`No movie you want to update`;
  }

  const movieCollection = await movies();
  const updatedMovie = {
      title: title,
      plot: plot,
      genres: genres,
      rating: rating,
      studio:studio,
      director: director.trim(),
      castMembers: castMembers,
      dateReleased: dateReleased,
      runtime: runtime
  };

  // check if they are equal movies
  let isEqualMovie = await helpers.checkisEqualMovie(originalMovie, updatedMovie);
  if (isEqualMovie) {
    throw `The provided newMovie cannot be same as the origin movies`;
  }

  // update movie
  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedMovie}
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie successfully';
  }

  return await getMovieById(movieId);

};

const updateOverallRating = async (movieId, newOverallRating) => {
  
  // check movieId
  await helpers.checkIsProperString(movieId);
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  // check newOverallRaing
  if (typeof newOverallRating != 'number') {
    throw `overall rating must be number`;
  }
  if (newOverallRating > 5 || newOverallRating < 0) {
    throw `overall rating out of range`;
  }

  // check the original movie exists
  let originalMovie = await getMovieById(movieId);
  if(!originalMovie){
    throw`No movie you want to update`;
  }

  // create new overallrating
  const movieCollection = await movies();
  const updatedOverallRaingMovie = {
      overallRating: newOverallRating
  };

  // update movie
  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedOverallRaingMovie}
  );

  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update movie successfully';
  }

  return await getMovieById(movieId);

};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  updateOverallRating
};
