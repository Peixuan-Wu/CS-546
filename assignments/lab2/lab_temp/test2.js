function checkIdProperObj(obj){
    if(obj instanceof Object){
        if(obj instanceof Array){
            throw `provided argument is not an object`;
        }

    }else{
        throw `provided argument is not an object`;
    }

    if(obj === null || obj===undefined){
          throw `provided object is not valid`;
    }
}

function checkIsProperNumber(val, variableName) {
    if (typeof val !== 'number') {
      throw `${variableName || 'provided variable'} is not a number`;
    }
  
    if (isNaN(val)) {
      throw `${variableName || 'provided variable'} is NaN`;
    }
  }

function isEquallObj(obj1,obj2){
    let arr1 = Object.getOwnPropertyNames(obj1);
    let arr2 = Object.getOwnPropertyNames(obj2);
    if(arr1.length!==arr2.length){
          return false;
    }
    for(var i = 0;i<arr1.length;i++){
          let obj1Property = arr1[i];
          let obj2Property = arr2[i];
          if(!obj2.hasOwnProperty(obj1Property)){
                return false;
          }
          if(obj1[obj1Property] instanceof Object){
                if(!isEquallObj(obj1[obj1Property],obj2[obj1Property])){
                      return false;
                }
          }else{
                if(obj1[obj1Property]!==obj2[obj1Property]){
                      return false;
                }

                
          }
         
    }
        return true;

}
function findcommonKeysValues(obj1, obj2){
    let arr1 = Object.keys(obj1);
    let arr2 = Object.keys(obj2);
    let result = {}
    for(var x =0; x<arr1.length;x++){
          for(var y=0; y<arr2.length;y++){
                if(arr1[x] === arr2[y]){
                      if(obj1[arr1[x]] instanceof Object){
                        if(isEquallObj(obj1[arr1[x]],obj2[arr2[y]])){
                            result[arr1[x]] = obj1[arr1[x]];
                        }
                           result = Object.assign(result,findcommonKeysValues(obj1[arr1[x]],obj2[arr2[y]]))
                      }else{
                            if(obj1[arr1[x]] === obj2[arr2[y]]){
                               result[arr1[x]] = obj1[arr1[x]];
                            }
                            
                      }
                      } 
          }
    }
    return result;
 
}

function calculateObj(obj,func){
    let result = {};
    let arrName = Object.keys(obj);
    for(var x = 0;x<arrName.length;x++){
          result[arrName[x]] = Math.sqrt(func(obj[arrName[x]])).toFixed(2);
    }
    return result;

}
let deepEquality = (obj1, obj2) => {
    checkIdProperObj(obj1);
    checkIdProperObj(obj2);
    return isEquallObj(obj1,obj2);

};

let commonKeysValues = (obj1, obj2) => {
    checkIdProperObj(obj1);
    checkIdProperObj(obj2);
    return findcommonKeysValues(obj1, obj2);

};

let calculateObject = (object, func) => {
    checkIdProperObj(object);
    if(func === null || func === undefined ){
          throw `provided function is not valid`
    }
    let arr = Object.values(object);
    for(var x=0;x<arr.length;x++){
        checkIsProperNumber(arr[x]);
    }
    return calculateObj(object,func);
    

};

// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
// const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
// console.log(deepEquality(first, second)); // false
// console.log(deepEquality(forth, fifth)); // true
// console.log(deepEquality(forth, third)); // false
// console.log(deepEquality({}, {})); // true
// console.log(deepEquality([1,2,3], [1,2,3])); // throws error 
// console.log(deepEquality("foo", "bar")); // throws error




const first = {name: {first: "Patrick", last: "Hill"}, age: 46}
const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third = {a: 2, b: {c: true, d: false}};
const forth = {b: {c: true, d: false}, foo: "bar"};

// console.log(commonKeysValues(first, second)); // returns  {name: {first: "Patrick", last: "Hill"}, first: "Patrick", last: "Hill"} 
// console.log(commonKeysValues(third, forth)); // returns {b: {c: true, d: false}, c: true, d: false }
// console.log(commonKeysValues({}, {})); // {}
// console.log(commonKeysValues({a: 1}, {b: 2})); // {}
// console.log(commonKeysValues([1,2,3], [1,2,3])); // throws error 
// console.log(commonKeysValues("foo", "bar")); // throws error


// console.log(calculateObject({ a: 3, b: 7, c: 5 }, n => n * 2));
// /* Returns:
// {
//   a: 2.45,
//   b: 3.74,
//   c: 3.16
// }
// */
// console.log(calculateObject({ a: 'x', b: 7, c: 5 }, n => n * 2))