/*
 *  Assignment: Homework Assignment #14: Callbacks and Promises.
 *  Description: A simple program using callbacks.  
 */

const squarer = (num) => Math.pow(num, 2);

const squareRoot = (num) => Math.sqrt(num);

const isPrime = (num) => {
    if(num === 1) {
        return false;
    } else if(num === 2) {
        return true;
    } else {
        for(let a = 2; a < num; a++) {
            if (num%a === 0) {
                return false;
            }
        }
        return true;
    }
};

const nearestPrime = (num, cbisPrime) => {
        while(num > 2) {
            num -= 1;
            
            // Callback isPrime function
            if(cbisPrime(num)) {
                return num;
            }
        }
};

const elapsedTime = (start, end) => Math.round((end - start)) + " ms";


const looper = (num, cbsquarer, cbsquareRoot, cbnearestPrime, cbelapsedTime) => {
    let startTime = new Date();

    // Callback square function
    let square = cbsquarer(num);
    
    console.log(`Input number: ${num}`);
    console.log(`Square of ${num}: ${square}`);

    setTimeout(() => {
        // Callback squareRoot function
        let squareRoot = cbsquareRoot(num);
        console.log(`Square root of ${num}: ${squareRoot}`);

         // Callback nearestPrime function
        let prime = cbnearestPrime(num, isPrime);
        console.log(`The closest prime number to ${num}: ${prime}`);

        let endTime = new Date();

         // Callback elapsedTime function
        let elapsedTime = cbelapsedTime(startTime, endTime);
        console.log(`Elapsed Time: ${elapsedTime}`);

    }, num);

};

let num = Math.floor(Math.random() * 1000) + 1; // Random number between 1 to 1000

looper(num, squarer, squareRoot, nearestPrime, elapsedTime);