/*
 *  Project: Project #1.
 *  Description:  Simple to-do list application with sign up, login and dashboard.
 */

 const storage = window.localStorage;
let currentUser = {};

function User(fname, lname, email, password) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.lists = [];
}

function ToDo(name) {
    this.name = name;
    this.tasks = [];
}

function Task(id, task) {
    this.id = id;
    this.task = task;
    this.done = false;
}

const setTitle = (title) => {
    document.title = title;
};

const saveUser = (user) => {
    storage.setItem(user.email, JSON.stringify(user));
};

const getUser = (email) => {
    return JSON.parse(storage.getItem(email));
};

const save = () => {
    const user = JSON.parse(storage.getItem(currentUser.email));
    storage.setItem(user.email, JSON.stringify(currentUser));
};

const setLoggedInUser= (user) => {
    currentUser = user;
    const elPara = elSettingsDIV.querySelector("p");
    const elCurrentUser = elPara.querySelector("span");
    elCurrentUser.innerText = user.fname + " " + user.lname;
};

const checkExistingName = (todoLists, listName) => {
    const result = todoLists.filter((list) => {
        return list.name === listName;
    });

    if(result.length > 0) {
        return true;
    } else return false;
};

const validateEmail = (email) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.match(pattern);
};

const encrypt = (ptxt) => {
    const enctext = CryptoJS.AES.encrypt(ptxt, "rabbit").toString();
    return enctext;
};

const decrypt = (ctxt) => {
    const dectxt = CryptoJS.AES.decrypt(ctxt.toString(), "rabbit");
    const ptxt = dectxt.toString(CryptoJS.enc.Utf8);
    return ptxt;
};

const setFormResponse = (msg, div, form, status = false) => {
    let el = div.querySelector("p.response");
    if(el === null) {
        const elresponsePARA = document.createElement("p");
        //Set success or fail styles.
        const css = status ? "success" : "fail";
        elresponsePARA.classList.add("response", css);
        elresponsePARA.innerText = msg;
        div.insertBefore(elresponsePARA, form);
    } else {
        el.innerText = msg;
        //Set success or fail styles.
        const css = status ? "success" : "fail";
        elresponsePARA.classList.add(css);
    }
};

const clearFormResponse = (div) => {
    if(div.querySelector("p.response") !== null) {
        div.querySelector("p.response").remove();
    }
};

const setInputError = (msg, elInput) => {
    const el = elInput.parentNode.querySelector("p.error");
    el.innerText = msg;
};

const findIndex = (arr, param, value) => {
    const index = arr.findIndex((item) => {
        return item[param] === value;
    });
    return index;
};

const resetElements = () => {
    //Reset all forms, errors and responses.
    const errors = document.body.querySelectorAll("p.error");
    errors.forEach((el)  => {
        el.innerHTML = "";
    });

    const forms = document.body.querySelectorAll("form");

    forms.forEach((form)=> {
        form.reset();
    });

    const responses = document.body.querySelectorAll("p.response");
    if(responses) {
        responses.forEach((response) => {
            response.remove();
        });
    }
};

const showAccountForm = () => {
    elAccountFORM.querySelector("input[name='lname']").value = currentUser.lname;
    elAccountFORM.querySelector("input[name='fname']").value = currentUser.fname;
    elAccountFORM.querySelector("input[name='email']").value = currentUser.email;
    elAccountFORM.querySelector("input[name='password']").value = decrypt(currentUser.password);
};

const createElTodo = (id, task) => {
    const elLI = document.createElement("li");
    elLI.innerHTML = "<input type='checkbox' id='todo"+ id +"'>" + "<label>" + task +"</label>" + "<span></span>";
    const elUL = elTodoListDIV.querySelector("div#listItems").querySelector("ul.todos");
    elUL.appendChild(elLI);
    return elLI;
};

const elIndexDIV = document.getElementById("index");
const elSignupDIV = document.getElementById("signup");
const elLoginDIV = document.getElementById("login");
const elDashboardDIV = document.getElementById("dashboard");
const elSettingsDIV = document.getElementById("settings");
const elTodoListDIV = document.getElementById("todoList");
const elAccountDIV = document.getElementById("account");

const elSignupFORM = document.getElementById("formSignup");
const elLoginFORM = document.getElementById("formLogin");
const elAccountFORM = document.getElementById("formAccount");
const elTodoListFORM = document.getElementById("formTodoList");
const elTodoFORM = document.getElementById("formTodo");

