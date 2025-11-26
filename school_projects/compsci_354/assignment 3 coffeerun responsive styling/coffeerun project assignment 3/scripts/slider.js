$(document).ready(function() {
    $('#strengthLevel').on('input', function() {
      var strengthValue = $(this).val();
      $('#caffeineLevel').text(strengthValue);

      if (strengthValue < 40) {
        $('#caffeineLevel').removeClass().addClass('low');
      } else if (strengthValue >= 40 && strengthValue <= 75) {
        $('#caffeineLevel').removeClass().addClass('medium');
      } else {
        $('#caffeineLevel').removeClass().addClass('high');
      }
    });
  });