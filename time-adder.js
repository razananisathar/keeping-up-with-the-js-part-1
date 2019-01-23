/*
 *  Assignment: Homework Assignment #5: Switch Statements.
 *  Description:  Time adder - adds two time values together.
 */

//@desc: validate string and number inputs. 
const validateInputs = (num1, num2, str1, str2) => {
    //validate input types.
    if(typeof num1 === "number" && typeof num2 === "number" && 
                                   typeof str1 === "string" && typeof str2 === "string"){
        //validate positive numbers.                           
        if(num1 > 0 && num2 > 0) {
            const lastChar1 = str1.substr(-1);
            const lastChar2 = str2.substr(-1);
            
            //validate combinations of inputs.
            if(!(lastChar1 !== "s" && num1 > 1 || lastChar1 === "s" && num1 === 1  || 
                            lastChar2 !== "s" && num2 > 1 || lastChar2 === "s" && num2 === 1)) {
                return true;
            }
        }
    }
    
    return false;
};

//@desc: convert time in seconds. 
const convertToSeconds = (label, value) => {
    const lbl = label.toLowerCase();

    switch (lbl) {
        case "second":
        case "seconds":
            return value;
        case "minute":
        case "minutes":
            return value*60;
        case "hour":
        case "hours":
            return value*60*60;
        case "day":
        case "days":
            return value*60*60*24;               
        default:
            return 0;
    }
};

//@desc: add time.
const timeAdder = (value1, label1, value2, label2) => {
    
     //test string and number inputs.
    const isValidInputs = validateInputs(value1, value2, label1, label2);
    const time = [];

    if(isValidInputs) {
        const time1 = convertToSeconds(label1, value1);
        const time2 = convertToSeconds(label2, value2);
        let timeInSeconds;

        if(Boolean(time1) && Boolean(time2)){
            timeInSeconds = time1 + time2;
        }
  
        //convert total time format
        if (timeInSeconds === 86400) {
            time.push(1, "day");
        } else if(timeInSeconds%86400 === 0 && timeInSeconds > 86400 ){
            const days = timeInSeconds/86400;
            time.push(days, "days");
        } else if(timeInSeconds === 3600) {
            time.push(1, "hour");
        } else if(timeInSeconds%3600 === 0 && timeInSeconds > 3600) {
            const hours = timeInSeconds/3600;
            time.push(hours, "hours");
        } else if(timeInSeconds === 60) {
            time.push(1, "minute");
        } else if(timeInSeconds%60 === 0 && timeInSeconds > 60) {
            const minutes = timeInSeconds/60;
            time.push(minutes, "minutes");
        } else if(timeInSeconds === 1) {
            time.push(1, "second");
        } else {
            time.push(timeInSeconds, "seconds");
        }
        return time;
    }

    return false;
};

console.log(timeAdder(5,"hours",15,"minute"));
console.log(timeAdder(0,"minute",5,"minutes"));
console.log(timeAdder(25,"hours",3,"days"));
console.log(timeAdder(1,"minute",240,"seconds"));
console.log(timeAdder(5,"days",25,"hours"));
console.log(timeAdder(1,"minute",240,"seconds"));
console.log(timeAdder(20,"hours",4,"hours"));
console.log(timeAdder(20,"hours",5,"hours"));

console.log(timeAdder(5,"hour",5,"minutes"));
console.log(timeAdder(false,false,5,"minutes"));
console.log(timeAdder({},"days",5,"minutes"));