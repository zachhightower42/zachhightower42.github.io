(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    isInstitutionEmail: function (email) {
      return /.+@(go\.)?olemiss\.edu$/.test(email);
    },
    isDecafValid: function (coffeeOrder, caffeineStrength) {
      return !(coffeeOrder.toLowerCase().includes('decaf') && caffeineStrength > 20);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
