/*
 *  Assignment: Homework Assignment #14: Callbacks and Promises.
 *  Description:  A simple program using promises.  
 */

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

const squarer = (num) => Promise.resolve(Math.pow(num, 2));

const squareRoot = (num) => Promise.resolve(Math.sqrt(num));

const nearestPrime = (num) => {
    return new Promise((resolve, reject) => {
        while(num > 2) {
            num -= 1;
            if(isPrime(num)) {
                resolve(num);
            }
        }

        if(num <= 2) {
            reject("Prime number not found");
        }
    });    
};

const elapsedTime = (start, end) => {
    return new Promise((resolve, reject) => {
        let time = Math.round((end - start)) + " ms";
        resolve(time);
    });
};

const looper = (num, startTime) => {

    setTimeout(() => {
                    
        squareRoot(num)
            .then(squareRootNum => {
                console.log(`Square root of ${num}: ${squareRootNum}`);
                return nearestPrime(num);
        })
        .then(prime => {
                console.log(`The closest prime number to ${num}: ${prime}`);
                
                let endTime = new Date();
                return elapsedTime(startTime, endTime);
        })
        .then(time => {
            console.log(`Elapsed Time: ${time}`)
        })
        .catch(reject => console.log(reject));
        
    }, num);
};

let num = Math.floor(Math.random() * 1000) + 1; // Random number between 1 to 1000
let startTime = new Date();

squarer(num)
    .then(squarer => {
        console.log(`Input number: ${num}`);
        console.log(`Square of ${num}: ${squarer}`);
        return looper(num, startTime);
    });