/*
 *  Assignment: Homework Assignment #6: Loops.
 *  Description:  Fizz Buzz and Prime.
 */

//@desc: test a given number is prime or not.
const testPrime = (num) => {
    if(num === 1) {
        return false;
    }else if(num === 2) {
        return true;
    }else {
        for(let a = 2; a < num; a++) {
            if (num%a === 0) {
                return false;
            }
        }
        return true;
    }
};


const fizzBuzzPrime = () => {
    for (let i=1; i<=100; i++){

        const isPrime = testPrime(i);
        
        let output;

        if(isPrime && i%5 === 0) {
            output = "BuzzPrime";
        } else if(isPrime && i%3 === 0) {
            output = "FizzPrime";
        } else if(i%3 === 0 && i%5 === 0) {
            output = "FizzBuzz";
        } else if(i%5 === 0) {
            output = "Buzz";
        } else if(i%3 === 0) {
            output = "Fizz";
        } else if(isPrime) {
            output = "Prime";
        } else {
            output = i;
        }

        console.log(output);

    }
}

fizzBuzzPrime();