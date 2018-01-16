// Wait for all to load
<<<<<<< HEAD
//window.onload = function() {
//$(document).ready(function() {
=======
window.onload = function() {

$(document).ready(function() {
>>>>>>> f344bce062165e37348ba244c08220aa2c0aa495

// Initialize Firebase
var config = {
//following is the project's database
<<<<<<< HEAD
    apiKey: "AIzaSyDVw2c9yDQHXRAUrP0DXWryYvjo4nMRi7Q",
    authDomain: "cayenne-9e4bc.firebaseapp.com",
    databaseURL: "https://cayenne-9e4bc.firebaseio.com",
    projectId: "cayenne-9e4bc",
    storageBucket: "cayenne-9e4bc.appspot.com",
    messagingSenderId: "697519096895"
};

firebase.initializeApp(config);
var databaseRef = firebase.database();
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



//});  // document ready
//}    // window on load
=======
    // apiKey: "AIzaSyDVw2c9yDQHXRAUrP0DXWryYvjo4nMRi7Q",
    // authDomain: "cayenne-9e4bc.firebaseapp.com",
    // databaseURL: "https://cayenne-9e4bc.firebaseio.com",
    // projectId: "cayenne-9e4bc",
    // storageBucket: "cayenne-9e4bc.appspot.com",
    // messagingSenderId: "697519096895"
//following is a test project on ruggt001@icloud.com
    apiKey: "AIzaSyA0mMoi-1WsvV3YHH31-UI6cHhHKuiQIck",
    authDomain: "test-project-1-b3077.firebaseapp.com",
    databaseURL: "https://test-project-1-b3077.firebaseio.com",
    projectId: "test-project-1-b3077",
    storageBucket: "test-project-1-b3077.appspot.com",
    messagingSenderId: "776290674390"
};

firebase.initializeApp(config);

var databaseRef = firebase.database();
// var storageRef = firebase.storage();

// From the input form, get the values and add to Firebase
$("#buttonInputTransaction").on("click",function(event){
	inputSource = $("#inputSource").val().trim();
	inputDate = $("#inputDate").val().trim();
	inputTotal = $("#inputTotal").val().trim(); 
	inputCategory = $("#inputCategory").val().trim();	

// add to Firebase
	databaseRef.ref("transaction").push({
		Source: inputSource,
		Date: inputDate,
		Total: inputTotal,
		Category: inputCategory,
		dateAdded: firebase.database.ServerValue.TIMESTAMP,
		dateUpdated: firebase.database.ServerValue.TIMESTAMP
	});
});

$("#inputImage").change(function(e){
	// get file
	var file = e.target.files[0];
	// create storage ref
	var storageRef = firebase.storage().ref('user_images/' + file.name);
	// upload file
	storageRef.put(file);
	console.log("Hi!");
});

});
}
>>>>>>> f344bce062165e37348ba244c08220aa2c0aa495
