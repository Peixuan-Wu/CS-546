// name: Peixuan Wu
// class: CS546-C

const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data // this will be the array of people objects
  }

async function getCompany(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data
}


const listEmployees = async (companyName) => {
  if(!companyName){
    throw 'Need to provide a proper companyName';
  }
  if(typeof companyName !== 'string'){
    throw 'The companyName input need to be a string';
  }
  if(companyName.trim().length === 0){
    throw 'The companyName cannot be all spaces';
  }
  const personData = await getPeople();
  const companyData = await getCompany();
  let listEmployeesResult = {};
  for(var i=0; i<companyData.length; i++){
    if(companyData[i]["name"].toLowerCase()===companyName.toLowerCase()){
      listEmployeesResult = companyData[i];
    }
  }
  if(Object.keys(listEmployeesResult).length == 0){
    throw `No company name with ${companyName}`
  }
  const companyID = listEmployeesResult["id"];
  const employeesArray = [];
  for(var i=0; i<personData.length; i++){
    if(companyID === personData[i]["company_id"]){
      employeesArray.push(personData[i]["first_name"]+' '+personData[i]["last_name"])
    }
  }
  
  listEmployeesResult["employees"] = employeesArray.sort(function(name1,name2){
  let name1Position = name1.indexOf(' ')+1;
  let name2Position = name2.indexOf(' ')+1;
  let name1Last = name1.slice(name1Position,);
  let name2Last = name2.slice(name2Position,)
  if(name1Last===name2Last){
    return 0;
  }
  if(name1Last.length>name2Last.length){
    if(name1Last.slice(0,name2Last.length)===name2Last){
        return 1;
    }
  }else if(name1Last.length<name2Last.length){
    if(name2Last.slice(0,name1Last.length)===name1Last){
        return -1;
    }   
  }
  while(name1.charCodeAt(name1Position)===name2.charCodeAt(name2Position)){
        if(name1.length-1>=name1Position+1){
            name1Position+=1;
        }
        if(name2.length-1>=name2Position+1){
            name2Position+=1;
        }
    }
  return name1.charCodeAt(name1Position)-name2.charCodeAt(name2Position);
})
  // employeesArray.sort(function(name1,name2){
  //   let name1Position = name1.indexOf(' ')+1;
  //   let name2Position = name2.indexOf(' ')+1;
  //   return name1.charCodeAt(name1Position)-name2.charCodeAt(name2Position);
  //   });
  return listEmployeesResult;
};

const sameIndustry = async (industry) => {
  if(!industry){
    throw 'Need to provide a proper industry';
  }
  if(typeof industry !== 'string'){
    throw 'The industry input need to be a string';
  }
  if(industry.trim().length === 0){
    throw 'The industry cannot be all spaces';
  }
  const companyData = await getCompany();
  const sameIndustryResult = []
  for(var i=0; i<companyData.length; i++){
    if(companyData[i]["industry"].toLowerCase()===industry.toLowerCase()){
      sameIndustryResult.push(companyData[i]);
    }
  }
  if(sameIndustryResult.length === 0){
    throw `No companies in that industry`;
  }
  return sameIndustryResult;
};

const getCompanyById = async (id) => {
  if(!id){
    throw 'Need to provide a proper id';
  }
  if(typeof id !== 'string'){
    throw 'The id input need to be a string';
  }
  if(id.trim().length === 0){
    throw 'The id cannot be all spaces';
  }
  const companyData = await getCompany();
  for(var i=0; i< companyData.length; i++){
    if(companyData[i]["id"]===id){
        return companyData[i];
    }  
  }
  throw `company not found`;
};

module.exports = {
  listEmployees,
  sameIndustry,
  getCompanyById
};
