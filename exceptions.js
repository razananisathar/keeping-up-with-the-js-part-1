/*
 *  Assignment: Homework Assignment #11: Exceptions.
 *  Description: Build a simple function and then reinforce it with some defensive code (to bullet-proof it against throwing exceptions).
 */

function reverseJsonArray(str) {
    try {
        if(typeof str !== "string") {
            throw "Not a string";
        }
    
        const arr = JSON.parse(str);
        
        if(!Array.isArray(arr)) {
            throw "Not an array";
        }
    
        if(!(arr.length > 0)) {
            throw "Can not be an empty array";
        }
    
        const reverseArray = arr.slice().reverse();
        return JSON.stringify(reverseArray);
    } catch(e) {
        return false;
    }
}

const result = reverseJsonArray(JSON.stringify(["Pizza", "Doughnut", "Eclairs"]));
console.log(result);

const res = reverseJsonArray(789);
console.log(res);


//1. Without any arguments
const result1 = reverseJsonArray();
console.log(result1);

//2. With a boolean as the argument
const result2 = reverseJsonArray(false);
console.log(result2);

//3. With an Array (non-stringified) as the argument
const result3 = reverseJsonArray(["Pizza", "Doughnut", "Eclairs"]);
console.log(result3);

//4. With a string argument that is not properly formatted JSON
const result4 = reverseJsonArray(JSON.stringify("Pizza"));
console.log(result4);

//5. With a stringified-array that only has one value
const result5 = reverseJsonArray(JSON.stringify(["Pizza"]));
console.log(result5);

//6. With a stringified-array that is empty
const result6 = reverseJsonArray(JSON.stringify([]));
console.log(result6);

//7. With a stringified-array that has an even-number of values
const result7 = reverseJsonArray(JSON.stringify(["Pizza", "Doughnut", "Eclairs", "Cookies"]));
console.log(result7);

//8. With a stringified-array that has an odd-number of values
const result8 = reverseJsonArray(JSON.stringify(["Pizza", "Doughnut", "Eclairs", "Cookies", "Muffins"]));
console.log(result8);