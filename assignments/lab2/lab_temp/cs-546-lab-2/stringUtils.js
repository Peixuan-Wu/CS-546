/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let description = 'This is a stringUtils.js for lab2';
function checkIsProperStr(str){
      if(typeof str !== 'string'){
            throw `provided argument is not a string`;
      }
      if(str === undefined || str === null ){
            throw `provided string is not valid string`;
  
      }
      if(str.trim()==="" || str === ""){
            throw `provided string is empty or only contain space`;
      }     
  }
  
  function isPalindrome(str){
      for(var x = 0; x<str.length;x++){
      let start = 0;
      let end = str.length-1;
      if(str.length == 1){
            return true;
      }
      else{
            while(start<end){
            if(96<str.charCodeAt(start) && str.charCodeAt(start)<123 || 64<str.charCodeAt(start) && str.charCodeAt(start)<91 ){
                  if(96<str.charCodeAt(end) && str.charCodeAt(end)<123 || 64<str.charCodeAt(end) && str.charCodeAt(end)<91 ){
                        if(Math.abs(str.charCodeAt(start)-str.charCodeAt(end))!=32 && Math.abs(str.charCodeAt(start)-str.charCodeAt(end))!=0 ){
                              return false;
                        }
                  }else{
                        end--;
                        continue
                  }
            }else{
                  start++;
                  continue
            }
            start++;
            end--;
      }
      return true;   
      }
  }
  }
  
  function keepOnlyLetter(str){
          let last = str.length-1
          if(96<str.charCodeAt(last) && str.charCodeAt(last)<123 || 64<str.charCodeAt(last) && str.charCodeAt(last)<91 ){
                  str = str;
            }else{
                  str = str.substr(0,last)
            }
            return str;   
      }
  
  
  
  // These are the functions will export.
  //a-z 97-122 A-Z: 65-90
  let palindromes = (string) => {
      checkIsProperStr(string);
      let strArray = string.split(" ");
      let result = [];
      for(var x = 0;x<strArray.length;x++){
            if(isPalindrome(strArray[x])){
                  result.push(keepOnlyLetter(strArray[x]));
            }
      }
      return result;
      
  }
  
  
  
  let replaceChar = (string) => {
      checkIsProperStr(string);
      let stringArray;
      let result='';
      stringArray = string.split("");
      for(var i = 1;i<stringArray.length;i=i+4){
            stringArray[i] = '*';
            if(i+2<string.length){
                stringArray[i+2] = '$';
            }
            
      }
      for(var i = 0;i<stringArray.length;i++){
            result = result.concat(stringArray[i]);
      }
      return result;
  
  };
  
  let charSwap = (string1, string2) => {
      checkIsProperStr(string1);
      checkIsProperStr(string2);
      if(string1.trim().length <4 ){
            throw `provided string1 is under 4 characters`;
      } 
      if(string2.trim().length <4 ){
            throw `provided string2 is under 4 characters`;
      }
      // let concatStr = string1+' '+string2;
      let result;
      let firstFour = string1.substring(0,4);
      let str1Left = string1.substring(4,string1.length)
      let lastFour = string2.substring(0,4);
      let str2Left = string2.substring(4,string2.length)
      result = lastFour+str1Left+' '+firstFour+str2Left
      return result;
  };

  module.exports = {
      description,
      palindromes,
      replaceChar,
      charSwap
    };