/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
// Mean Tests
const stringUtils = require('./stringUtils');
const arrayUtils = require('./arrayUtils');
const objectUtils = require('./objectUtils');

// arrayStats
try {
    // Should Pass
    console.log(arrayUtils.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(arrayUtils.arrayStats([]));
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }



 // makeObjects
try {
    // Should Pass
    console.log(arrayUtils.makeObjects([4, 1], [1, 2]));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(arrayUtils.makeObjects("banana)"));
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }


 // commonElements
 try {
    // Should Pass
    const arr1 = [5, 7]; 
    const arr2 = [20, 5]; 
    const arr3 = [true, 5, 'Patrick']; 
    const arr4 = ["CS-546", 'Patrick']; 
    const arr5 = [67.7, 'Patrick', true]; 
    const arr6 = [true, 5, 'Patrick']; 
    const arr7 = [undefined, 5, 'Patrick']; 
    const arr8 = [null, undefined, true];
    const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
    const arr10= [["foo", "bar"], true, "String", 10]
    console.log(arrayUtils.commonElements(arr1, arr2));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const arr1 = [5, 7]; 
    const arr2 = [20, 5]; 
    const arr3 = [true, 5, 'Patrick']; 
    const arr4 = ["CS-546", 'Patrick']; 
    const arr5 = [67.7, 'Patrick', true]; 
    const arr6 = [true, 5, 'Patrick']; 
    const arr7 = [undefined, 5, 'Patrick']; 
    const arr8 = [null, undefined, true];
    const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
    const arr10= [["foo", "bar"], true, "String", 10]
    console.log(arrayUtils.commonElements());
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }

 // palindromes
 try {
    // Should Pass
    console.log(stringUtils.palindromes('Wow! Did you see that racecar go?'));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(stringUtils.palindromes("    "));
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }


 // replaceChar
 try {
    // Should Pass
    console.log(stringUtils.replaceChar("Daddy")); // Returns: "D*d$y"
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(stringUtils.replaceChar("")); // Throws Error
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }


 // charSwap
 try {
    // Should Pass
    console.log(stringUtils.charSwap("Patrick", "Hill")); //Returns "Hillick Patr"
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(stringUtils.charSwap()); // Throws Error
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }


 // deepEquality
 try {
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    // Should Pass
    console.log(objectUtils.deepEquality(first, second)); // false
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    // Should Fail
    console.log(objectUtils.deepEquality([1,2,3], [1,2,3]));
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }


 // commonKeysValues
 try {
    const first = {name: {first: "Patrick", last: "Hill"}, age: 46}
    const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
    const third = {a: 2, b: {c: true, d: false}};
    const forth = {b: {c: true, d: false}, foo: "bar"};

    // Should Pass
    console.log(objectUtils.commonKeysValues(first, second));// returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"}
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    const first = {name: {first: "Patrick", last: "Hill"}, age: 46}
    const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
    const third = {a: 2, b: {c: true, d: false}};
    const forth = {b: {c: true, d: false}, foo: "bar"};
    // Should Fail
    console.log(objectUtils.commonKeysValues([1,2,3], [1,2,3]));// throws error
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }



 // calculateObject
 try {
    // Should Pass
    console.log(objectUtils.calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    console.log(objectUtils.calculateObject({ a: 'x', b: 7, c: 5 }, n => n * 2))
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }