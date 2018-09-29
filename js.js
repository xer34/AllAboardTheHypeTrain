//firebase - so cool
var config = {
  apiKey: "AIzaSyCIbk8LbS05J3mXegoQlyZR1919Y-XJ0FI",
  authDomain: "interstellar-21d60.firebaseapp.com",
  databaseURL: "https://interstellar-21d60.firebaseio.com",
  projectId: "interstellar-21d60",
  storageBucket: "interstellar-21d60.appspot.com",
  messagingSenderId: "1088296794678"
};

firebase.initializeApp(config);

//assign var for our DB

const database = firebase.database();

// variables for ship name, destination, frequency, next arrival, minutes away

var shipName = "",
  planetName = "",
  firstArrival = "",
  frequency = "",
  minAway = 0;

//submit button, on click

$("#sumbit-button").on("click", function(event) {
  event.preventDefault();

  // pull values from the text area, trim em, boil em, mash em, stick em in a stew

  shipName = $("#starshipName")
    .val()
    .trim();
  planetName = $("#planetName")
    .val()
    .trim();
  firstArrival = $("#firstArrival").val();
  frequency = $("#frequency")
    .val()
    .trim();

  // push the database values
  database.ref().push({
    shipName: shipName,
    planetName: planetName,
    firstArrival: firstArrival,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  alert("Interstellar Travel Successfully Submitted");

  //resets form after submit
  $("form").trigger("reset");
});

//on child added, snapshot it and console log that biz
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val().shipName);
    console.log(childSnapshot.val().planetName);
    console.log(childSnapshot.val().firstArrival);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().dateAdded);
    console.log("----------------------------------");

    // //time handler

    //frequency
    var tFrequency = childSnapshot.val().frequency;

    //time
    var firstTime = childSnapshot.val().firstArrival;

    //first time
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    //next min
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL SHIP: " + tMinutesTillTrain);

    //next one
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // make jquery make a table for you. do it jquery. like it. love it.
    var newRow = $("<tr scope='row'>").append(
      $("<th>").text(childSnapshot.val().shipName),
      $("<td>").text(childSnapshot.val().planetName),
      $("<td>").text(childSnapshot.val().frequency),
      $("<td>").text(moment(nextTrain).format("hh:mm")),
      $("<td>").text(tMinutesTillTrain)
    );

    // append it to the bottom
    $("#spaceTable > tbody").append(newRow);

    //error handler, copypasta
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
