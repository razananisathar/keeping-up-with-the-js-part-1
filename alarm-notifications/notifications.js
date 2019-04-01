/*
 *  Assignment: Homework Assignment #17: The Notifications API.
 *  Description:  Build a standalone webpage that acts as a simple notification-based alarm clock. 
 *                Use WHATWG Notifications API and MDN Notifications API. 
 *  Video Component: https://www.youtube.com/watch?v=9dgzL6PVGJU
 */

const STORAGE = window.localStorage;
const KEY = "alarms";

/**
 * Alarm Notifications 
 * 
 * @constructor 
 * These are properties of the alarm stored.
 * @param {number} id Alarm created time in milliseconds.
 * @param {string} date  The alarm trigger date in YYYY-MM-DD format.
 * @param {string} time The alarm trigger time in HH:MM format.
 * @param {boolean} notified The alarm trigger status.   
 */
class AlarmNotifications {
    constructor() {
        this.id = null;
        this.date = null;
        this.time = null;
        this.notified = false;
    }

    // Set default date and time to current date and time.
    setDefaults() {
        const now = new Date();
       
        const mm = (now.getMonth() + 1).toString().padStart(2,"0");
        const yyyy = now.getFullYear().toString();
        const dd =  now.getDate().toString().padStart(2,"0");
        this.date = [yyyy, mm, dd].join("-");
        
        const hrs = now.getHours().toString().padStart(2,"0");
        const mms = now.getMinutes().toString().padStart(2,"0");
        this.time  = [hrs, mms].join(":");
       
        elDateINPUT.value = this.date;
        elTimeINPUT.value = this.time;
        elDateINPUT.setAttribute("min", this.date); 
        elTimeINPUT.setAttribute("min", this.time); 
    }

    /**
     * Converts string date and time to time in milliseconds.
     * @param {string} date Alarm date in YYYY-MM-DDD format.
     * @param {string} time  Alarm time in HH:MM format.
     * @returns {number} Time in milliseconds.
     */
    getTimestamp(date, time) { 
        const hours = parseInt(time.split(":")[0]);
        const minutes = parseInt(time.split(":")[1]);

        const tmsp = new Date(date);
        tmsp.setHours(hours);
        tmsp.setMinutes(minutes);
        
        return tmsp;
    }
   
    // Add new alarms.
    setAlarm(date, time) {  
        if(date === "" && time === "") {
            return;    
        }
        
        const alarmtmsp = Math.floor(this.getTimestamp(date, time)/1000);
        const now = Math.floor(new Date().getTime()/1000);

        // Validate alarm and save
        try {
            if(alarmtmsp > now) {
                this.id = new Date().getTime();
                this.date = date;
                this.time = time;

                try {
                    this.save(this);
                    this.createNode(this);        
                    this.showMessage("New alarm set.", "success", "error");
                    this.hideMessage();
                } catch(e) {
                    this.showMessage(e, "error", "success");
                }
            } else throw "Can't set alarms for times in the past.";
        } catch(e) {
                this.showMessage(e, "error", "success");
        }
    } 
    /**
     * Store the alarm entry in localStorage.
     * @param {object} alarm The alarm object. 
     */
    save(alarm) {
        const alarms = [];
        const searchResult = [];
        
        if(STORAGE.getItem(KEY) !== null) {
            alarms.push(...this.getAll());
            searchResult.push(...alarms.filter(item => (item.date === alarm.date && item.time === alarm.time)));
        }
        // Check for duplicate alarm entries.
        if(searchResult.length !== 0) {
           throw "Alarm already exists.";
        } else {
           alarms.push(alarm);
           STORAGE.setItem(KEY, JSON.stringify(alarms));
        }
    }

    getAll() {
        return JSON.parse(STORAGE.getItem(KEY));
    }

    /**
     * Update alarm notification status and store in localStorage.
     * @param {id} alarm The alarm object id. 
     */
    updateStatus(id) {
        const alarms = this.getAll();
       
        if(alarms !== null) {
            const idx = alarms.map(alarm => alarm.id).indexOf(id);
            alarms[idx].notified = true;
        
            STORAGE.setItem(KEY, JSON.stringify(alarms)); 

            const elStatus = document.getElementById(`status${id}`);
            
            elStatus.innerText = "Triggered";
            elStatus.classList.remove("hide");
            elStatus.classList.add("show");
        } 
    }

