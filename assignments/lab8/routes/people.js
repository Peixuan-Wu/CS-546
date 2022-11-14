//Require express and express router as shown in lecture code and worked in previous labs
const path = require('path');
const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;

router.route("/").get(async (req, res) => {
  //code here for GET
  res.sendFile(path.resolve('./static/homepage.html'));
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST

  const postData = req.body;
  const searchPersonName = postData.searchPersonName;
  let matchedPeople;

  // if user input empty string, send 400, and render error page
  try {
    matchedPeople = await peopleData.searchPeopleByName(searchPersonName);
  } catch (e) {
    res.status(400).render('error', {error: e, HTMLtitle: "Error"});
    return;
  }

  // if no person found by the string, send 404 and render notfound page
  if (matchedPeople.length == 0) {
    res.status(404).render('personNotFound', {searchPersonNameOrId: searchPersonName, HTMLtitle: "Not found"});
    return;
  }

  res.render('peopleFound', {resultPeople:matchedPeople, searchPersonName: searchPersonName, HTMLtitle: "People Found"});
  return;
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  let id = req.params.id;
  id = id.trim();

  // check the id is valid
  try {
    
    if (!id || id.length == 0 || typeof id != "string") {
      throw `You input a invalid ID`;
    }
    
    if (parseInt(id) < 0) {
      throw  `Your Id is a negative number`;
    }
    for (var i = 0; i < id.length ;i++) {
      if (!(id.charCodeAt(i) >=48 && id.charCodeAt(i) <= 57)) {
        throw `Your id is not whole number`;
      }
    } 
  } catch(e) {
    res.status(400).render('error', {error: e, HTMLtitle: "error"});
    return;
  }

  // check is person exist or send 404
  try {
    await peopleData.searchPeopleByID(id);
  } catch(e) {
    res.status(404).render('personNotFound', {searchPersonNameOrId: id, HTMLtitle: "Not Found"});
    return;
  }

  try {
    const personById = await peopleData.searchPeopleByID(id);
    res.render('personFoundById', {personById: personById, HTMLtitle:"Person Found"});
    return;
  } catch(e) {
    res.status(500).json({error: e});
  }
});

module.exports = router;