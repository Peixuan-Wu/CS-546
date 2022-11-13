const axios = require('axios')


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data // this will be the array of people objects
  }


const getPersonById = async (id) => {

    if(!id){
        throw 'Need to provide a proper id';
    }
    if(typeof id !== 'string'){
        throw 'The id input need to be a string';
    }
    if(id.trim().length === 0){
        throw 'The id cannot be all spaces';
    }
    const persondata = await getPeople();
    for(var i=0; i< persondata.length; i++){
        if(persondata[i]["id"]===id){
            return persondata[i];
        }
    }
    throw 'person not found';

};



const sameJobTitle = async (jobTitle) => {
  if(!jobTitle || jobTitle == null || jobTitle == undefined){
      throw `Need to provide a proper jobTitle`
  }
  if(typeof jobTitle !== 'string'){
      throw 'The jobTitile input need to be a string';
  }
  if(jobTitle.trim().length === 0){
      throw 'The jobTitle cannot be all spaces';
  }
  const personData = await getPeople();
  const sameJobPerson = [];
  for(var i=0; i<personData.length; i++){
      if(personData[i]["job_title"].toLowerCase()=== jobTitle.toLowerCase()){
          sameJobPerson.push(personData[i]);
      }
  }
  if(sameJobPerson.length==0){
      throw `the job title doesn't exist`
  }
  if(sameJobPerson.length<2){
      throw `there are not two people with that job title`
  }
  return sameJobPerson;
};


const getPostalCodes = async (city, state) => {
  if(!city || city === null || city === undefined){
      throw `Need to provide a proper city`
  }
  if(!state || state === null || state === undefined){
      throw `Need to provide a proper state`
  }
  if(typeof city !== 'string'){
      throw 'The city input need to be a string';
  }
  if(typeof state !== 'string'){
      throw 'The state input need to be a string';
  }
  if(city.trim().length === 0){
      throw 'The city cannot be all spaces';
  }
  if(state.trim().length === 0){
      throw 'The state cannot be all spaces';
  }
  const personData = await getPeople();
  const postCode = [];
  for(var i=0; i<personData.length; i++){
      if(personData[i]["state"].toLowerCase()===state.toLowerCase()){
          if(personData[i]["city"].toLowerCase()===city.toLowerCase()){
              postCode.push(Number(personData[i]["postal_code"]))
          }
      }
  }
  if(postCode.length == 0){
      throw `There are no postal_codes for the given city and state combination `
  }
  return postCode.sort();

};

const sameCityAndState = async (city, state) => {
  if(!city || city === null || city === undefined){
      throw `Need to provide a proper city`
  }
  if(!state || state === null || state === undefined){
      throw `Need to provide a proper state`
  }
  if(typeof city !== 'string'){
      throw 'The city input need to be a string';
  }
  if(typeof state !== 'string'){
      throw 'The state input need to be a string';
  }
  if(city.trim().length === 0){
      throw 'The city cannot be all spaces';
  }
  if(state.trim().length === 0){
      throw 'The state cannot be all spaces';
  }
  const personData = await getPeople();
  const personName = [];
  for(var i=0; i<personData.length; i++){
      if(personData[i]["state"].toLowerCase()===state.toLowerCase()){
          if(personData[i]["city"].toLowerCase()===city.toLowerCase()){
              personName.push(personData[i]["first_name"]+' '+personData[i]["last_name"])
          }
      }
  }
  if(personName.length === 0){
      throw `there is no people live in this city and state`
  }
  if(personName.length <2){
      throw  `there are not two people who live in the same city and state`
  }
  return personName.sort(function(name1,name2){
      let name1Position = name1.indexOf(' ')+1;
      let name2Position = name2.indexOf(' ')+1;
      return name1Position-name2Position
  });

};

async function main(){
  console.log(await getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440")); 
  console.log(await sameJobTitle("Help Desk Operator")); 

  console.log(await getPostalCodes("Salt Lake City", "Utah")); //Returns: [84130, 84135, 84145]);
  // console.log(await getPostalCodes()); // Throws Error
  // console.log(await getPostalCodes(13, 25)); // Throws Error
  // console.log(await getPostalCodes("Bayside", "New York")); //Throws Error: There are no postal_codes for the given city and state combination
 
  console.log(await sameCityAndState("Salt Lake City", "Utah")); // Returns: ['Vonnie Faichney', 'Townie Sandey',  'Eolande Slafford'])
  // console.log(await sameCityAndState()); // Throws Error
  // console.log(await sameCityAndState("    " , "      ")); // Throws Error
  // console.log(await sameCityAndState(2, 29)); // Throws Error
  // console.log(await sameCityAndState("Bayside", "New York")); // Throws Error: there are not two people who live in the same city and state
}

main()