    /**
     * Delete the selected alarm in localStorage.
     * @param {object} el The DOM button object. 
     */
    delete(el) {
        const alarms = this.getAll();
        const arr  = alarms.filter(alarm => alarm.id !== parseInt(el.id.slice(3)));

        STORAGE.setItem(KEY, JSON.stringify(arr));
        el.parentNode.remove();
    }

    // Create a DOM node for alarm entry.
    createNode({id, date, time, notified}) {
        const elPARA = `<div class="entry">
                            <p>${new Date(date).toDateString()}&nbsp;
                               ${this.getTimestamp(date, time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                               <span id="status${id}" class="status ${(!notified)? 'hide':'show'}">${(notified) ? "Triggered": ""}</span></p>
                            <button type="button" class="btn btn-delete" id="del${id}" value="${id}">x</button>
                            <div class="clearfix"></div>
                        </div>`;

        elAlarmsDIV.insertAdjacentHTML("afterbegin", elPARA);
    };
    
    // Display validation message in the DOM.
    showMessage(msg, addClass, removeClass) {
        elMsgPARA.innerText = msg;
        elMsgPARA.classList.remove(removeClass);
        elMsgPARA.classList.add(addClass);
    }
    
    // Hide validation message in the DOM.
    hideMessage() {
        setTimeout(() => {
            elMsgPARA.innerText = "";
            elMsgPARA.classList.remove("success", "error");
        }, 5000);
    }

    // Get all alarm entry elements.
    initAlarms() {
        const alarms = this.getAll();
        if(alarms !== null) {
            for(const alarm of alarms) {
                this.createNode(alarm);
            }
        }    
    }
    
    // Execute notifications.
    triggerNotifications() {
        let nowInSeconds = Math.floor(new Date().getTime()/1000);
        
        const alarms = this.getAll();
        
        if(alarms !== null) {
            for(const {id, date, time} of alarms) {
              
                let alarmInSeconds = Math.floor(this.getTimestamp(date, time)/1000);
                    if(nowInSeconds === alarmInSeconds) {
                        return this.createNotifications(id, date, time); 
                    }
            }
        }
    }
    
    // Create and handle notifications, and update alarm status.
    createNotifications(id, date, time) {
        
        const body = `Beep Beep!! ${new Date(date).toDateString()} ${this.getTimestamp(date, time).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
        const icon = "alarm-clock-icon.png"; 
       
        const notificationObj = new Notification("Alarm Notifications", {
                 body, 
                 icon 
            });
          
        if(Notification.permission === "granted") {
            const notification = notificationObj;
         
            setTimeout(() => {
                notification.close.bind(notification);
                this.updateStatus(id);
            }, 5000);
        }
     
        else if(Notification.permission !== "denied") {
            Notification.requestPermission().then(status => {
                if(status === "granted") {
                    const notification = notificationObj;
                    setTimeout(() => {
                        notification.close.bind(notification);
                        this.updateStatus(id);
                    }, 5000);
                } else {
                    alert(`Alarm Notifications: ${body}`);
                }
            });
        }
    }

    // Activate notifications.
    initNotifications() {
        setInterval(() => this.triggerNotifications(), 1000);
    }
}

// DOM elements. 
const elAlarmDIV = document.getElementById("alarm");
const elAlarmsDIV = document.getElementById("alarms");
const elAlarmFORM = elAlarmDIV.getElementsByClassName("form-alarm");
const elDateINPUT = document.getElementById("date");
const elTimeINPUT = document.getElementById("time");
const elSubmitBTN = document.getElementById("submit");
const elMsgPARA = document.getElementById("message");

// Alarm object.
const alarmObj = new AlarmNotifications();

// DOM event handlers.
const submit = (e) => {
    e.preventDefault();
    alarmObj.setAlarm(elDateINPUT.value, elTimeINPUT.value);
};

const remove = (e) => {
    e.preventDefault();
    if(e.target.matches("button.btn-delete")) {
        alarmObj.delete(e.target);
    }
};

const load = () => {
    // Let's check if the browser supports notifications.
    if (!("Notification" in window)) {
        console.log("This browser does not support system notifications");
    }

    // At first, let's check if we have permission for notification, If not, let's ask for it.
    else if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission(status => {
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
        });
    }
    
    alarmObj.setDefaults();
    alarmObj.initAlarms();
    alarmObj.initNotifications();
};

// DOM events.
window.addEventListener("load", load);
elSubmitBTN.addEventListener("click", submit);
elAlarmsDIV.addEventListener("click", remove);