const elSignupBTN = elIndexDIV.querySelector("button#btnSignup");
const elLoginBTN = elIndexDIV.querySelector("button#btnLogin"); 
const elNewTodoBTN = elDashboardDIV.querySelector("button#btnNewTodoList");
const elLogoutBTN = elSettingsDIV.querySelector("button#btnLogout");
const elAccoutBTN = elSettingsDIV.querySelector("button#btnAccountSettings");
const elDashboardBTN = elSettingsDIV.querySelector("button#btnDashboard");
const elEditTodoBTN = elTodoListDIV.querySelector("button#btnEditTodoList");
const elBackSignupBTN = document.querySelector("button#btnBackSignup");
const elBackLoginBTN = document.querySelector("button#btnBackLogin");
const elCancelBTN =  elTodoListFORM.querySelector("button#btnCancel");
//event listeners.
elSignupBTN.addEventListener("click", showPage);
elLoginBTN.addEventListener("click", showPage);
elBackSignupBTN.addEventListener("click", showPage);
elBackLoginBTN.addEventListener("click", showPage);
elLogoutBTN.addEventListener("click", showPage);
elAccoutBTN.addEventListener("click", showPage);
elNewTodoBTN.addEventListener("click", showPage);
elDashboardBTN.addEventListener("click", showPage);
elEditTodoBTN.addEventListener("click", showPage);
elCancelBTN.addEventListener("click", showPage);

const elTodoListsDIV = elDashboardDIV.querySelector("div.todo-lists");
elTodoListsDIV.addEventListener("click", showTodoList);

const elTodosUL = elTodoListDIV.querySelector("ul.todos");
elTodosUL.addEventListener("click", checkTodo);

elSignupFORM.addEventListener("submit", signup);
elLoginFORM.addEventListener("submit", login);
elTodoListFORM.addEventListener("submit", addEditTodoList);
elTodoFORM.addEventListener("submit", addTodo);
elAccountFORM.addEventListener("submit", updateUserAccount);

function signup(e) {
    e.preventDefault();
    const elFname = elSignupFORM.querySelector("input[name='fname']");
    const elLname = elSignupFORM.querySelector("input[name='lname']");
    const elEmail = elSignupFORM.querySelector("input[name='email']");
    const elPassword = elSignupFORM.querySelector("input[name='password']");
    const elTerms = elSignupFORM.querySelector("input[name='terms']");
    validateForm();
    submitForm();

    //Form validation.
    function validateForm() {
        clearFormResponse(elSignupDIV); 

        if(elFname.value === "") {
            setInputError("First name is required.", elFname);
        }else {
            setInputError("",  elFname);
        }

        if(elLname.value === "") {
            setInputError("Last name is required.", elLname);
        }else {
            setInputError("",  elLname);
        }

        if(elEmail.value === "") {
            setInputError("Email is required.", elEmail);
        } else if(!validateEmail(elEmail.value)) {
            setInputError("Invalid email.",  elEmail);
        } else {
            setInputError("",  elEmail);
        }
        
        if(elPassword.value === "") {
            setInputError("Password is required.", elPassword);
        } else {
            setInputError("", elPassword);
        }

        if(!elTerms.checked) {
            setInputError("You must accept Terms of Use.", elTerms);
        } else {
            setInputError("", elTerms);
        }
    }
    
    //Form submission.
    function submitForm() {
        if(elFname.value !== "" && elLname.value !== "" && elEmail.value !== "" && elPassword.value !== "" && elTerms.checked) {
            const  user = getUser(elEmail.value);
            const encPassword = encrypt(elPassword.value);
           
            if (user === null) {
                const newUser = new User(elFname.value, elLname.value, elEmail.value, encPassword);
                saveUser(newUser);
                setLoggedInUser(newUser);                
                elSignupFORM.reset();
                clearFormResponse(elSignupDIV); 
                showDashboard();
            } else {
                setFormResponse("A user with specified email already exists.", elSignupDIV, elSignupFORM);
            }
        }
    }
};

