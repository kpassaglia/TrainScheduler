
  // Initialize Firebase 
  var config = {
    apiKey: "AIzaSyB3x10Eh83ct_NvHY4jo471FUjYUxxITGU",
    authDomain: "trainscheduler-aed8b.firebaseapp.com",
    databaseURL: "https://trainscheduler-aed8b.firebaseio.com",
    projectId: "trainscheduler-aed8b",
    storageBucket: "trainscheduler-aed8b.appspot.com",
    messagingSenderId: "269315214421"
  };
  firebase.initializeApp(config);


var database = firebase.database();

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTime =  $("#firstTime").val().trim();
    if(frequency == ""){ 
        alert("Please submit Train Frequency");
        return;
    } else{

    //FIREBASE SECTION _____________________________________ 

var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency   
}
    
    database.ref().push(newTrain);
  

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTime").val("");
    $("#frequency").val("");
   
    
    };
});

//FIREBASE WRITE SECTION _____________________________________

var currentTime = moment();
var updateTime = setInterval(timeNow, 1000)

database.ref().on("child_added", function(childSnapshot){
    var data = childSnapshot.val();
    var tbody = $('tbody');
    var tRow = $("<tr>");
    
    console.log("Current time: " + currentTime)
    console.log("min: " + data.frequency)

    var firstTimeConverted = moment(data.firstTime, "hh:mm").subtract(1, "years");  
    console.log("first Time: " + firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Time Diff: " + diffTime);
    var tRemainder = diffTime % data.frequency;
    console.log("remainder: " + tRemainder);

    var tMinutesTillTrain = data.frequency - tRemainder;
    console.log(tMinutesTillTrain);
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log(nextTrain);
    var nextArrival = moment(nextTrain).format("hh:mm");
    console.log("Next Arrival: "+ nextArrival);

    var nameCell = $('<td>').text(data.trainName);
    var destinationCell = $('<td>').text(data.destination);
    var frequencyCell = $('<td>').text(data.frequency);
    var nextArrivalCell = $('<td>').text(nextArrival);
    var minAwayCell = $('<td>').text(tMinutesTillTrain);

    tRow.append(nameCell, destinationCell, frequencyCell, nextArrivalCell, minAwayCell);
    tbody.append(tRow);
});

function timeNow(){
 var timeNow = moment().format("hh:mm:ss A");
 $("#timeNow").text(timeNow);

}






