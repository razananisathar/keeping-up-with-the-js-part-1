/*
 *  Assignment: Homework Assignment #13: Classes.
 *  Description:  Constructing objects using class.
 */

class Vehicle {
    constructor(make, model, year, weight) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.needsMaintenance = false;
        this.tripsSinceMaintenance = 0;
    }

    repair() {
        this.needsMaintenance = false;
        this.tripsSinceMaintenance = 0;
        return "repaired.";
    }
}

class Cars extends Vehicle {
    constructor(make, model, year, weight) {
        super(make, model, year, weight);
        this.isDriving = false;
    }

    drive() {
        this.isDriving = true;
    }

    stop() {
        this.isDriving = false;
        this.tripsSinceMaintenance += 1;
        
        if(this.tripsSinceMaintenance > 100) {
            this.needsMaintenance = true;
        }
    }
}

class Planes extends Vehicle {
    constructor(make, model, year, weight) {
        super(make, model, year, weight);
        this.isFyling = false;
    }

    fly() {
        try {
            if (this.needsMaintenance) {
                throw "Plane can't fly until it's repaired.";
            }else {
                this.isFyling = true;
            }

        } catch(e) {
            console.log(`%cError: ${e}`, `color:red;`);
        }
    }

    land() {
        this.isFyling = false;
        this.tripsSinceMaintenance += 1;
        
        if(this.tripsSinceMaintenance > 100) {
            this.needsMaintenance = true;
        }

    }
}

// Car Objects
const car01 = new Cars("Volkswagen", "Atlas", "2018", 2670);
const car02 = new Cars("BMW 3 Series", "320d Prestige", "2016", 3494);
const car03 = new Cars("Toyota", "Hybrid XLE", "2019", 3572);

console.log(`%c${car01.make} ${car01.model} Specifications`,  `color:blue; font-weight:bold;`);

for(let i = 0; i <= 120; i++) {
    car01.drive();
    car01.stop();
}

console.log(`Make of the car: ${car01.make}`);
console.log(`Model of the car: ${car01.model}`);
console.log(`Year of release: ${car01.year}`);
console.log(`Weight of the car: ${car01.weight} lbs`);
console.log(`Number of trips since maintenance? ${car01.tripsSinceMaintenance}`);
console.log(`Does ${car01.make} ${car01.model} need maintenance?`, ((car01.needsMaintenance)? "Yes": "No"));

// Car under repair.
if(car01.needsMaintenance) {
    console.log( `%c ${car01.make} ${car01.model} ${car01.repair()}`, `color:green;`);
    console.log(`Number of trips since maintenance? ${car01.tripsSinceMaintenance}`);
}

console.log(`%c${car02.make} ${car02.model} Specifications`, `color:blue; font-weight:bold;`);
car02.drive();
car02.stop();

console.log(`Make of the car: ${car02.make}`);
console.log(`Model of the car: ${car02.model}`);
console.log(`Year of release: ${car02.year}`);
console.log(`Weight of the car: ${car02.weight} lbs`);
console.log(`Number of trips since maintenance? ${car02.tripsSinceMaintenance}`);
console.log(`Does ${car02.make} ${car02.model} need maintenance?`, ((car02.needsMaintenance)? "Yes": "No"));

// Car under repair.
if(car02.needsMaintenance) {
    console.log( `%c ${car02.make} ${car02.model} ${car02.repair()}`, `color:green;`);
    console.log(`Number of trips since maintenance? ${car02.tripsSinceMaintenance}`);
}

console.log(`%c${car03.make} ${car03.model} Specifications`, `color:blue; font-weight:bold;`);
car03.drive();
car03.stop();

console.log(`Make of the car: ${car03.make}`);
console.log(`Model of the car: ${car03.model}`);
console.log(`Year of release: ${car03.year}`);
console.log(`Weight of the car: ${car03.weight} lbs`);
console.log(`Number of trips since maintenance? ${car03.tripsSinceMaintenance}`);
console.log(`Does ${car03.make} ${car03.model} need maintenance?`, ((car03.needsMaintenance)? "Yes": "No"));

// Car under repair.
if(car03.needsMaintenance) {
    console.log( `%c ${car03.make} ${car03.model} ${car03.repair()}`, `color:green;`);
    console.log(`Number of trips since maintenance? ${car03.tripsSinceMaintenance}`);
}

// Plane Object
const plane01 = new Planes("Boeing", "787-9 Dreamliner", "2013", 54500);

console.log(`%c${plane01.make} ${plane01.model} Specifications`,  `color:blue; font-weight:bold;`);

console.log(`Make of the plane: ${plane01.make}`);
console.log(`Model of the plane: ${plane01.model}`);
console.log(`Year of release: ${plane01.year}`);
console.log(`Weight of the plane:  ${plane01.weight} lbs`);

for(let i = 0; i <= 101; i++) {
    plane01.fly();
    plane01.land();
}

console.log(`Number of trips since maintenance?  ${plane01.tripsSinceMaintenance}`);
console.log(`Does ${plane01.make} ${plane01.model} need maintenance?`, ((plane01.needsMaintenance)? "Yes": "No"));

// Plane under repair.
if(plane01.needsMaintenance) {
    console.log( `%c ${plane01.make} ${plane01.model} ${plane01.repair()}`, `color:green;`);
    console.log(`Number of trips since maintenance? ${plane01.tripsSinceMaintenance}`);
}