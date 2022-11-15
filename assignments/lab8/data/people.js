const axios = require('axios');

//Axios call to get all data
const getAllPeople = async () => {
    const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data 
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    const peopleData = await getAllPeople();
    if (!searchPersonName || searchPersonName.trim().length == 0 || typeof searchPersonName != "string") {
        throw `The searchPersonNmae should not be an empty string`
    }   
    searchPersonName = searchPersonName.trim().toLowerCase();
    let peopleMatchResult = [];
    for (var i = 0; i < peopleData.length; i++) {
        let peopleFirstName = peopleData[i].firstName.toLowerCase();
        let peopleLastName = peopleData[i].lastName.toLowerCase();
        if (peopleFirstName.includes(searchPersonName) || peopleLastName.includes(searchPersonName) || searchPersonName == peopleFirstName + " " + peopleLastName) {
            peopleMatchResult.push(peopleData[i]);
        }
    }
    if (peopleMatchResult.length > 20) {
        peopleMatchResult = peopleMatchResult.slice(0,20);
    }
    return peopleMatchResult;

};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    const peopleData = await getAllPeople();
    if (!id || id.trim().length == 0 || typeof id != "string") {
        throw `The id is not valid`
    }

    let peopleById;
    for (var i = 0; i < peopleData.length; i++) {
        if (peopleData[i].id == id) {
            peopleById = peopleData[i];
            break;
        }
    }
    if (!peopleById) {
        throw `People not found by this id`;
    }

    return peopleById;
};

module.exports = { searchPeopleByName, searchPeopleByID };
