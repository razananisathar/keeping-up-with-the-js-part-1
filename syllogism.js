/*
 *  Assignment: Homework Assignment #3: Statements and Operators.
 *  Description:  logical argument (syllogism)
 */

/*
 * All men are mortal.
 * Socrates is a man.
 * Therefore, socrates is mortal.
 */

const men = ["Plato", "Aristotle", "Pythagoras", "Socrates", "Heraclitus"];

const man = "Socrates";

if(men.length > 0) {
    const isMortal = true;
    
    if(men.indexOf(man) !== -1 && isMortal) {
        console.log(man + " is mortal");
    }  
}

/*
 * This cake is either vanilla or chocolate.
 * This cake is not chocolate.
 * Therefore, this cake is vanilla.
 */
const cakes = ["vanilla", "chocolate"];

const cake = "vanilla";

if(cakes.length > 0 && cake === cakes[0] || cake === cakes[1]) {
    if(!(cake === "chocolate")) {
        console.log("This cake is " + cake);
    }
}