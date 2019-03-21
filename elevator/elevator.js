/*
 *  Project: Project #3.
 *  Description:  Build the brain for a set of elevators in a new building.
 */

/** 
 * The elevator movement has two directions.
 * @enum {string} UP - The direction of the elevator moving up
 * @enum {string} DOWN - The direction of the elevator moving down
 */
const Direction = {
    UP: "UP",
    DOWN: "DOWN"
};

/** 
 * Elevator Model
 * @param {string} label - Name of the elevator 
 * @param {number} currentFloor - Current floor of the elevator
 * @param {number} minFloor - The lowest floor the elevator moves to
 * @param {number} maxFloor - The highest floor the elevator moves to
 * @param {enum} direction -  The direction of the elevator movement
 * @param {boolean} doorsOpen - The status of the elevator door open or not
 * @param {boolean} isMoving - The status of the elevator moving or not
 * @param {array} destinationFloor - The queue of destination floor numbers
 */
class Elevator {
    constructor(label, currentFloor, minFloor, maxFloor, direction) {
        this.label = label;
        this.currentFloor = currentFloor;
        this.minFloor = minFloor;
        this.maxFloor = maxFloor;
        this.direction = direction;
        this.doorsOpen = false;
        this.isMoving = false;
        this.destinationFloors = [];
    }

    /** 
     * Add new request destination to the queue.
     * @param {number} destination - Destination floor number
     */
    addNewDestination(destination) {
        try {
            if (this.testElevatorBoundries(destination)) {
                // Omit already existing request to same floor.
                let idx  = this.destinationFloors.findIndex((el)=> {
                     return el === destination;
                 });
               
                if(idx === -1) {
                    this.destinationFloors.push(destination);
                    this.setStatus();
                }
                
            } else {
                throw "Elevator " + this.label + " doesn\'t move to floor " + destination;
            }
        } catch (e) {
            console.log(`%cError: ${e}`, `color:red;`);
        }    
    }

    /** 
     * Elevator moves one floor up.
     */
    moveUp() {
        this.currentFloor += 1;
    }

    /** 
     * Elevator moves one floor down.
     */
    moveDown() {
        this.currentFloor -= 1;
    }

    /** 
     * Validate the elevator boundaries.
     * @param {number} floor - The floor number 
     * @return {boolean} - validation result
     */
    testElevatorBoundries(floor) {
        return (this.minFloor <= floor && this.maxFloor >= floor);
    }

    /** 
     * Set the movement of the elevator.
     * If there are no pending requests to move, then elevator stops at the current floor.
     */
    setStatus() {
        this.isMoving = (this.destinationFloors.length !== 0) ? true : false;
    }
    
    /** 
     * Set the status of the door.
     * when the elevator arrives at the destination floor, then the door open status becomes true.
     */
    openDoors() {
        this.doorsOpen = true;
        this.logConsole(this, "open doors - floor");
    }

    /** 
     * Set the status of the door.
     * when the elevator starts moving, then the door open status becomes false.
     */
    closeDoors() {
        this.doorsOpen = false;
        this.logConsole(this, "close doors - floor");
    }

    /** 
     * Calculate the distance between the elevator and the floor which calling the elevator.
     * @param {number} destinationFloor - Destination floor number/Floor which calling the elevator
     * @returns {number} - Distance
     */
    getDistance(destinationFloor) {
        let distance;
        
        if(this.currentFloor === destinationFloor) {
            distance = 0;
        }else {
            let last = this.destinationFloors[this.destinationFloors.length - 1];

            switch(this.direction) {
                case Direction.UP:
                    if(this.currentFloor < destinationFloor) {
                        distance = destinationFloor - this.currentFloor;
                    } else {
                        // Elevator going up, request from down
                        distance = (destinationFloor -this.currentFloor) + (last - destinationFloor);
                    }
                break;
                case Direction.DOWN:
                    if(this.currentFloor > destinationFloor) {
                        distance = this.currentFloor - destinationFloor;
                    } else {
                        // Elevator going down, request from up
                        distance = (this.currentFloor - last) + (destinationFloor - last);
                    }
                break;
            }
        }
        
        return Math.abs(distance);
    }

