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

// console.log(palindromes("Hi mom, At noon, I'm going to take my kayak to the lake")) // Returns: ["mom", "noon", "kayak"]
// console.log(palindromes('Wow! Did you see that racecar go?')); // Returns: ["Wow", "Did", "racecar"]
// console.log(palindromes('Hello World')); // Returns: []
// console.log(palindromes()); // throws error
// console.log(palindromes("    ")); //  throws error
// console.log(palindromes(1));  //throws error
// console.log(palindromes(["hello there"])) //throws error


// console.log(replaceChar("Daddy")); // Returns: "D*d$y"
// console.log(replaceChar("Mommy")); // Returns: "M*m$y"
// console.log(replaceChar("Hello, How are you? I hope you are well")); // Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
// console.log(replaceChar("")); // Throws Error
// console.log(replaceChar(123)); // Throws Error

console.log(charSwap("Patrick", "Hill")); //Returns "Hillick Patr"
console.log(charSwap("hello", "world")); //Returns "worlo helld"
// console.log(charSwap("Patrick", "")); //Throws error
// console.log(charSwap()); // Throws Error
// console.log(charSwap("John")) // Throws error
// console.log(charSwap ("h", "Hello")) // Throws Error
// console.log(charSwap ("h","e")) // Throws Erro