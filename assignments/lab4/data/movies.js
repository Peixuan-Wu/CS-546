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
  runtime
) => {
  //check title
  await helpers.checkIsProperString(title,"title");
  if(title.trim().length!=title.length){
    throw `The provided title has spaces in front or end`
  }
  await helpers.checkIsLetterOrNum(title.replace(/ /g, ""),"title");
  if(title.length<2){
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
  await helpers.checkIsProperName(director,"director");

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

  //create object
  const movieCollection = await movies();
  let newMovie = {
    title: title.trim(),
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased:  dateReleased,
    runtime: runtime
  };

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'Could not add movie';
  }
  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  for (var i = 0; i < movieList.length; i++) {
    movieList[i]._id = movieList[i]._id.toString();
  }
  return movieList;
};

const getMovieById = async (id) => {
  await helpers.checkIsProperString(id,"id");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({_id: ObjectId(id)});
  if (movie === null) throw 'No movie with that id';
  movie._id = movie._id.toString();

  return movie;

};

const removeMovie = async (id) => {
  await helpers.checkIsProperString(id,"id");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const origin = await getMovieById(id);
  const movieCollection = await movies();
  const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(id)});
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete dog with id of ${id}`;
  }
    return await origin.title+" has been successfully deleted!";
};

const renameMovie = async (id, newName) => {
  await helpers.checkIsProperString(id,"id");
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  await helpers.checkIsProperString(newName,"newName");
  if(newName.trim().length!=newName.length){
    throw `The provided title has spaces in front or end`
  }
  await helpers.checkIsLetterOrNum(newName.replace(/ /g, ""),"newName");
  if(newName.length<2){
    throw `newName must be at least two characters`;
  }
  let originalMovie = await getMovieById(id);
  if(!originalMovie){
    throw`No movie you want to update`;
  }
  if(newName === originalMovie.title){
    throw `The provided newName cannot be same as current name`;
  }
  const movieCollection = await movies();
  const updatedMovie = {
      title: newName,
  };

  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updatedMovie}
  );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update movie successfully';
    }

    return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
