
// // 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAU66EdT9PZD2Vu_5Y3mnSrDybg3sAoAIo",
    authDomain: "train-schedule-a86e9.firebaseapp.com",
    databaseURL: "https://train-schedule-a86e9.firebaseio.com",
    projectId: "train-schedule-a86e9",
    storageBucket: "",
    messagingSenderId: "220874887192",
    appId: "1:220874887192:web:408254d3d29e40ab"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();


//
$(".search").on("click", function (event) {
    event.preventDefault();

    let frequency = $(".freq").val().trim();
    let firstTime = moment($(".firstTrain").val().trim(), "HH:mm");
    let trainName = $(".trainsName")
        .val()
        .trim();
    let destination = $(".destination")
        .val()
        .trim();
    let firstTimeConverted = moment(firstTime).format("X");
    let newTrain = {
        tName: trainName,
        dest: destination,
        tTime: firstTimeConverted,
        freq: frequency
    };

database.ref().push(newTrain);
console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.firstTimeConverted);
console.log(newTrain.frequency);

// Clears all of the text-boxes
    $(".trainsName").val("");
    $(".destination").val("");
    $(".firstTrain").val("");
    $(".freq").val("");
});
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    let trainName = snapshot.val().tName;
    let destination = snapshot.val().dest;
    let firstTrainTime = snapshot.val().tTime;
    let frequency = snapshot.val().freq;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);
    let trainTimePretty = moment.unix(firstTrainTime).format("hh:mm");
    let firstTimeConverted = moment(trainTimePretty, "HH:mm").subtract(1, "years");
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let timeRemaining = diffTime % frequency;
    let minutesTilTrain = frequency - timeRemaining;
    let nextTrain = moment().add(minutesTilTrain, "minutes");



    console.log(diffTime);
    console.log(timeRemaining);
    console.log(trainTimePretty);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minutesTilTrain),
    );

    console.log(trainTimePretty);
    // Append the new row to the table
    $(".trainInfo").append(newRow);

});
















