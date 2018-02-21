$(document).ready(function() {

    var randomEmployeeGeneratorAPI = 'https://randomuser.me/api/';
    var generatorOptions = {
      url: randomEmployeeGeneratorAPI,
      dataType: 'json',
      results: '12',
      inc: 'name, location, email'
    }

    /*
    Can be used with below $.ajax() function for exact same functionality. Documentation
    refers to $.getJSON as shorthand for $.ajax().
    var generatorOptions = $.ajax({
      url: randomEmployeeGeneratorAPI,
      dataType: 'json',
      success: function(data) {
        displayEmployees(data.results);
      }
    });
    */

    function displayEmployees(data) {
      console.log(data.results);
      var gridHTML = '';
      $.each(data.results, function(index, employee) {
        gridHTML += '<div class="grid-item">';
        gridHTML += '<div class="image"></div>';
        gridHTML += '<div class="text">';
        gridHTML += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '<p>';
        gridHTML += '<p class="email">' + employee.email + '<p>';
        gridHTML += '<p class="city">' + employee.location.city + '<p>';
        gridHTML += '</div></div>';
      }); // end each

      $('.grid-container').html(gridHTML);
    }

    $.getJSON(randomEmployeeGeneratorAPI, generatorOptions, displayEmployees);

}); // end ready
