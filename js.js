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
  firstArrival = $("#firstArrival")
    .val()
    .trim();
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
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().shipName);
  console.log(childSnapshot.val().planetName);
  console.log(childSnapshot.val().firstArrival);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dateAdded);
  console.log("----------------------------------");

// make jquery make a table for you. do it jquery. like it. love it.
  var newRow = $("<tr>").append(
      $("<td>").text(shipName),
      $("<td>").text(planetName),
      $("<td>").text(firstArrival),
      $("<td>").text(frequency),
     // placeholder for next arrival time
    //   $("<td>").text(nextArrival)
      )

// append it to the bottom 
$("#spaceTable > tbody").append(newRow)

});

// save those variables to firebase '.on("value")', then update dom with snapshot

// dynamically created rows for a table
