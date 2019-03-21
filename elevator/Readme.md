# elevator.js

A simple JavaScript program to control a set of elevators in a new building. This program provides the model for moving two elevators to different floors and calling them up and down to different floors. Elevator has an emergency line and a reset option.

## Instructions

- Create a new elevator controller object. This is the brain of the elevator system. 
``` javascript
    const elevatorController = new ElevatorController();
```

- Create a new elevator object. Elevator object. The constructor accepts five properties namely Label, current floor, lowest floor elevator can move, highest floor elevator can move, and the elevator moving direction. Direction property holds either ```Direction.Up``` or ```Direction.DOWN```. 

``` javascript
    const elevatorA = new Elevator("A", 5, -1, 9, Direction.UP);
```

- Add elevators to the elevator controller. Use the method addNewElevator(elevatorObject) and pass the elevator object as the parameter.
``` javascript
    elevatorController.addElevator(elevatorA);
```

- To run the elevator system invoke the operate() method of the elevator controller object.
``` javascript
    elevatorController.operate();
```

- To move the elevator to a different floor invoke the function goToFloor(elevatorObject, floorNumber), passing parameters are the elevator object and destination floor. The range of destination floors is between -1 to 10. 

``` javascript
    elevatorController.goToFloor(elevatorA, 9);
```

- To call the elevator up and down from different floors, invoke the function pickUp(floorNumber) by passing floor number as the parameter.

``` javascript
    elevatorController.pickUp(9);
```

### Notes
- Replace the destination queue with a better data structure. Use of another array to handle request callbacks.
- Calling the emergency line while the elevator is running and reset the emergency exit.
- Code improvement for calculating the distance between the elevator and the calling floor. 
- Testing the algorithm for various usecases.
- Code performance optimization.
- Optimize the script to support 100 passenger requests in different intervals.