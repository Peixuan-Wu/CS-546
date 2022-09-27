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
  

// console.log(arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20])); // Returns: { mean: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
// console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0])); // Returns: { mean: 14.5, median: 13, mode: 0, range: 35, minimum: 0, maximum: 35, count: 8, sum: 116 }
// console.log(arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100])); // Returns: { mean: 36.4, median: 36.5, mode: [11,54], range: 125, minimum: -25, maximum: 100, count: 10, sum: 364 }
// console.log(arrayStats([])) // throws an error 
// console.log(arrayStats("banana")); // throws an error
// console.log(arrayStats(["guitar", 1, 3, "apple"])); // throws an error 
// console.log(arrayStats()); // throws an error


// console.log(makeObjects([4, 1], [1, 2])); // returns {'4':1, '1': 2}
// console.log(makeObjects(["foo", "bar"], [5, "John"])); // returns {foo:'bar', '5': "John"}
// console.log(makeObjects(["foo", "bar"], ["name", "Patrick Hill"], ["foo", "not bar"])) //returns {foo: "not bar", name: "Patrick Hill"}
// console.log(makeObjects([true, undefined], [null, null])); // returns {true: undefined, null : null}
// console.log(makeObjects([undefined, true], ["date", "9/11/2022"])); // returns {undefined: true, date : "9/11/2022"}
// console.log(makeObjects([4, 1, 2], [1,2])); // throws error
// console.log(makeObjects([])) // throws an error
// console.log(makeObjects("banana)")); // throws an error
// console.log(makeObjects(1,2,3)); // throws an error
// console.log(makeObjects(["guitar", 1, 3, "apple"])); // throws an error
// console.log(makeObjects()); // throws an error
// makeObjects([1],[1,2]); // throws an error


// const arr1 = [5, 7]; 
// const arr2 = [20, 5]; 
// const arr3 = [true, 5, 'Patrick']; 
// const arr4 = ["CS-546", 'Patrick']; 
// const arr5 = [67.7, 'Patrick', true]; 
// const arr6 = [true, 5, 'Patrick']; 
// const arr7 = [undefined, 5, 'Patrick']; 
// const arr8 = [null, undefined, true];
// const arr9 = ["2D case", ["foo", "bar"], "bye bye"]
// const arr10= [["foo", "bar"], true, "String", 10]
// console.log(commonElements(arr1, arr2)); // Returns [5]
// console.log(commonElements(arr3,arr4,arr5)); // returns ['Patrick']
// console.log(commonElements(arr5,arr6)); // returns ['Patrick', true]
// console.log(commonElements(arr9,arr6)); // returns []
// console.log(commonElements(arr7,arr8)); // returns [undefined]
// console.log(commonElements(arr3, arr4, arr5, arr7)); // returns ['Patrick']
// console.log(commonElements(arr9, arr10)); // returns [["foo", "bar"]]
// console.log(commonElements()); // throws error
// console.log(commonElements("test")); // throws error
// commonElements([1,2,"nope"]); // throws error
