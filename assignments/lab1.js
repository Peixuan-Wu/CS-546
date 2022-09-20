function questionOne(arr) {
    // calculate if each and every element in the array is a prime number
    let result = [];
    for(let x of arr){ 
        let isPrime = true; 
        if(x<=1){
            isPrime = false;
        }
       
        else if(x == 2){
            isPrime = true;
        }
        else {
        for(let num = 2; num<x; num++){
            if (x % num == 0){
                isPrime = false;
            }
        }
        }
        result.push(isPrime);
    }
    return result;
  }
  
  function questionTwo(startingNumber, commonRatio, numberOfTerms) {
    // This function will sum a Geometric Series
    if(startingNumber == 0 || commonRatio == 0){
        return 0;
    }
    if(numberOfTerms <= 0){
        return NaN;
    }
    let result;
    result = startingNumber*((1-Math.pow(commonRatio,numberOfTerms))/(1-commonRatio));
    return result;

  }
  
  function questionThree(str) {
    // This function will return the number of consonants contained in the value str
    let count = 0;
    str = (str+='').toUpperCase();
    for(let n = 0; n<str.length; n++){
        char = str.charAt(n);
        if(char == 'A' || char == 'E' || char == 'I' || char == 'O' || char == 'U' || char.charCodeAt(0)>90 || char.charCodeAt()< 65){
            count = count;
        }
        else count++;
    }
    return count;
  }
  
  function questionFour(fullString, substring) {
    // calculate how many times a substring occurs in a given string.
    let len1 = fullString.length;
    let len2 = substring.length;
    let count = 0;
    for(let n = 0;n<len1;n++){
        let text = fullString.substr(n,len2);
        if(text === substring){
            count++;
            n = n+len2-1;
        }
    }
    return count;
  }
  
  //TODO:  Change the values for firstName, lastName and studentId
  module.exports = {
    firstName: "Peixuan",
    lastName: "Wu",
    studentId: "20012946",
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
  };
  