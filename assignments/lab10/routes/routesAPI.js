//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data'); //the folder refers to the index.js
const mongoCollections = require('../config/mongoCollections');
const userDb = mongoCollections.user_collection;
const userData = data.users;
let helper = require("../helpers");

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      res.redirect('/protected')
    } else {
      res.render('userLogin', {HTMLtitle: "userLogin-Page"})
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    if (req.session.user) {
      res.redirect('/protected')
    } else {
      res.render('userRegister', {HTMLtitle: "userRegister-Page"})
    }
  })
  .post(async (req, res) => {
    //code here for POST
    username = req.body.usernameInput;
    password = req.body.passwordInput;
    username = username.toLowerCase().trim();
    try {
    await helper.checkIsProperString(username, "usernameInput");
    await helper.checkIsLetterOrNum(username, "usernameInput");
    if (username.length < 4) {
      throw `usernameInput's length should be no less than 4`;
    }

    await helper.checkIsProperString(password, "passwordInput");
    if (password.length < 6) {
      throw `passwordInput's length should be no less than 6`
    }
    await helper.checkIsProperPassword(password, "passwordInput");

    const user_collection = await userDb();
    // check duplicate username
    const checkDuplicateUser = await user_collection.findOne({username: username});

    if (checkDuplicateUser){
      //duplicate exists
      throw "There is a same username, please input another username";
    }
    } catch(e) {
      return res.status(400).render('userRegister', {HTMLtitle: "userRegister-Page", errorMessage:e})
    }

    try {
      await userData.createUser(username, password);
      return res.status(200).redirect('/');
    } catch(e) {
      return res.status(500).json({error: "Internal Server Error"});
    }
    
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    //code here for POST
    username = req.body.usernameInput;
    password = req.body.passwordInput;
    username = username.toLowerCase().trim();
    try {
    await helper.checkIsProperString(username, "usernameInput");
    await helper.checkIsLetterOrNum(username, "usernameInput");
    if (username.length < 4) {
      throw `usernameInput's length should be no less than 4`;
    }

    await helper.checkIsProperString(password, "passwordInput");
    if (password.length < 6) {
      throw `passwordInput's length should be no less than 6`
    }
    await helper.checkIsProperPassword(password, "passwordInput");

    } catch(e) {
      return res.status(400).render('userLogin', {HTMLtitle: "userLogin-Page", errorMessage:e})
    }

    try {
      // to check correct password and username
      await userData.checkUser(username, password);
    } catch(e) {
      return res.status(400).render('userLogin', {HTMLtitle: "userLogin-Page", errorMessage:e})
    }

    try {
      let checkUserResult = await userData.checkUser(username, password);
      if (checkUserResult.authenticatedUser == true) {
        req.session.user = {username: username};
        return res.redirect('/protected');
      }
    } catch(e) {
      return res.status(500).json({error: "Internal Server Error"});
    }

  })

router
  .route('/protected')
  .get(async (req, res) => {
    //code here for GET
    const date = new Date().toUTCString();
    return res.status(200).render('private', {username : req.session.user.username, Date:date, HTMLtitle: "Pretected-Page"})
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout', {HTMLtitle: "Logout-Page"});
  })


module.exports = router;