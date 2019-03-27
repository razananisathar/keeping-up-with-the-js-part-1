/*
 *  Assignment: Homework Assignment #16: Rest and Spread.
 *  Description:  Explain the difference between Rest and Spread. Provide one usecase for each.
 */

/**
 *  Rest and Spread
 *  
 *  How to distinguish the difference between Rest and Spread?
 *  - In ES6, both the rest and spread written as three dots ("...").
 *  -  
 *  - Rest: 
 *  -       Collects all remaining elements into an array. 
 *  - Spread: 
 *  -       Spread is the opposite of rest. Spread allows to expand elements in an iterables (array or string) into individual arguments.   
 *  - 
 * /

 /**
 *  --------------- Rest Usecases ---------------
 *  
 *  Note: 
 *  - Rest parameter has to be the last arguments because it collects excess arguments into an array.
 *      For example;
 *          sumOfSquareNum = (x,...nums, y) => {
 *              ....
 *              return;
 *          };
 *      This is invalid!!!
 *
 *  - Also, we can define the first argument/s and rest of the arguments in a function call using rest parameters.
 *      Here, ...nums is the last argument. 
 *      For example;
 *          sumOfSquareNum = (x, y, ...nums) => {
 *              ....
 *              return;
 *          };
 * 
 */
sumOfSquareNum = (...nums) => {
    let sum = 0;
    for(num of nums) {
      sum += Math.pow(num, 2);
    }
    console.log(sum);
};

sumOfSquareNum(1,2,4); //Output: 21 
sumOfSquareNum(21, 22, 23, 24, 25); // Output: 2655

/**
 * ---------------Spread Usecases ---------------
 */
const arr01 = ["January", "February", "March"];
const arr02 = [ "April", "May", "June"]; 
const arr03 = ["July", "August", "September"];

/** 
 * Example 01: Adding elements to an existing array.
 * 
 * Pre ES6 uses array.splice() method.
 * arr01.splice(3, 2, "April", "May");
 */

// ES6 way.
arr01.push(...arr02);
console.log(arr01); // Output:  ["January", "February", "March", "April", "May", "June"]

/**
 * Example 02: Concat two or more arrays into one array.
 *  
 * Pre ES6 uses array.concat method.
 * arr01.concat(arr02);
 */ 

// ES6 way.
const months = [...arr01, ...arr03]; 
console.log(months); // Output:  ["January", "February", "March", "April", "May", "June", "July", "August", "September"]

/**
 * Example 03: String iterable into array elements.
 */
let str = "I like chocolates.";
console.log( [...str]); // Output: ["I", " ", "l", "i", "k", "e", " ", "c", "h", "o", "c", "o", "l", "a", "t", "e", "s", "."]

/** 
 * Example 04: Copying an array.
 * 
 * Pre ES6 uses array slice() method.
 * months.slice();
 */ 

//ES6 way.
const arrCopy = [...months];

// arrCopy and months are two different arrays.
console.log(months === arrCopy); // Output: false

arrCopy.push("October", "November", "December");
console.log(arrCopy); // Output: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

/**
 * Example 05: Pass elements of an array to a function as seperate arguments.
 */
showMonths = (x, y) => {
    console.log(`First two months are ${x} and ${y}.`);
}

// arr01 has 12 elements. First two elements passed as arguments.
showMonths(...months); // Output: First two months are January and February.