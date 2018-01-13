// Wait for all to load
window.onload = function() {

$(document).ready(function() {

// Initialize Firebase
var config = {
//following is the project's database
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