    /** 
     * Move the elevator to the nearest floor, then open the door. 
     */
    goToNearestFloor() {
        this.logConsole(this, "emergency button pressed in floor " + this.currentFloor);
        switch(this.direction) {
            case Direction.UP:
                if(this.currentFloor !== this.maxFloor) {
                    this.moveUp();
                } 
                break;
            case Direction.DOWN:
                if(this.currentFloor !== this.minFloor) {
                    this.moveDown();
                }
                break;
        }

        let self = this;

        window.setTimeout(() => {
            self.goToNearestFloor();
        }, 1000);

        this.logConsole(this, "moves to floor");
        this.openDoors();
        this.setStatus(); 
    }

    /** 
     * Reset the elevator. 
     */
    reset() {
        this.logConsole(this, "reset button pressed in floor");
        if(this.doorsOpen) {
            this.closeDoors();
            this.destinationFloors.length = 0;
            this.isMoving = false;  
        }

        // Change the direction, when the elevator reaches the elevator boundaries.
        if(this.currentFloor === this.minFloor) {
            this.direction = Direction.UP;
        } else if(this.currentFloor === this.maxFloor) {
            this.direction = Direction.DOWN;
        }
    }

    /** 
     * Elevator arrives at the destination floor.
     * Remove destination from the queue. 
     * @returns {array} - The destination queue 
     */
    removeDestionation() {
        return this.destinationFloors.shift();
    }
    
    /** 
     * Get the next destination floor in the queue. 
     * @returns {number} - The next destination 
     */
    getNextDestionation() {
        return this.destinationFloors[0];
    }

    /** 
     * The elevator moves up and down until it has no pending destination requests. 
     */
    run() {
        
        if(!this.isMoving && this.destinationFloors.length == 0) {
            return;
        }
        
        let destination = this.getNextDestionation();
        
        if(this.isMoving && typeof destination === "undefined") {
            this.setStatus();
        }

        switch(this.direction) {
            case Direction.UP:
                if(this.currentFloor === this.maxFloor) {
                    this.direction = Direction.DOWN;
                }       

                if(this.currentFloor === destination) {
                    this.logConsole(this, "arrived at floor");
                    this.removeDestionation();
                    this.openDoors();
                    // After few seconds close the door.
                    this.closeDoors();
                }  
                else if(this.currentFloor < destination) {
                    this.logConsole(this, "passing floor");
                    this.moveUp();  
                }
                else if(this.currentFloor > destination) {
                    this.logConsole(this, "passing floor");
                    this.direction = Direction.DOWN;
                    this.moveDown();
                }
            break;
            case Direction.DOWN:
                if(this.currentFloor === this.minFloor) {
                    this.direction = Direction.UP;
                }

                if(this.currentFloor === destination) {
                    this.logConsole(this, "arrived at floor");
                    this.removeDestionation();
                    this.openDoors();
                    // After few seconds close door
                    this.closeDoors();
                } 
                else if(this.currentFloor > destination) {
                    this.logConsole(this, "passing floor");
                    this.moveDown();
                }
                else if(this.currentFloor < destination ) {
                    this.logConsole(this, "passing floor");
                    this.direction = Direction.UP;
                    this.moveUp(); 
                }
            break;
        }
    }
    
    /** 
     * Log action to the console. 
     */
    logConsole(elevator, action) {
        switch(elevator.label) {
            case "A":
                console.log(`%cElevator ${elevator.label} ${action} ${elevator.currentFloor}`, `color:green;`);
            break;
            case "B":
                console.log(`%cElevator ${elevator.label} ${action} ${elevator.currentFloor}`, `color:blue;`);
            break;
        }
    }
}

/** 
 * ElevatorController Model
 * @param {array} elevators - Array of elevator objects 
 * @param {array} floors - Array of floor numbers
 */
