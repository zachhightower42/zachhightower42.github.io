(function (window) {
  "use strict";

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL =
    "http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders";

  var FIREBASE_CONFIG = {
    apiKey: "AIzaSyAhjiRMPtPknR_XSFXcf6x6HTTsTC1iK6s",
    authDomain: "coffeerundatastore.firebaseapp.com",
    projectId: "coffeerundatastore",
    storageBucket: "coffeerundatastore.appspot.com",
    messagingSenderId: "674848335332",
    appId: "1:674848335332:web:5d469407e7c7c6d09dd3f1",
    measurementId: "G-F4KCHEXELF",
  };

  var FIREBASE_COLLECTION_NAME = "coffeerunAuth";
  var username = "abc@google.com";
  var password = "password123";

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FirebaseDataStore = App.FirebaseDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var firebaseDS = new FirebaseDataStore(
    FIREBASE_CONFIG,
    FIREBASE_COLLECTION_NAME
  );

  var myTruck = new Truck("ncc-1701", firebaseDS);
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data).then(function () {
      checkList.addRow.call(checkList, data);
    });
  });

  formHandler.addInputHandler(Validation.isInstitutionEmail);

  window.addEventListener("beforeunload", function () {
    firebaseDS.userSignOut();
  });

  firebaseDS.userSignIn(username, password).then(
    firebaseDS.onUserSignedIn(function () {
      myTruck.printOrders(checkList.addRow.bind(checkList));
    })
  );

  document
    .querySelector('[data-coffee-button="SignUp"]')
    .addEventListener("click", function (event) {
      console.log("SignUp");
      var signUpUserEmail = prompt("Please input email: ");
      var signUpPassword = prompt("Please input password: ");

      if (signUpUserEmail === null || signUpPassword === null) {
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(signUpUserEmail, signUpPassword)
        .then(function () {
          console.log("Sign Up Successfully.");
        })
        .catch(function (error) {
          console.log(`${error.code} : ${error.message}`);
        });
    });

  document
    .querySelector('[data-coffee-button="SignIn"]')
    .addEventListener("click", function (event) {
      var signInUserEmail = prompt("Please input email: ");
      var signInPassword = prompt("Please input password: ");

      if (signInUserEmail === null || signInPassword === null) {
        return;
      }

      firebaseDS
        .userSignIn(signInUserEmail, signInPassword)
        .then(function () {
          console.log("Sign In Successfully.");
          document
            .querySelector('[data-coffee-button="SignOut"]')
            .removeAttribute("disabled");
        })
        .catch(function (error) {
          console.log(`${error.code} : ${error.message}`);
        });
    });

  document
    .querySelector('[data-coffee-button="SignOut"]')
    .addEventListener("click", function (event) {
      firebaseDS
        .userSignOut()
        .then(function () {
          console.log("Sign Out Successfully.");
          document
            .querySelector('[data-coffee-button="SignOut"]')
            .setAttribute("disabled", "disabled");
        })
        .catch(function (error) {
          console.log(`${error.code} : ${error.message}`);
        });
    });
})(window);
