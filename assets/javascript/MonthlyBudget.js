
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

var currentBudgetRecord = "unset";

function displayList(recordKey, outputCategory, outputAmount) {
    //build table to display category records on page
    $("#tableCategoryList").append(
         "<tr id='" + recordKey + "'><td>" +  outputCategory + 
         "</td><td>" + outputAmount + 
         "</td><td><button type='submit' class='btn btn-default' id='btn" + recordKey + "'>Update</button>" +  
         "</td></tr>");
    //create an update button listeners for each category
    $("#btn"+recordKey).on("click",function(event){
        console.log("update category: " + recordKey);
        updateCategory(recordKey,outputCategory,outputAmount);
    });
};

function updateCategory(recordKey,outputCategory,outputAmount) {
    //the following code changes the selected records table row color and hides the button
    //if possible the button will be replaced with a cancel button stop the update
    if(currentBudgetRecord != "unset") {
        $("#"+currentBudgetRecord).css("background-color", "initial");
        $("#btn"+currentBudgetRecord).show();
    };
    $("#"+recordKey).css("background-color", "lightyellow");
    currentBudgetRecord=recordKey;
    $("#btn"+recordKey).hide();
    //update the fields on the category form
    $("#budgetCategory").val(outputCategory);
    $("#budgetTotal").val(outputAmount);
    //buttons to update or delete
    $("#buttonUpdateCategory").val(recordKey);
    $("#buttonDeleteCategory").val(recordKey);
};

$("#buttonAddCategory").on("click",function(event){
    // get field values from the form
    var updatedCategory = $("#budgetCategory").val().trim();
    var updatedTotalx = $("#budgetTotal").val().trim();
    var updatedTotal = parseFloat(updatedTotalx).toFixed(2); // transform to store two characters
    // from the form values build an object representing the category

console.log("category: " + updatedCategory);
console.log("total: " + updatedTotal);

    databaseRef.ref("budget").push({
        Category: updatedCategory,
        Total: updatedTotal
    });
});

$("#buttonUpdateCategory").on("click",function(event){
    // get child record key from the button's value
    var updateRecordKey = $("#buttonUpdateCategory").val();
    // get field values from the form - if changed or not
    var updatedCategory = $("#budgetCategory").val().trim();
    var updatedTotalx = $("#budgetTotal").val().trim();
    var updatedTotal = parseFloat(updatedTotalx).toFixed(2); // transform to store two characters
    // from the form values build an object representing the category and update based on the key
    var updatedCategory = {
        Category: updatedCategory,
        Total: updatedTotal
    };
    // take the category's object and assign it to an indexed key using record key for the index
    // then update that record's key in Firebase
    var updateRecord = {};
    updateRecord[updateRecordKey] = updatedCategory; 
    databaseRef.ref("budget").update(updateRecord);
});

$("#buttonDeleteCategory").on("click",function(event){
    // get child record key from the button's value
    var deleteRecordKey = $("#buttonDeleteCategory").val();
    databaseRef.ref("budget").child(deleteRecordKey).remove();
});

// this section initially fills the table
databaseRef.ref("budget").orderByChild("Category").on("child_added",function(snapshot){
    //pass values from snapshot to function that builds row by row
    displayList(snapshot.key,snapshot.val().Category,snapshot.val().Total);
});