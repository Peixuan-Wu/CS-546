let inputString = "[3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]";



inputString = inputString.replaceAll(' ','');
        if (inputString.charAt(0) != '[') {
            throw `the first character should be [`
        }
        if (inputString.length < 3) {
            throw `Invalid array length, you should put some value in array`
        }
        // remove trailing commas/
        for (var i = inputString.length - 1; i >=1; i--) {
            if (inputString.charAt(i) == ',') {
                inputString = inputString.slice(0, i);
            } else {
                break;
            }
        }
        let left = 0;
        let right =1;
        let resultArr = [];
        let tempArr = [];
        let arrNum = 0;
        let finish = 1;
        function checkIsNum(a) {
            let asc = a.charCodeAt(0)
            if (asc>=48 && asc<=57) {
                return true;
            }
            return false;
        }
        function checkIsWholeNum(num) {
            if (isNaN(num)) {
                throw `Array element should be whole Number`;
            }
            let result = Number(num);
            if (num % 1 != 0) {
                throw `Element should not be decimal Num`;
            }
            return result;
        }
        function checkAndReturnProperArray(arr) {
            let result = []
            if (arr[0] == ',' || arr[arr.length - 1] == ',') {
                throw `Comma cannot be start or end of a araray`
            }
            let subString = '';
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == ',' &&  arr[i+1] == ',') {
                    throw `Comma cannot next to comma without value`
                }
                if (arr[i] != ',' && i != arr.length - 1) {
                    subString = subString.concat(arr[i])
                } else if (arr[i] != ',' && i == arr.length - 1) {
                    subString = subString.concat(arr[i])
                    let resultElem = checkIsWholeNum(subString);
                    result.push(resultElem)
                    break;
                }
                else if (arr[i] == ','){
                    let resultElem = checkIsWholeNum(subString);
                    result.push(resultElem)
                    subString = '';
                }
            }
            return result;
        }
        while (right < inputString.length && left < inputString.length) {
            if (right < inputString.length && inputString.charAt(right) == ']') {  
                if (tempArr.length < 1) {
                    throw `Each array should have at least one element`
                }
                tempArr = checkAndReturnProperArray(tempArr);
                for (var i = 0; i < tempArr.length; i++) {
                    resultArr.push(tempArr[i]);
                }
                arrNum = arrNum + 1
                finish = finish - 1;
                tempArr = [];
                if (right == inputString.length - 1) {
                    break;
                } else {
                    left = right;
                    if (inputString.charAt(left + 1) != ',' || inputString.charAt(left + 2) != '[') 
                        throw `There should be ,space between two array`;
                    }
                    finish = finish + 1;
                    left = left + 2;
                    right = left + 1;
                    continue;
            }
            if (right < inputString.length && inputString.charAt(right) != ']') {
                tempArr.push(inputString.charAt(right));
                right++;
            }
            
        }
        if (finish != 0) {
            throw `You should input a complete Array with '[' and ']'`
        }
        if (arrNum = 0) {
            throw `There should be at least one array inputted`
        }

console.log(resultArr.sort((a,b)=>a-b))
            
            
        