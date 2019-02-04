/*
 *  Assignment: Homework Assignment #9: Template Literals.
 *  Description:  Upgrade project #1 code to with template literals.
 */

const css = "app.css";
const title = "To-do Application";

const headContents = (
    `<meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>${title}</title>
    <link rel="stylesheet" type="text/css" href="${css}">`);

document.head.innerHTML = headContents;

//Index template.
const indexTitle = "To-do";
const indexDescription = "The easiest way to get stuff done, every day.";
const divIds = ["index", "signup", "login","settings",  "dashboard", "todoList", "account"];
const indexButtons = [
    { id:"btnSignup", class:"signup", label: "Sign Up" },
    { id:"btnLogin", class:"login", label: "Log In"},];
 
const indexDIV = (
    `<div class="" id="${divIds[0]}">
        <h1>${indexTitle}</h1>
        <h2>${indexDescription}</h2>
        ${indexButtons.map((btn) => 
            `<button type="button" class="btn ${btn.class}" id="${btn.id}">${btn.label}</button>`).join(" ")}
    </div>`);

//Sign up template.
const signupTitle = "Sign up";
const signupForm = [
        { id:"fname",  type:"text", name:"fname", label:"First Name" },
        { id:"lname",  type:"text", name:"lname", label: "Last Name" },
        { id:"email",  type:"text", name:"email", label: "Email" },
        { id:"loginPassword",  type:"password", name:"password", label: "Password" },
        { id:"terms",  type:"checkbox", name:"terms", label: "I agree to the Terms of Use" },];

const signupDIV = (
    `<div class="hide" id="${divIds[1]}">
        <h2>${signupTitle}</h2>
        <form class="" id="formSignup" method="post" action="">    
            ${signupForm.map((field) => 
                `<div class = "form-field">
                    ${(field.type !== "checkbox")? `<label>${field.label}</label>`:""}
                    <input type="${field.type}" name="${field.name}" id="${field.id}" />
                    ${(field.type === "checkbox") ? `<label class="label-inline">${field.label}</label>`:""}
                    <p class="error"></p>
                </div>`).join("")} 
                <div class = "form-field">
                    <button type="submit" class="btn">Sign up</button>
                    <button type="button" class="btn" id="btnBackSignup">Back</button>
                </div>
        </form>
    </div>`);

//Log in template.
const loginTitle = "Log in";
const loginForm = [
    { id:"loginEmail",  type:"text", name:"email" },
    { id:"loginPassword",  type:"password", name:"password" },];

const loginDIV  = (
        `<div class="hide" id="${divIds[2]}">
            <h2>${loginTitle}</h2>
            <form class= "" id="formLogin" method="post" action="">      
                ${loginForm.map((field) => 
                    `<div class="form-field">
                        <label>${field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
                        <input type="${field.type}" name="${field.name}" id="${field.id}" />
                        <p class="error"></p>
                    </div>`).join("")} 
                    <div class="form-field">
                        <button type="submit" class="btn">Log in</button>
                        <button type="button" class="btn" id="btnBackLogin">Back</button>
                    </div>
            </form>
        </div>`);

//App navbar template.
const settingsButtons = [
        {id: "btnDashboard", text: "Dashboard", class:""},
        {id: "btnAccountSettings", text: "Account Settings", class:""},
        {id: "btnLogout", text: "Logout", class:"btn-red"}
    ];  

const settingsDIV = (
    `<div class="hide" id="${divIds[3]}">
        <p></p>
        ${settingsButtons.map((btn)=> 
            `<button class="btn ${ btn.text === 'Logout' ? btn.class:""}" id="${btn.id}">${btn.text}</button>` ).join(" ")}
    </div>
    <div class="clearfix"></div>`);

//App dashboard template.
const dashboardTitle = "Dashboard";
const todoListTitle = "Here's your to-do lists";
const dashboardDIV = (
    `<div class="hide" id="${divIds[4]}">
        <h2>${dashboardTitle}</h2>
        <p class="new-todo">Start creating your first to-do list</p>
        <button type="button" class="btn" id="btnNewTodoList">Create New to-do List</button>
        <div class="todo-lists">
            <h2>${ todoListTitle}</h2>
        </div>
    </div>`);

//App todolist template.
const newTodoListTitle = "Create new todo list";
const todoListForm = [
    { id:"listName", type:"text", name:"listName", placeholder: "To-do list name"} ,];

const todoListButtons = [
    { id:"btnTodoListSubmit", type: "submit", name:"todoListSubmit", class:"",label: "Add List"},
    { id:"btnCancel", type: "button", name:"cancel", class:"hide", label: "Cancel"}, ];

const todoForm = [
    { id:"todo", type:"text", name:"todo", placeholder: "New task"} ,];

const todoListDIV = (
    `<div class="hide" id="${divIds[5]}">
        <div class="" id="newTodo">
            <h2>${newTodoListTitle}</h2>
            <form class="" id="formTodoList" method="post" action="">
                <div class="form-field">
                    ${todoListForm.map((field) => 
                        `<input type="${field.type}" id="${field.id}" name="${field.name}" placeholder="${field.placeholder}" />`)}
                        
                    ${todoListButtons.map((btn) => 
                        `<button type="${btn.type}" id="${btn.id}" name="${btn.name}" class="btn ${btn.class}">${btn.label}</button>`)}
                    <p class="error"></p>
                </div>
            </form>
        </div>
        <div class="" id="listItems">
            <h2 class="list-title"></h2>
            <button class="btn btn-small" id="btnEditTodoList">Edit</button>
            <form class="" id="formTodo" method="post" action="">
                <div class="form-field">
                    ${todoForm.map((field) => 
                        `<input type ="${field.type}" id="${field.id}" name="${field.name}" placeholder="${field.placeholder}" />`)}
                    <button type="submit" class="btn">Add</button>
                    <p class="error"></p>
                </div>
            </form>
            <ul class="todos"></ul>
        </div>
    </div>`);

//Account settings template.
const accountTitle = "Account Settings";
const accountForm = [
            { id:"accFname",  type:"text", name:"fname", label:"First Name" },
            { id:"accLname",  type:"text", name:"lname", label: "Last Name" },
            { id:"accEmail",  type:"text", name:"email", label: "Email" },
            { id:"accPassword",  type:"password", name:"password", label: "password" },];

const accountDIV = (
    `<div class="hide" id="${divIds[6]}">
        <h2>${accountTitle}</h2>
        <form class="" id="formAccount" method="post" action=""> 
            ${accountForm.map((field) => 
            `<div class="form-field">
                <label>${field.label}</label>
                <input type= "${field.type}" name = "${field.name}" id= "${field.id}" />
                ${(field.type === "checkbox") ? `<label class = "label-inline">${field.label}</label>`:""}
                <p class="error"></p>
            </div>`).join("")}
            <div class="form-field">
                <button type="submit" class="btn">Save</button>
            </div>
        </form>
    </div>`);  

//App template.
const appDIV = (
            `<div class="" id="app">
                ${settingsDIV}
                ${dashboardDIV}
                ${todoListDIV}
                ${accountDIV}
            </div>`);

//HTML body.
document.body.innerHTML = `${indexDIV}${signupDIV}${loginDIV}${appDIV}`;

//External script.
const externalScript = document.createElement("script");
externalScript.setAttribute("type", "text/javascript");
externalScript.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js");
document.body.insertBefore(externalScript, appDIV.nextSibling);

//App scripts.
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", "app.js");

document.body.insertBefore(script, externalScript.nextSibling);