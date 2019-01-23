/*
 *  Assignment: Homework Assignment #4: Functions.
 *  Description:  Logical argument (syllogism) - homework #3 using functions.
 */

/*
 * @desc: Validate input type. 
 * Accepts only valid string inputs.
 */
const testInputType = (input) => {
    if(typeof input === "string") {
        return true;
    }
    
    return false;
};

/*
 * All men are mortal.
 * Socrates is a man.
 * Therefore, socrates is mortal.
 */

/*
 * @desc: Test a given man is mortal.
 */
const testManIsMortal = (man, arr) => {
    //test string inputs.
    const isValidInput = testInputType(man);

    if(arr.length > 0) {
        const isMortal = true;
        
        if(isValidInput && arr.indexOf(man) !== -1 && isMortal) {
            return true;
        }  
    }

    return false;
};

/*
 * @desc: Man constructor.
 */
function Man(name) {
    this.name = name;
};

const men = ["Plato", "Aristotle", "Pythagoras", "Socrates", "Heraclitus"];

//create three instances.
const man_01 = new Man("Socrates");
const man_02 = new Man("Siro");
const man_03 = new Man(123);

//Write to the console.
console.log(man_01.name + " is mortal: " + testManIsMortal(man_01.name, men));
console.log(man_02.name + " is mortal: " + testManIsMortal(man_02.name, men));
console.log(man_03.name + " is mortal: " + testManIsMortal(man_03.name, men));


/* 
 * This cake is either vanilla or chocolate.
 * This cake is not chocolate.
 * Therefore, this cake is vanilla.
 */ 

 /*
 * @desc: Test a given cake is vanilla.
 */
const testTypeOfCake = (cake, arr) => {
    //test string inputs.
    const isValidInput = testInputType(cake);
    
    if(isValidInput && arr.length > 0 && cake === arr[0] || cake === arr[1]) {
        if(!(cake === "chocolate")) {
            return true;
        }   
    }

    return false;
};

/*
 * @desc: Cake constructor.
 */
function Cake(type) {
    this.type = type;
};

const cakes = ["vanilla", "chocolate"];

//create three cake instances.
const cake_01 = new Cake("vanilla");
const cake_02 = new Cake("orange");
const cake_03 = new Cake(123);

//Write to the console.
console.log("This cake is " + cake_01.type + ": " + testTypeOfCake(cake_01.type, cakes));
console.log("This cake is " + cake_02.type + ": " + testTypeOfCake(cake_02.type, cakes));
console.log("This cake is " + cake_03.type + ": " + testTypeOfCake(cake_03.type, cakes));