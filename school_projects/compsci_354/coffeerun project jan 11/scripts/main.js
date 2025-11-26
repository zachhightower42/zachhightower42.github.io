(function (window) {
    'use strict';

    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders'; 

    var FIREBASE_CONFIG = {
      apiKey: "AIzaSyAhjiRMPtPknR_XSFXcf6x6HTTsTC1iK6s",
      authDomain: "coffeerundatastore.firebaseapp.com",
      projectId: "coffeerundatastore",
      storageBucket: "coffeerundatastore.appspot.com",
      messagingSenderId: "674848335332",
      appId: "1:674848335332:web:5d469407e7c7c6d09dd3f1",
      measurementId: "G-F4KCHEXELF"
  };
  
    var FIREBASE_COLLECTION_NAME = 'coffeerun';

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

    myTruck.printOrders(checkList.addRow.bind(checkList));


  })(window);
  