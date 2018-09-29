// Initialize Firebase
var config = {
  apiKey: "AIzaSyDDOM7qb3KI53s1rKp8wY69e6_yjsSNiwg",
  authDomain: "traveler-info.firebaseapp.com",
  databaseURL: "https://traveler-info.firebaseio.com",
  projectId: "traveler-info",
  storageBucket: "traveler-info.appspot.com",
  messagingSenderId: "277717803916"
};
firebase.initializeApp(config);
//get elements
  var textEmail = document.getElementById("email");
  var textPassword = document.getElementById("password");
  var btnLogin = document.getElementById("login");
  var btnSignUp = document.getElementById("sign-up");
  var btnLogout = document.getElementById("logout");


//add login event
document.getElementById("login").addEventListener("click", function(){
  var email = textEmail.value;
  var password = textPassword.value;
  var auth = firebase.auth();
  //sign in 
 var Promise = auth.signInWithEmailAndPassword(email,password);
  Promise.catch(console.log(e.message));
});
//add signup event
document.getElementById("sign-up").addEventListener("click", function(){
    var email = textEmail.value;
    var password = textPassword.value;
    var auth = firebase.auth();
    var Promise = auth.createUserWithEmailAndPassword(email,password);
    Promise.catch(console.log(e.message));
});
document.getElementById("logout").addEventListener("click", function(){
    firebase.auth().signOut();

});
;

//add realtime listener

  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
          console.log(firebaseUser);
          btnLogout.classList.remove("hide");
      } else {
          console.log("not logged in");
          btnLogout.classList.add("hide");
      } 
  });




