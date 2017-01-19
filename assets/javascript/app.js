$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyBo3ttPWjWnXi1TJemoz95FVGOR8AP31iQ",
    authDomain: "train-679b8.firebaseapp.com",
    databaseURL: "https://train-679b8.firebaseio.com",
    storageBucket: "train-679b8.appspot.com",
    messagingSenderId: "40962142528"
    };
    firebase.initializeApp(config);

  var database = firebase.database();

   $("#add-train").on("click", function() {
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    });
      
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
      
      return false;
    });

database.ref().on("child_added", function(snapshot){
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().destination);
  console.log(snapshot.val().firstTime);
  console.log(snapshot.val().frequency);
  
 
  var firstTime = snapshot.val().firstTime;

  var frequency = snapshot.val().frequency;
  var currentTime = moment();
  console.log(currentTime);

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("difference in time " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
  
  var minutesAway = frequency - tRemainder;
  console.log("minutes until train: " + minutesAway);
  
  var nextTime = moment().add(minutesAway, "minutes");
  console.log("arrival time: " + moment(nextTime).format("hh:mm"));
  
  var nextTrainTime = moment(nextTime).format("hh:mm a");

  $("#new-train").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().destination + "</td><td>" + frequency +  "</td><td>" + nextTrainTime +  "</td><td>" + minutesAway + "</td></tr>");

  }, function(errorObject){
  console.log("The read failed: " + errorObject.code);
  });


});