class ElevatorController {
    constructor() {
        this.elevators = [];
        this.floors = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    /** 
     * Add a new elevator object to the array of elevators.
     * @param {object} - The elevator object
     */
    addElevator(elevator) {
        this.elevators.push(elevator);
    }

    /** 
     * @returns {array} - The array of elevators
     */
    getElevators() {
        return this.elevators;
    }

    /** 
     * @returns {array} - The array of floors
     */
    getFloors() {
        return this.floors;
    }

    /** 
     * Find the elevator which matching the given elevator label.
     * @param {string} - The elevator label
     * @returns {object} - elevator
     */
    getElevatorByLabel(label) {
        const elevator = this.elevators.find((el) => {
            return el.label === label;
        });

        return elevator;
    }
    /** 
     * Find the nearest elevator to serve the calling request.
     * The floor buttons up/down calling invoke this method. 
     * @param {number} floor - The floor number which requests the elevator 
     * @returns {object} - The nearest elevator object
     */
    pickUp(floor) {
        let elevators = this.getElevators();
        let distanceA, distanceB, nearestElevator;

        elevators.forEach((elevator) => {
            switch(elevator.label) {
                case "A":
                    if(elevator.testElevatorBoundries(floor)) {
                        distanceA = elevator.getDistance(floor);
                    } else distanceA = 0;
                break;
                case "B":
                    if(elevator.testElevatorBoundries(floor)) {
                        distanceB = elevator.getDistance(floor);
                    } else distanceB = 0;    
                break;
            }
        });

        if(distanceA !== 0 && distanceB !== 0) {
            if(distanceA <= distanceB) {
                nearestElevator = this.getElevatorByLabel("A");
            } else {
                nearestElevator = this.getElevatorByLabel("B");
            }
        
        } else if(distanceB !== 0 && distanceA === 0) {
            nearestElevator = this.getElevatorByLabel("B");

        } else if(distanceA !== 0 && distanceB === 0) {
            nearestElevator = this.getElevatorByLabel("A");
        }

        nearestElevator.addNewDestination(floor);
        return nearestElevator;
    }

    /** 
     * The elevator destination floor selection button calls invoke this method. 
     * @param {object} elevator - The elevator object
     * @param {number} destinationFloor - The floor number elevator wants to move
     */
    goToFloor(elevator, destinationFloor) {
        elevator.addNewDestination(destinationFloor);
    }

    /** 
     * The elevator emergency button call invokes this method. 
     * The elevator moves to the nearest floor.
     * @param {object} elevator - The elevator object
     */
    callEmergencyLine(elevator) {
        // this.logConsole(elevator, " emergency button pressed");
        let el = this.elevators.find((item) => {
            return item.label === elevator.label;
        });
        
        el.goToNearestFloor();
    }

     /** 
     * The elevator reset button call invokes this method. 
     * @param {object} elevator - The elevator
     */
    resetEmergencyLine(elevator) {
        elevator.reset();
    }

     /** 
     * The operation of the elevator control system invokes this method. 
     */
    operate() {
        this.elevators.forEach((elevator) => {
            elevator.run();
        });
    }

    /** 
     * Log action to the console. 
     */
    logConsole(elevator, action) {
        switch(elevator.label) {
            case "A":
                console.log(`%cElevator ${elevator.label} ${action}`, `color:red;`);
            break;
            case "B":
                console.log(`%cElevator ${elevator.label} ${action}`, `color:green;`);
            break;
        }
    }
}


const elevatorA = new Elevator("A", 5, -1, 9, Direction.UP);
const elevatorB = new Elevator("B", 7, 0, 10, Direction.DOWN);

const elevatorController = new ElevatorController();

elevatorController.addElevator(elevatorA);
elevatorController.addElevator(elevatorB);

let elevatorRunTimer = setInterval(() => {
    elevatorController.operate();
}, 1000);

setTimeout(() => { 
    clearInterval(elevatorRunTimer); 
    console.log("Elevator controller stopped.");
}, 180000);

/*-----------Test Cases---------------------*/
// elevatorController.pickUp(10);
// elevatorController.pickUp(-1);
// elevatorController.goToFloor(elevatorA, 3); 
// elevatorController.pickUp(9);
// elevatorController.goToFloor(elevatorB, 3); 
// elevatorController.goToFloor(elevatorB, 1); 
// elevatorController.goToFloor(elevatorA, 8);
// elevatorController.pickUp(3);
// elevatorController.goToFloor(elevatorB, 4);
// elevatorController.goToFloor(elevatorA, 8);
// elevatorController.goToFloor(elevatorB, 9);      

ridePassengers = () => {
   const floors = elevatorController.getFloors();

        // Random number of passangers
        let passengerRequests = Math.floor(((Math.random()*100) + 1) % floors.length);

            for(let j = 0; j <= passengerRequests; j++) {
                //Random floor request
                let floor = floors[Math.floor(Math.random() * floors.length)];
                
                let el = elevatorController.pickUp(floor);
                
                // Travelling to random floor
                floor = floors[Math.floor(Math.random() * floors.length)];
                elevatorController.goToFloor(el, floor); 

            }
}

ridePassengers();