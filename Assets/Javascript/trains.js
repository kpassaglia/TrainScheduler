
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

    event.preventDefault()


    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var nextArrival = $("#next-arrival").val().trim();
    var minAway = $("#min-away").val().trim();

    
    //FIREBASE SECTION _____________________________________ 

    var push = database.ref().push();
    push.set({
        name: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minAway: minAway
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#frequency").val("");
    $("#next-arrival").val("");
    $("#min-away").val("");    



    //FIREBASE SECTION _____________________________________


});

database.ref().on("child_added", function(childSnapshot){
    var data = childSnapshot.val();
    var tbody = $('tbody');
    var tRow = $("<tr>");
    var nameCell = $('<td>').text(data.name);
    var destinationCell = $('<td>').text(data.destination);
    var frequencyCell = $('<td>').text(data.frequency);
    var nextArrivalCell = $('<td>').text(data.nextArrival);
    var minAwayCell = $('<td>').text(data.rate);


    

    tRow.append(nameCell, destinationCell, frequencyCell, nextArrivalCell, minAwayCell);
    tbody.append(tRow);

    
    
});








// var today = new Date();




// var startFormat = new Date(start);
// var startTimeZone= new Date(startFormat.getTime() + Math.abs(startFormat.getTimezoneOffset()*60000));
// var startDate = startTimeZone.getMonth() + 1 + '/' + startTimeZone.getDate() + '/' +  startTimeZone.getFullYear();