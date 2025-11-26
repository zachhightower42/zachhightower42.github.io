(function (window) {
    'use strict';

    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders'; 

    var FIREBASE_CONFIG = {
      apiKey: "AIzaSyBBsQbyecHBukcub3R-8YVKPVXc1ACnWXI",

      authDomain: "coffeerun-feda2.firebaseapp.com",

      projectId: "coffeerun-feda2",

      storageBucket: "coffeerun-feda2.appspot.com",

      messagingSenderId: "598918239983",

      appId: "1:598918239983:web:baabe09b8bd5b677d4ad1a"

  };
  
    var FIREBASE_COLLECTION_NAME = 'coffeerunAuth';

    var username = 'zachhightower42@gmail.com';
    var password = 'douglasadams';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FirebaseDataStore = App.FirebaseDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var firebaseDS = new FirebaseDataStore(FIREBASE_CONFIG, FIREBASE_COLLECTION_NAME);

    var myTruck = new Truck('ncc-1701', firebaseDS);
    window.myTruck = myTruck;

    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data){
      return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      },
      );
    });

    formHandler.addInputHandler(Validation.isInstitutionEmail);

    window.addEventListener("beforeunload", function() {
      firebaseDS.userSignOut();
    });

    firebaseDS.userSignIn(username, password)
    .then(firebaseDS.onUserSignedIn(function() {
      myTruck.printOrders(checkList.addRow.bind(checkList));
    }));

    document.querySelector('[data-coffee-button="SignUp"]').addEventListener('click', function (event) {
      console.log("SignUp");
      var signUpUserEmail = prompt('Please input email: ');
      var signUpPassword = prompt('Please input password: ');
  
      if (signUpUserEmail === null || signUpPassword === null) {
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(signUpUserEmail, signUpPassword)
      .then(function() {
        console.log('Sign Up Successfully.');
      })
      .catch(function(error) {
        console.log(`${error.code} : ${error.message}`);
      });
    });
  

  })(window);
  