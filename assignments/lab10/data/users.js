const helper = require('../helpers');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const mongoCollections = require('../config/mongoCollections');
const userDb = mongoCollections.user_collection;
const {ObjectId} = require('mongodb');


const createUser = async (username, password) => {
  username = username.toLowerCase().trim();
  await helper.checkIsProperString(username, "username");
  await helper.checkIsLetterOrNum(username, "username");
  if (username.length < 4) {
    throw `Username's length should be no less than 4`;
  }

  await helper.checkIsProperString(password, "password");
  if (password.length < 6) {
    throw `Password's length should be no less than 6`
  }
  await helper.checkIsProperPassword(password, "password");
  const hash = await bcrypt.hash(password, saltRounds);
  let newUser = {
    username: username,
    password: hash
  }
  const user_collection = await userDb();

  // check duplicate username
  const checkDuplicateUser = await user_collection.findOne({username: username});

  if (checkDuplicateUser){
    //duplicate exists
    throw "There is a same username, please input another username";
  }

  // insert to database
  const insertInfo = await user_collection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId){
    throw 'Could not add new user';
  }

  return {insertedUser: true};
};

const checkUser = async (username, password) => {
  username = username.toLowerCase().trim();
  await helper.checkIsProperString(username, "username");
  await helper.checkIsLetterOrNum(username, "username");
  if (username.length < 4) {
    throw `Username's length should be no less than 4`;
  }

  await helper.checkIsProperString(password, "password");
  if (password.length < 6) {
    throw `Password's length should be no less than 6`
  }
  await helper.checkIsProperPassword(password, "password");

  const hash = await bcrypt.hash(password, saltRounds);

  const user_collection = await userDb();

  // check username exist
  const checkDuplicateUser = await user_collection.findOne({username: username});

  // no this user
  if (!checkDuplicateUser){
    throw "Either the username or password is invalid";
  }

  let samePassword = false;
  try {
    samePassword = bcrypt.compare(password, checkDuplicateUser.password);
  } catch(e) {
    throw `${e}`;
  }
  if (!samePassword) {
    throw "Either the username or password is invalid";
  } else {
    return {authenticatedUser: true};
  }

};

module.exports = {
  createUser,
  checkUser
};
