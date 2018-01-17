$(document).ready(function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVw2c9yDQHXRAUrP0DXWryYvjo4nMRi7Q",
    authDomain: "cayenne-9e4bc.firebaseapp.com",
    databaseURL: "https://cayenne-9e4bc.firebaseio.com",
    projectId: "cayenne-9e4bc",
    storageBucket: "cayenne-9e4bc.appspot.com",
    messagingSenderId: "697519096895"
};

firebase.initializeApp(config);
// console.log("firebase: ", firebase);
var database = firebase.database();
var databaseRef = firebase.database();
var auth = firebase.auth();

  // getting sign up info to register new user
  $("#sign-up-button").on("click", function(){
    var name = $("#user-name").val().trim();
    var email = $("#user-email").val().trim();
    var password = $("#user-password").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });

    $(".success").removeClass("hide");
  });

  // logging in user
  $("#log-in-button").on("click", function(){
    // event.preventDefault();
    var email = $("#username-return").val().trim();
    var password = $("#password-return").val().trim();

    // sign in
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        open("budget.html","_self");
      }
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#log-out-button").removeClass("hide");
  } else {
    $*("#log-out-button").addClass("hide");
  }
});

  // log out
  $("#log-out-button").on("click", function(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
    $("#log-out-button").addClass("hide");
  });

  // NYT article API
  // date not working in NYTurl object, find out why?
  var date = moment().subtract(7, "days").format("YYYYMMDD");
  var NYTapiKey = "578476336d494beaaf4d0137c3d64149";

  var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  NYTurl += '?' + $.param({
    'api-key': "578476336d494beaaf4d0137c3d64149",
    'q': "finance",
    'begin_date': date
  });

  //calling ajax
  $.ajax({
      url: NYTurl,
      method: "GET"
  }).done(function(response) {
    for(var i = 0; i < 3; i++){
      // creating variables to hold JSON data
      var title = response.response.docs[i].headline.main;

      var link = response.response.docs[i].web_url;

      var snippet = response.response.docs[i].snippet;

      // creating variables to hold html elements
      var articleDiv = $("<div>");

      var titleLink = $("<a>");

      var snippetText = $("<p>");

      var readMore = $("<a>");

      //inserting info into new elements
      titleLink.attr("href", link).text(title);
      titleLink.addClass("article-title");

      snippetText.text(snippet);
      snippetText.addClass("article-snippet");

      readMore.attr("href", link).text(" Read more...");
      readMore.addClass("read-more")
      snippetText.append(readMore);

      articleDiv.append(titleLink, snippetText);
      articleDiv.addClass("article-div col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4")
      $("#NYT-articles").append(articleDiv);
    }
  });

/////////////////////////////////////////////
/////////      Tim's Monthly Budget Code
/////////////////////////////////////////////

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

/////////////////////////////////////////////
/////////      Tim's Save Transaction Code
/////////////////////////////////////////////

var inputImageFile = "";
var newKey = "";

// From the input form, get the values and add to Firebase
$("#buttonInputTransaction").on("click",function(event){
  //get values from form
  var inputSource = $("#inputSource").val().trim();
  var inputDate = $("#inputDate").val().trim();
  var inputTotalx = $("#inputTotal").val().trim();
  var inputTotal = parseFloat(inputTotalx).toFixed(2);
  var inputCategory = $("#inputCategory").val().trim();
  var textDateNow = moment().format("YYYY-MM-DD hh:mm");
  // create transaction variable for Firebase
  var inputTrans = {
    Source: inputSource,
    TransDate: inputDate,
    Total: inputTotal,
    Category: inputCategory,
    HasImage: inputImageFile.name,
    dateAdded: textDateNow,
    dateUpdated: textDateNow
  };
  // update transaction with field values
    var updateRecord = {};
    updateRecord[newKey] = inputTrans; 
    databaseRef.ref("transaction").update(updateRecord);
    $("#inputImage").empty; // remove file name from previous selection
});

$("#inputImage").change(function(event){
  // get new key for image and transaction
  newKey = databaseRef.ref("transaction").push().key;
  // get file
  inputImageFile = event.target.files[0];
  // create storage ref named for to be transaction key
  var storageRef = firebase.storage().ref(newKey);
  // upload the file into newKey
  storageRef.put(inputImageFile);

});

/////////////////////////////////////////////
/////////      Tim's Transaction List Code
/////////////////////////////////////////////

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



});