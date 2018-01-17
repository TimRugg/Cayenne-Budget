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

});