function login(e) {
    e.preventDefault();
    const elEmail = elLoginFORM.querySelector("input[name='email']");
    const elPassword = elLoginFORM.querySelector("input[name='password']");
    validateForm();
    submitForm();

    //Form validation.
    function validateForm() {
        clearFormResponse(elLoginDIV);
        if(elEmail.value === "") {
            setInputError("Email is required.", elEmail);
        } else if(!validateEmail(elEmail.value)) {
            setInputError("Invalid email.",  elEmail);
        } else {
            setInputError("",  elEmail);
        }
        
        if(elPassword.value === "") {
            setInputError("Password is required.", elPassword);
        } else {
            setInputError("", elPassword);
        }
    }

    //Form submission.
    function submitForm() {
        if(elEmail.value !== "" &&  elPassword.value !== "") {
            const user = getUser(elEmail.value);

            if (user !== null) {
                const password = decrypt(user.password);
                
                if(password !== elPassword.value) {
                    setFormResponse("Invalid Password.", elLoginDIV,  elLoginFORM);
                    return false;
                }

                setLoggedInUser(user);
                elLoginFORM.reset();
                clearFormResponse(elLoginDIV);
                showDashboard();
            } else {
                setFormResponse("Email does not exists.", elLoginDIV,  elLoginFORM);
            }
        }
    }
}

function showPage(e) {
    
    resetElements();

    switch(e.target.id) {
        case "btnSignup":
            setTitle("Create an account | To-do");
            elSignupDIV.classList.remove("hide");
            elLoginDIV.classList.add("hide");
            elIndexDIV.classList.add("hide");
            return;
        case "btnLogin":
            setTitle("Login | To-do");
            elLoginDIV.classList.remove("hide");
            elSignupDIV.classList.add("hide");
            elIndexDIV.classList.add("hide");
            return;
        case "btnBackSignup":
            setTitle("To-do Application");
            elIndexDIV.classList.remove("hide");
            elSignupDIV.classList.add("hide");
            return;
        case "btnBackLogin":
            setTitle("To-do Application");
            elIndexDIV.classList.remove("hide");
            elLoginDIV.classList.add("hide");
            return;
        case "btnLogout":
            setTitle("To-do Application");
            currentUser = {};
            elIndexDIV.classList.remove("hide");
            elDashboardDIV.classList.add("hide");
            elAccountDIV.classList.add("hide");
            elTodoListDIV.classList.add("hide");
            elSettingsDIV.classList.add("hide");
            return;
        case "btnAccountSettings":
            setTitle("Account Settings | To-do");
            elAccountDIV.classList.remove("hide");
            elDashboardDIV.classList.add("hide");
            elTodoListDIV.classList.add("hide");
            showAccountForm();
            return;
        case "btnNewTodoList":
            setTitle("Create new to-do list | To-do");
            elTodoListDIV.classList.remove("hide");
            elDashboardDIV.classList.add("hide");
            elTodoListDIV.querySelector("div#newTodo").classList.remove("hide");
            const listItemsDIV = elTodoListDIV.querySelector("div#listItems");
            listItemsDIV.classList.add("hide");
            return;
        case "btnDashboard":
            showDashboard();
            return;
        case "btnEditTodoList":
            showEditTodoListForm();
            return;
        case "btnCancel":
            const name = elTodoListDIV.querySelector("h2.list-title").innerHTML;
            hideEditForm(name);
            return;
        default:
            return;
    } 
};

function showDashboard() {
    setTitle("Todo lists | To-do");

    elSettingsDIV.classList.remove("hide");
    elDashboardDIV.classList.remove("hide");
   
    elAccountDIV.classList.add("hide");
    elTodoListDIV.classList.add("hide");
    elSignupDIV.classList.add("hide");
    elLoginDIV.classList.add("hide");

    if(currentUser.lists.length > 0 ) {
        loadToDoLists(currentUser.lists);
    } else {
        elTodoListsDIV.classList.add("hide");
    }
}

function showTodoList(e) {
    elDashboardDIV.classList.add("hide");
    elTodoListDIV.classList.remove("hide");
    
    elTodoListDIV.querySelector("div#newTodo").classList.add("hide");
    
    const listName = currentUser.lists.find((list) => {
        return list.name === e.target.innerText;
    });

    loadTodoList(listName);
}

function showEditTodoListForm() {
    const elnewTodoDIV = elTodoListDIV.querySelector("div#newTodo");
    elnewTodoDIV.classList.remove("hide");
    elnewTodoDIV.firstElementChild.classList.add("hide");
     
    const elTitleH2 = elTodoListDIV.querySelector("h2.list-title");

    const elSaveBTN = elTodoListFORM.querySelector("button[type='submit']");
    const elCancelBTN = elTodoListFORM.querySelector("button[type='button']");
    elCancelBTN.classList.remove("hide");
    const elnameINPUT = elTodoListFORM.querySelector("input[name='listName']");

    elnameINPUT.value = elTitleH2.innerText; 
    elSaveBTN.innerText = "Save";

    elTitleH2.classList.add("hide");
    elEditTodoBTN.classList.add("hide");
};

