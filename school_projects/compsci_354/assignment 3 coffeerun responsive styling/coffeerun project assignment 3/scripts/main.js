(function (window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);


  function updateValidation(event, field) {
    var value = event.target.value;
  
    if (field === 'coffeeOrder') {
      var strengthInput = document.getElementById('strengthLevel');
      Validation.isDecafValid(value, strengthInput.value)
        ? event.target.setCustomValidity('')
        : event.target.setCustomValidity('WARNING This is no longer decaf. Please review your order!');
    } else if (field === 'strengthLevel') {
      var strengthInput = document.getElementById('strengthLevel');
      var coffeeOrderInput = document.getElementById('coffeeOrder');
      Validation.isDecafValid(coffeeOrderInput.value, value)
        ? strengthInput.setCustomValidity('')
        : strengthInput.setCustomValidity('WARNING This is no longer decaf. Please review your order!');
    }
  }
  
  

  var coffeeOrderInput = document.getElementById('coffeeOrder');
  coffeeOrderInput.addEventListener('input', function (event) {
    updateValidation(event, 'coffeeOrder');
  });

  var strengthInput = document.getElementById('strengthLevel');
  strengthInput.addEventListener('input', function (event) {
    updateValidation(event, 'strengthLevel');
  });

  formHandler.addSubmitHandler(function(data){
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isInstitutionEmail);

})(window);
