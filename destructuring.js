/*
 *  Assignment: Homework Assignment #10: Destructuring.
 *  Description:  Explanation of differences between destructuring an object and destructuring an array.
 */

/*
 * Differences between destructuring an object and destructuring an array
 * 
 * 1. In array destructuring you can use any variable name for extracting values from an array 
 *    whereas in object destructuring you must use the same object property name as variable to extract properties from an object.
 * 2. You can skip array values using comma separate in an array but in an object, you can omit the properties.
 * 3. You can break an array into values and rest into another array using rest pattern. In an object, you can retrieve the required properties to create another object.
 */
 
/*
 * Example 01; Accessing the last element of an array.
 */
function getLastElement(arr) {
    const reverseArr = arr.slice().reverse();
    return reverseArr;
}

const array = [1, 3, 5, 7, 9, 11, 13, 15];
const [last] = getLastElement(array);

console.log(last);  // Output: 15

//Using nested array.
const nestedArray = [[1,3,5,7,9],[2,4,6,8], 10, 11, 12, 13, 14, 15, [16,18,20]];
const [lastArr] = getLastElement(nestedArray);

console.log(lastArr);   // Output: [16, 18, 20]

//Retrieve values in a nested array.
const [[x,, z]] = getLastElement(nestedArray);
console.log(x, z);  // Output: 16, 20

//Use of rest pattern.
const [a, ...values] = getLastElement(nestedArray);
console.log(a); //Output: [16, 18, 20]
console.log(values); //Output: [15, 14, 13, 12, 11, 10, [2, 4, 6, 8], [1, 3, 5, 7, 9]]

/*
 * Example 02; Object destructuring.
 */
const person = {
    firstName: "Sally",
    lastName: "Bob",
    country: "UK",
    contact: {
        email: "sally@yopmail.com",
        address: "123 Kandy st.",
        mobile: "555-55555",
        office: "123-45678",
    },
    social: {
        blog:"www.blog.domain.com",
        facebook: "sallybob",
        twitter: "@sally",
        instagram: "sallybob",
        youtube: "sally_bob"
    },
    todolists: [{
        name: "Personal",
        tasks: [
            {id:1, task: "Haircut"},
            {id:2, task: "Pay mobile bill"},
            {id:3, task: "Grocery shopping"},
        ]},
        {
        name: "HR",
        tasks: [
            {id:1, task: "Recruit new staff"},
            {id:2, task: "Create vacancies"},
        ]},
        {
        name: "Sales",
        tasks: [
            {id:1, task: "Create a plan for content marketing strategy"},
            {id:2, task: "Advertise on social media"},
            {id:3, task: "Create video adverts"},
            {id:4, task: "Review of SEO efforts"},
            {id:5, task: "Create email template for new campaign"},
        ]},
    ]
};

//Object destructuring.
function displayName({ firstName, lastName, country }){
    return `I'm ${firstName} ${lastName} and I'm from ${country}.`;
}

console.log(displayName(person)); //Output: "I'm Sally Bob and I'm from UK."

//Nested object and array.
function displayTodolists ({todolists}){
    return `<h1>Todo Lists</h1>
            <ul>${todolists.map((list) =>
                    `<li>${list.name}
                        <ul>
                            ${list.tasks.map((todo) => 
                                `<li>${todo.task}</li>`).join("\n      ")}
                        </ul>
                    </li>`).join("\n      ")}
            </ul>`;
}

console.log(displayTodolists(person));

/*<h1>Todo Lists</h1>
 *        <ul><li>Personal
 *              <ul>
 *                  <li>Haircut</li>
 *                  <li>Pay mobile bill</li>
 *                  <li>Grocery shopping</li>
 *              </ul>
 *            </li>
 *            <li>HR
 *              <ul>
 *                  <li>Recruit new staff</li>
 *                  <li>Create vacancies</li>
 *              </ul>
 *            </li>
 *            <li>Sales
 *              <ul>
 *                  <li>Create a plan for content marketing strategy</li>
 *                  <li>Advertise on social media</li>
 *                  <li>Create video adverts</li>
 *                  <li>Review of SEO efforts</li>
 *                  <li>Create email template for new campaign</li>
 *              </ul>
 *            </li>
 *        </ul>
 */

//Extract an object from a nested object.
function getPersonObj({ firstName, lastName, country, contact: { email } }){
    return {
        fullName: firstName + " " + lastName,
        country,
        email
    };
}

console.log(getPersonObj(person));
/*output: 
 *  [object Object] {
 *     country: "UK",
 *     fullName: "Sally Bob"
 *  }
 */

//set default value if nested object missing
const user = {
    firstName: "Jane",
    lastName: "Peterson",
    country: "USA",
}

function getUserObj({firstName, lastName, country, contact: { email= null } = {} }){
    return {
        fullName: firstName + " " + lastName,
        country,
        email
    };
}

console.log(getUserObj(user));
/* Output:
 *  [object Object] {
 *    country: "USA",
 *    email: null,
 *    fullName: "Jane Peterson"
 *  }
 */