function loadTodoList(list) {
    const elNewTodoDIV = elTodoListDIV.querySelector("div#newTodo");
    const elTodosDIV  = elTodoListDIV.querySelector("div#listItems");
    elNewTodoDIV.classList.add("hide");
    elTodosDIV.classList.remove("hide");
    
    appendElListName();
    appendElTodos();

    function appendElListName() {
        const elTitleH2 = elTodosDIV.querySelector("h2.list-title");
        elTitleH2.innerText = list.name;
    }

    function appendElTodos() {
        const eltodosUL = elTodosDIV.querySelector("ul.todos");
        //Remove existing list.
        if(eltodosUL.hasChildNodes()) {
            while (eltodosUL.firstChild) {
                eltodosUL.removeChild(eltodosUL.firstChild);
            }
        }

        if(list.tasks.length > 0) {
            for(const task of list.tasks) {
                const el = createElTodo(task.id, task.task);
               
                if(task.done) {
                    const elSPAN = el.lastChild;
                    elSPAN.classList.add("status");
                    elSPAN.innerText = "Done";
                    el.firstChild.nextSibling.classList.add("strikeout");
                    el.firstChild.setAttribute("checked", true);
                }
            }
        } else {
            console.log("You don't have any todos.");
        }
    }
}

function hideEditForm(newName) {
    const elnewTodoDIV = elTodoListDIV.querySelector("div#newTodo");
    elnewTodoDIV.classList.add("hide");
    elnewTodoDIV.firstElementChild.classList.remove("hide");

    //update form
    const elTitleH2 = elTodoListDIV.querySelector("h2.list-title");
    elTitleH2.innerText = newName;
    
    const elAddBTN = elTodoListFORM.querySelector("button[type='submit']");
    const elnameINPUT = elTodoListFORM.querySelector("input[name='listName']");
    const elCancelBTN = elTodoListFORM.querySelector("button[type='button']");
    elCancelBTN.classList.add("hide");
    elnameINPUT.value = ""; 
    elAddBTN.innerText = "Add List";

    elTitleH2.classList.remove("hide");
    elEditTodoBTN.classList.remove("hide");
};

function addEditTodoList(e) {
    e.preventDefault();
    const elName = elTodoListFORM.querySelector("input[name='listName']");
    const elNewTodoDIV = elTodoListDIV.querySelector("div#newTodo");
    const elSubmitBTN = elTodoListFORM.querySelector("button[type='submit']");
    const oldName = elTodoListDIV.querySelector("h2.list-title").innerText;

    validateForm();

     //Check for given name is available.
    const isListAvailable = checkExistingName(currentUser.lists, elName.value);
    //create new list or rename list.  
    if(elSubmitBTN.innerText === "ADD LIST") {
        createNewList();

    } else if(elSubmitBTN.innerText === "SAVE") {
        updateTodoList();
    
    } else { }
    
    //Form validation.
    function validateForm() {
       if(elName.value === "") {
            setInputError("You can't create empty list.", elName);
        }
    }

    //Create new list.
    function createNewList() {
        if(elName.value !== "") {  
            if(!isListAvailable) {
                const todo = new ToDo(elName.value);
                
                currentUser.lists.push(todo);
                save();
                elTodoListFORM.reset();
                clearFormResponse(elNewTodoDIV);
                loadTodoList(todo);
            } else {
                setFormResponse("A to-do list already exists with given name.",elNewTodoDIV, elTodoListFORM);
                return false;
            }
        }
    }

    //Rename list.
    function updateTodoList() {
        if(elName.value !== "") {
            if(elName.value !== oldName && !isListAvailable) {
                //Rename list.
                const index = findIndex(currentUser.lists, "name", oldName);
                currentUser.lists[index].name = elName.value;
                save();
                hideEditForm(elName.value);
            } else if (elName.value === oldName) {
                //Nothing updated.
                hideEditForm(elName.value);               
            } else {
                setFormResponse("A to-do list already exists with given name.",elNewTodoDIV, elTodoListFORM);
                return false;
            }
        }
    }
}

function addTodo(e) {
    e.preventDefault(); 
    const name = elTodoListDIV.querySelector("h2.list-title").innerText;
    const elTodo = elTodoFORM.querySelector("input[name='todo']");
    const index = findIndex(currentUser.lists, "name", name );
    
    //Add todo.
    if(elTodo.value !== "" && index !== -1) {
        const id = currentUser.lists[index].tasks.length + 1;
       
        const task = new Task(id, elTodo.value);
        currentUser.lists[index].tasks.push(task);
        save();
        elTodoFORM.reset();
        createElTodo(task.id, task.task);
    } else {
        setInputError("You must enter a task.", elTodo);
    }
}

