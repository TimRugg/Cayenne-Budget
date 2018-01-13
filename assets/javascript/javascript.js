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

  // getting sign up info to register new user
  $("#sign-up-button").on("click", function(){
    var usersName = $("#user-name").val().trim();
    var usersEmail = $("#user-email").val().trim();
    var usersPassword = $("#user-password").val();
    console.log(usersName, usersEmail, usersPassword);
  });

//  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
//    var errorCode = error.code;
//    var errorMessage = error.message;

//  });
});