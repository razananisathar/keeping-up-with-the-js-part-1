/*
 *  Assignment: Homework Assignment #2: Variables and Constants.
 *  Description:  1. Explanation of differences between let, const and var. 
 *                2. Expalnation of hoisting.
 */

/*
 *  Hoisting:
 *        In Javascript (Js), a variable can be used before it has been declared. 
 *        When Js compiles the code all variable declarations are lifted to the top of their scope regardless of where it declared.
 *        This is known as 'Hoisting'.
 *        
 *        var, let and const are hoisted to the top of their scope but var variables are initialized with undefined while let and const are not initialized.
 * 
 *        In example-01; 
 *        When Js compiles the code the statement var food; lifted to the top of the function and prints undefined.
 *        
 *        Hositing does not allow to lift up the value given to a variable. Hence, the variable is undefined.                
 *        To avoid bugs, the best practise is to declare the variables at the beginning of every scope.
 */

//example-01
function haveBreakfast() {
    console.log(food); //Outputs undefined.
}

haveBreakfast();
var food = "Burger";

/*
 *  var:
 *    - variables declared with var keyword are function scope or global scope. The variables aren't accessible outside of a function.
 *      In example-02: 
 *      Variable beverage declared inside a function called drink. Therefore,  it is not accessible outside of the function.
 *      Thus, the output throws Reference error on the console.
 *      
 *    - With var keyword re-declaring the same variable is possible within its scope. Also, it is possible to update the same variable.
 *      In example-03:
 *      Notice the variable var desert; declared twice. The code still works.
 *      However, re-declaring the same variable is not a good practice.
 * 
 */
//example-02
function drink() {
    var beverage = "Coca-cola";
}

drink();
console.log(beverage); //Outputs error, ReferenceError: beverage is not defined.

//example-03
function haveDessert() {
    var desert = "Chocolate Cake";
    if (true) {
        var desert = "Fruit Trifle"; //Re-declare variable desert.
    }

    console.log(desert);//Outputs Fruit Trifle.
}

haveDessert(); 

/*
 *  let:
 *    - variables declared with let keyword are block scope. A block is chunk of code enclosed with {}. 
 *      The variable isn't accessible outside of a block. 
 *      
 *      In example-04;
 *      variable lunch is accessible inside if statement. Hence, first console log outputs the result.
 *      Second console log is outside of the block. Hence, it throws Reference error.
 *      
 *    - Unlike var, let cannot be re-declared but can be updated. (example-05)  
 *    - Just like var let declarations are hoisted but let keyword is not initialized. Therefore, it throws error. (example-06)    
 *     
 */
//example-04
function haveLunch() {
    
    if(true) {
        let lunch = "Brown Rice";
        console.log(lunch); //Outputs Brown Rice.
    }

    console.log(lunch); //Outputs error, ReferenceError: lunch is not defined.
}

haveLunch();

//example-05
function haveSupper() {
    let meal = "Pasta";
    
    let meal = "Porridge";//re-declare

    console.log(meal);//Outputs SyntaxError: Identifier 'meal' has already been declared.
}

haveSupper();

//example-06
function haveDinner() {
   console.log(dinner);//Outputs ReferenceError: dinner is not defined.
}

haveDinner();
let dinner = "Lasanga";
/*
 *  const:
 *      Variables declared with const keyword behave like let, except they cannot be re-declared or updated. (example-07)
 *      const variables are hoisted but not initialzed.  
 * 
 *      An object declared with const variable can update its properties. (example-08)
 */
//example-07
function  play() {
    
    if(true) {
        const sport = "Football";

        sport = "Cricket"; //reassign
        console.log(sport); //Outputs TypeError: Assignment to constant variable.
    }
}

play();

//example-08
function getSports() {

    if(true) {
        const sports = ["Cricket", "Football", "Basketball"];
        
        sports.push("Tennis", "Badminton");

        console.log(sports); //Outputs ["Cricket", "Football", "Basketball", "Tennis", "Badminton"] 
    }
}

getSports();