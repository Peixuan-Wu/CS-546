/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/


let myForm = document.getElementById('myForm');

let textInput = document.getElementById('form');

let results = document.getElementById('results');

let errors = document.getElementById('error');

let formLabel = document.getElementById('formLabel');


if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // hide containers by default
        errors.classList.add('hidden');
        results.classList.add('hidden');
        results.hidden = true;
        errors.hidden = true;
        try {
            if (!textInput.value.trim()) {
                textInput.value = '';
                results.hidden = false;
                errors.hidden = false;
                errors.innerHTML = 'You must enter a value';
                formLabel.className = 'error';
                textInput.focus();
            } else {
                inputString = textInput.value.replaceAll(' ','');
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
                        throw `Comma cannot be start or end of a array`
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
                                throw `There should be ',space' between two array`;
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

                resultArr = resultArr.sort((a,b)=>a-b).toString();
                results.hidden = false;
                errors.hidden = true;
                
                let li = document.createElement('li');
                li.innerHTML = "[" + resultArr.toString() + "]";
                
                if (results.childElementCount % 2 == 0 ) {
                    li.className = "is-green";
                } else {
                    li.className = "is-red";
                }
                results.appendChild(li);
                myForm.reset();
                textInput.focus();
            }
            
        } catch(e) {
            textInput.value = '';
            errors.hidden = false;
            results.hidden = false;
            errors.innerHTML = e;
            textInput.focus();
        }
    });
}