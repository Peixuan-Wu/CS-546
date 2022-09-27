/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let description = 'This is a arrayUtils.js for lab2';
function checkIsProperNum(val, variableName) {
  if (typeof val !== 'number') {
    throw `${variableName || 'provided variable'} is not a number`;
  }

  if (isNaN(val)) {
    throw `${variableName || 'provided variable'} is NaN`;
  }
}

function checkIsProperArray(arr, arrName){
  let isArray;
  isArray = Array.isArray(arr);
  if(isArray == false){
    throw `${arrName || 'provided array'} is not a array`;
  }
  if(arr === undefined || arr === null || arr.length<=0){
    throw `${arrName || 'provided array'} is not a valid array`;
  }
  
}

function checkIsEmptyObj(obj){
  if(obj == undefined || obj == null){
      throw `object is empty`;
  }

}

function sortArray(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
          if (arr[j] > arr[j+1]) {      
              var temp = arr[j+1];        
              arr[j+1] = arr[j];
              arr[j] = temp;
          }
      }
  }
  return arr;
}

function findMedian(arr){
  let median;
  if(arr.length % 2 == 0){
    median = (arr[arr.length/2]+arr[arr.length/2-1])/2
  }else {
    median = arr[(arr.length-1)/2]
  }
  return median;
}

function findMode(arr){
  // use map to record
  let mapCount = {}
  let modeResult = []
  arr.forEach(each => {
    if (mapCount[each]) {
      mapCount[each]++;
    } else {
      mapCount[each] = 1;
    }
 })
 let valueArray = Object.values(mapCount);
 let maxValue = Math.max.apply(Math,valueArray);
 if(maxValue == 1){
  return 0;
 }else {
  for(var y in mapCount){
    if(mapCount[y] === maxValue){
      modeResult.push(Number(y));
    }
  }
 } 
 modeResult = sortArray(modeResult);
 if(modeResult.length==1){
  return modeResult[0];
 }
 return modeResult;
}

function getMean(arr){
  let total=0;
  let mean;
  for(var i =0; i<arr.length; i++){
    total = total + arr[i];
  }
  mean = total/arr.length;
  return mean;

}

function toMakeObj(...arr){
  let result = {}
  for(var x of arr){
    let key = x[0];
    let value = x[1];
    result[key] = value;
  }
  return result;
}

  function equallArr(arr1, arr2){
  if(arr1.length != arr2.length)   return false;
  else{
      for(let i = 0 ; i < arr1.length ; i++){
          if(arr1[i] !== arr2[i]) return false;
      }
      return true
  }
}

  function getCommonOfArr(arr1,arr2){
      let commonValue= [];
      for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            if(arr1[i] instanceof Array && arr2[j] instanceof Array){
              if(equallArr(arr1[i],arr2[j])){
                commonValue.push(arr1[i])
              }
            }
            if(arr1[i] === arr2[j]){
              commonValue.push(arr1[i]);
            }
      }
    }

   return commonValue;
}




function findCommonElement(...arr){
  let temp = []
  let result = [];
  for(var x of arr){
    temp.push(x);
  }
  result = getCommonOfArr(temp[0],temp[1]);
  if(temp.length>2){
     for(var x = 2; x<temp.length;x++){
    result = getCommonOfArr(result,temp[x])
  }
  }
  return result;
 

}


let arrayStats = (array) => {
  //check the argument
  checkIsProperArray(array);
  // check every element in array is a proper number
  for(var i = 0; i<array.length;i++){
      checkIsProperNum(array[i]);
  }
  
  //sort the array
  array = sortArray(array);

  //find median
  let Median = findMedian(array);
  let Mode = findMode(array);
  let Mean = getMean(array);
  let Minimun = array[0];
  let Maximum = array[array.length-1];
  let Range = Maximum - Minimun;
  let Count = array.length;
  let Sum = Mean*array.length;
  return {mean: Mean, median: Median, mode: Mode, range: Range, minimum: Minimun, maximum: Maximum, count: Count, sum: Sum }

};

// These are the functions will export.
let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  //check each input is a valid array
  checkIsEmptyObj(...arrays);
  for(var x of arrays){
    checkIsProperArray(x);
    if(x.length!==2){
      throw `${ x || 'provided array'} do not have two element` 
    }
  }
  return toMakeObj(...arrays);

};


let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  checkIsEmptyObj(...arrays);
  let countArrays=0;
  for(var x of arrays){
    countArrays++;
    checkIsProperArray(x);
  }
  if(countArrays<2){
    throw `the number of arrays is under two` 
  }
  return findCommonElement(...arrays)
};

module.exports = {
  description,
  arrayStats,
  makeObjects,
  commonElements
};