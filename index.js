/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

function createEmployeeRecord(scrArray) {
  return {
    firstName: scrArray[0],
    familyName: scrArray[1],
    title: scrArray[2],
    payPerHour: scrArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(scrArray) {
  return scrArray.map((element) => createEmployeeRecord(element));
}

function createTimeInEvent(timeDate) {
  const hour = parseInt(timeDate.split(" ")[1]);
  const date = timeDate.split(" ")[0];
  this.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date,
  });
  return this;
}

function createTimeOutEvent(timeDate) {
  const date = timeDate.split(" ")[0];
  const hour = parseInt(timeDate.split(" ")[1]);

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date,
  });
  return this;
}

// let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// createTimeInEvent.call(cRecord, "2044-03-15 0900")
// createTimeOutEvent.call(cRecord, "2044-03-15 1100")

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
// createTimeInEvent.call(cRecord, "2044-03-15 0900");
// createTimeOutEvent.call(cRecord, "2044-03-15 1100");

function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((e) => {
    return e.date === date;
  }).hour;
  const timeOut = this.timeOutEvents.find((e) => {
    return e.date === date;
  }).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}


function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.map((employee) => {
    return employee.timeOutEvents
      .map((date) => {
        return wagesEarnedOnDate(date);
      })
      .reduce((acc, (curr) => (acc += curr)));
  });

}

// function calculatePayroll(array){
// }

function findEmployeeByFirstName(collection, firstName) {
  return collection.find((employee) => employee.firstName === firstName);
}
