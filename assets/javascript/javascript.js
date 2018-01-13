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

var database = firebase.database();
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

    $(".success").removeClass("hide");
  });

  // logging in user
  $("#log-in-button").on("click", function(){
    event.preventDefault();
    var email = $("#username-return").val().trim();
    var password = $("#password-return").val().trim();

    // sign in
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

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

  NYTapiKey = "578476336d494beaaf4d0137c3d64149";

  var NYTurl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  NYTurl += '?' + $.param({
    'api-key': "578476336d494beaaf4d0137c3d64149",
    'q': "finance",
    'begin_date': "20170101"
  });
  //calling ajax
  $.ajax({
      url: NYTurl,
      method: "GET"
  }).done(function(response) {
    console.log(response);
  });

});

