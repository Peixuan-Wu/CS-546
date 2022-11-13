/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/

const people = require("./people");
const companies = require("./companies");

async function main(){
    // getPersonById
    try{
        console.log(await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPersonById(-1)); 
    }catch(e){
        console.log (e);
    }
    
    try{
        console.log(await people.getPersonById()); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff')); 
    }catch(e){
        console.log (e);
    }
    console.log("//////////////////////////////////////////////////")
    // sameJobTitle(jobTitle)
    try{
        console.log(await people.sameJobTitle("help Desk Operator")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameJobTitle()); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameJobTitle("farmer")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameJobTitle(123)); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameJobTitle(["Help Desk Operator"])); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameJobTitle(true)); 
    }catch(e){
        console.log (e);
    }

    console.log("//////////////////////////////////////////////////")


    // getPostalCodes(city, state)
    try{
        console.log(await people.getPostalCodes("Salt Lake City", "Utah")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPostalCodes("salt lake CIty", "Utah")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPostalCodes()); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPostalCodes(13, 25)); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.getPostalCodes("Bayside", "New York")); 
    }catch(e){
        console.log (e);
    }

    console.log("//////////////////////////////////////////////////");

    // sameCityAndState(city, state);
    try{
        console.log(await people.sameCityAndState("Salt Lake City", "Utah")); 
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameCityAndState());
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameCityAndState("    " , "      "));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameCityAndState("Bayside", "New York"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await people.sameCityAndState(2, 29));
    }catch(e){
        console.log (e);
    }

    console.log("//////////////////////////////////////////////////");

    // listEmployees(companyName)
    try{
        console.log(await companies.listEmployees("Yost, Harris and Cormier"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees("Kemmer-Mohr"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees("Will-Harvey"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees("foobar"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees(123));
    }catch(e){
        console.log (e);
    }

    console.log("//////////////////////////////////////////////////");
    // sameIndustry(industry)
    try{
        console.log(await companies.sameIndustry('auto Parts:O.E.M.'));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees(43));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees('Foobar Industry'));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees(' '));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.listEmployees());
    }catch(e){
        console.log (e);
    }

    console.log("//////////////////////////////////////////////////");
    //getCompanyById(id)

    try{
        console.log(await companies.getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf"));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.getCompanyById(-1));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.getCompanyById(1001));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.getCompanyById());
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.getCompanyById('7989fa5e-5617-43f7-a931-46036f9dbcff'));
    }catch(e){
        console.log (e);
    }

    try{
        console.log(await companies.getCompanyById("Fb90892a-f7b9-4687-b497-d3b4606faddf"));
    }catch(e){
        console.log (e);
    }




}



// call main
main();