function checkTodo(e) {
    const el = e.target;
    const id = parseInt(el.id.split("todo").pop());
    const name = elTodoListDIV.querySelector("h2.list-title").innerText;

    const idxList = findIndex(currentUser.lists, "name", name );
    const idxTask = findIndex(currentUser.lists[idxList].tasks, "id", id );

    if(!currentUser.lists[idxList].tasks[idxTask].done) {
        //Check off todo.
        currentUser.lists[idxList].tasks[idxTask].done = true;

        const elSPAN = e.target.parentNode.lastChild;
        elSPAN.classList.add("status");
        elSPAN.innerText = "Done";
        e.target.nextSibling.classList.add("strikeout");
        e.target.setAttribute("checked",true);
    } else {
        //Uncheck todo.
        currentUser.lists[idxList].tasks[idxTask].done = false;
        e.target.nextSibling.classList.remove("strikeout");
        e.target.parentNode.lastChild.remove();
        e.target.setAttribute("checked", false);
    }
    save();
}

function loadToDoLists(lists) {
    const elnewTodoPARA = elDashboardDIV.querySelector("p.new-todo");    

    if(lists.length === 0) {
        elTodoListsDIV.classList.add("hide");
    } else {
        elTodoListsDIV.classList.remove("hide");
        elnewTodoPARA.classList.add("hide");
       
        const el =  elTodoListsDIV.querySelector("ul");
        //Remove existing list.
        if(elTodoListsDIV.contains(el)) {
            el.remove();
        }
        //Load new todo lists.
        const elUL = document.createElement("ul");
        const revlists = lists.slice().reverse();
        
        for(let i = 0; i < revlists.length; i++) {
            const elTodoLI = document.createElement("li");
            const id = "list" + i;
            elTodoLI.setAttribute("id", id);
            elTodoLI.innerText = revlists[i].name;
            elUL.appendChild(elTodoLI);
        }
        elTodoListsDIV.appendChild(elUL);
    }
}

function updateUserAccount(e) {
    e.preventDefault();
    const elFname = elAccountFORM.querySelector("input[name='fname']");
    const elLname = elAccountFORM.querySelector("input[name='lname']");
    const elEmail = elAccountFORM.querySelector("input[name='email']");
    const elPassword = elAccountFORM.querySelector("input[name='password']");
    validateForm();
    submitForm();

    //Form validation.
    function validateForm() {
        if(elFname.value === "") {
            setInputError("First name is required.", elFname);
        }else {
            setInputError("",  elFname);
        }

        if(elLname.value === "") {
            setInputError("Last name is required.", elLname);
        }else {
            setInputError("",  elLname);
        }

        if(elEmail.value === "") {
            setInputError("Email is required.", elEmail);
        } else if(!validateEmail(elEmail.value)) {
            setInputError("Invalid email.",  elEmail);
        } else {
            setInputError("",  elEmail);
        }
        
        if(elPassword.value === "") {
            setInputError("Password is required.", elPassword);
        } else {
            setInputError("", elPassword);
        }
    }    
    
    //Form submission.
    function submitForm() {
        if(elFname.value !== "" && elLname.value !== "" && elEmail.value !== "" && elPassword.value !== "") {
            
            let oldPassword = decrypt(currentUser.password);
            //Check password changed or not.
            if(elPassword.value !== oldPassword) {
                currentUser.password = encrypt(elPassword.value);
            }
            
            currentUser.fname = elFname.value;
            currentUser.lname = elLname.value;
           
            let oldKey =  currentUser.email;
            //Check email changed or not.
            if(currentUser.email !== elEmail.value) {
                const user = getUser(elEmail.value);
                
                if(user !== null) {
                    setFormResponse("A user with specified email already exists.", elAccountDIV, elAccountFORM);
                    return false;
                }
                currentUser.email = elEmail.value;
            }

            storage.removeItem(oldKey);
            saveUser(currentUser);
            
            setFormResponse("Account updated successfully. Please wait you will be redirected to login.", elAccountDIV, elAccountFORM, true);
            elAccountFORM.querySelector("button[type='submit']").setAttribute("disabled",true);

            setTimeout(() => {
                clearFormResponse(elAccountDIV);
                elAccountFORM.querySelector("button[type='submit']").removeAttribute("disabled");    
                elAccountDIV.classList.add("hide");
                elSettingsDIV.classList.add("hide");
                elLoginDIV.classList.remove("hide");
            }, 5000);

            return;
        }
    }   
}