
//start with the update transaction hidden
$("#updateTransaction").hide();

// Initialize Firebase
// var config = {
// //following is the project's database
//     apiKey: "AIzaSyDVw2c9yDQHXRAUrP0DXWryYvjo4nMRi7Q",
//     authDomain: "cayenne-9e4bc.firebaseapp.com",
//     databaseURL: "https://cayenne-9e4bc.firebaseio.com",
//     projectId: "cayenne-9e4bc",
//     storageBucket: "cayenne-9e4bc.appspot.com",
//     messagingSenderId: "697519096895"
// };

// firebase.initializeApp(config);

// var databaseRef = firebase.database();
// var storageRef = firebase.storage();
var currentSelectedRecord = "unset";

var lastMonth = "0000-00-00"; // to be replaced with moment translating last month

function displayList(recordKey, outputSource, outputDate, outputAmount, outputCategory, outputHasImage, dateAdded) {
    //build table to display transaction records on page
    $("#tableTransactionsList").append(
         "<tr id='" + recordKey + "'><td>" +  outputDate + 
         "</td><td>" +  outputSource + 
         "</td><td>" + outputAmount + 
         "</td><td>" +  outputCategory + 
         "</td><td>" +  outputHasImage + 
         "</td><td><button type='submit' class='btn btn-default' id='btn" + recordKey + "'>Update</button>" +  
         "</td></tr>");
    //create an update button listeners for each transaction
    $("#btn"+recordKey).on("click",function(event){
        console.log("update transaction: " + recordKey);
        updateTransaction(recordKey,outputSource,outputDate,outputAmount,outputCategory,outputHasImage,dateAdded);
    });
};

function updateTransaction(recordKey,outputSource,outputDate,outputAmount,outputCategory,outputHasImage,dateAdded) {
    //the following code changes the selected records table row color and hides the button
//if possible the button will be replaced with a cancel button stop the update
    if(currentSelectedRecord != "unset") {
        $("#"+currentSelectedRecord).css("background-color", "initial");
        $("#btn"+currentSelectedRecord).show();
    };
    $("#"+recordKey).css("background-color", "lightyellow");
    currentSelectedRecord=recordKey;
    $("#btn"+recordKey).hide();

    //update the fields on the transaction form and then show the form
    $("#inputSource").val(outputSource);
    $("#inputDate").val(outputDate);
    $("#inputTotal").val(outputAmount);
    $("#inputCategory").val(outputCategory);
    $("#inputHasImage").val(outputHasImage);
    $('#addedDate').val(dateAdded); // hidden input field
    //buttons to update or delete
    $("#buttonUpdateTransaction").val(recordKey);
    $("#buttonDeleteTransaction").val(recordKey);
    //show the form
    $("#updateTransaction").show();
};

$("#buttonUpdateTransaction").on("click",function(event){
    // get child record key from the button's value
    var updateRecordKey = $("#buttonUpdateTransaction").val();
    // get field values from the form - if changed or not
    var updatedSource = $("#inputSource").val().trim();
    var updatedDate = $("#inputDate").val().trim();
    var updatedTotalx = $("#inputTotal").val().trim();
    var updatedTotal = parseFloat(updatedTotalx).toFixed(2); // transform to store two characters
    var updatedCategory = $("#inputCategory").val().trim();
    var updatedHasImage = $("#inputHasImage").val().trim();
    var dateAdded = $("#addedDate").val().trim(); // from hidden input field
    var dateUpdated = moment().format("YYYY-MM-DD hh:mm"); // save text format dates instead of unix
    // from the form values build an object representing the transaction and update based on the key
    var updatedTrans = {
        Source: updatedSource,
        TransDate: updatedDate,
        Total: updatedTotal,
        Category: updatedCategory,
        HasImage: updatedHasImage,
        dateAdded: dateAdded, 
        dateUpdated: dateUpdated
    };
    // take the transaction's object and assign it to indexed key using record key for the index
    // then update that record's key in Firebase
    var updateRecord = {};
    updateRecord[updateRecordKey] = updatedTrans; 
    databaseRef.ref("transaction").update(updateRecord);
});

$("#buttonDeleteTransaction").on("click",function(event){
    // get child record key from the button's value
    var deleteRecordKey = $("#buttonDeleteTransaction").val();
    databaseRef.ref("transaction").child(deleteRecordKey).remove();

///////////////////////////
// DOES NOT DELETE IMAGE //
///////////////////////////
console.log("Delete Transaction: " + deleteRecordKey);

    var storageRef = firebase.storage().ref(deleteRecordKey);

console.log(storageRef);
console.log("middle of delete");

    // Delete the file
    ///////////// THIS DOES NOT RUN
    storageRef.delete().then(function(){
      // File deleted successfully
        console.log("Success - file Deleted");
    }).catch(function(error) {
      // Uh-oh, an error occurred!
        console.log("No file deleted");
    });

console.log("end of delete");

});

// this section initially fills the table
databaseRef.ref("transaction").orderByChild("TransDate").startAt(lastMonth).on("child_added",function(snapshot){
    //pass values from snapshot to function that builds row by row
    displayList(snapshot.key,snapshot.val().Source,snapshot.val().TransDate,snapshot.val().Total,snapshot.val().Category,snapshot.val().HasImage,snapshot.val().dateAdded);   
    // console.log("Firebase child key: " + snapshot.key);
});