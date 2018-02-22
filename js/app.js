$(document).ready(function() {

    //Declaring variables
    const body = document.getElementsByTagName('body')[0];
    const randomEmployeeGeneratorAPI = 'https://randomuser.me/api/';
    const employeeGrid = document.getElementsByClassName('grid-container');
    const gridItems = document.getElementsByClassName('grid-item');
    let employeeData;

    //Randomly generating 12 employees through random generation API
    const generatorOptions = {
      url: randomEmployeeGeneratorAPI,
      dataType: 'json',
      results: '12',
      inc: 'name, location, email, picture, dob, cell, nat',
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

    $.getJSON(randomEmployeeGeneratorAPI, generatorOptions, displayEmployees);


    function displayEmployees(data) {
      if(data.error) {
        let errorMessage = '<p>' + data.error + '</p>';
      } else {
          let gridHTML = '';
          employeeData = data.results;
          console.log(employeeData);
          $.each(data.results, function(index, employee) {
            gridHTML += '<div class="grid-item">';
            gridHTML += '<div class="image" style="background-image: url(' + employee.picture.large + ')"></div>';
            gridHTML += '<div class="text">';
            gridHTML += '<p class="name">' + employee.name.first + ' ' + employee.name.last + '</p>';
            gridHTML += '<p class="email">' + employee.email + '</p>';
            gridHTML += '<p class="city">' + employee.location.city + '</p>';
            gridHTML += '</div></div>';
          }); // end each

          $('.grid-container').html(gridHTML);
      }
    }

    //Event Listener: Calls createModalWindow upon click on particular employee div, and append to page.
    $(employeeGrid).on('click', function(event) {
      let modalWindow = document.querySelector('#myModal');
      let inGridItem = false;
      $.each(gridItems, function (index, gridItem) {
        if($.contains(gridItem, event.target))
          inGridItem = true;
      });
      if($(event.target).hasClass('grid-item') || inGridItem) {
        $(modalWindow).remove();
        modalHTML = createModalWindow(event.target);
        body.appendChild(modalHTML);
        let closeModal = $('.close');
        $(closeModal).on('click', function(event) {
          let modalWindow = $(document.querySelector('#myModal')).remove();
        });
      }
    });

    //Creates employee modal window when called based on which employee div is clicked.
    function createModalWindow(gridItem) {
      let element = document.createElement('div');
      let employeeInfo = getEmployeeInfo(gridItem);
      element.className = 'modal';
      element.id = 'myModal';
      let html = '<div class="modal-content">';
           html += '<span class="close">&times;</span>';
           html += '<div class="modal-image"><img src="' +
                   employeeInfo.picture.large +
                   '"/></div>';
           html += '<div class="modal-text">';
           html += '<p class="modal-name">' + employeeInfo.name.first + ' ' + employeeInfo.name.last + '</p>';
           html += '<p class="modal-email">' + employeeInfo.email + '</p>';
           html += '<p class="modal-city">' + employeeInfo.location.city + '</p>';
           html += '</div>'
           html += '<div class="additional-text">';
           html += '<p class="modal-cell">' + employeeInfo.cell + '</p>';
           html += '<p class="modal-address">' +
                   employeeInfo.location.street + ', ' +
                   employeeInfo.location.city + ', ' +
                   employeeInfo.location.state + ' ' +
                   employeeInfo.location.postcode + ', ' +
                   employeeInfo.nat + '</p>';
           html += '<p class="modal-birthday">Birthday: ' + formatDate(employeeInfo.dob) + '</p>';
           html += '</div>'
           html += '</div>';
      element.innerHTML = html;
      return element;
    }

    function formatDate(date) {
      let numbers = date.match(/\d+/g);
      let fullYear = numbers[0];
      let month = numbers[1];
      let day = numbers[2];
      let abbrYear = fullYear.replace(/\d{2}/, '');
      return month + "/" + day + "/" + abbrYear;
    }

    //Finds specific employee in employeeData by using info from employee clicked.
    function getEmployeeInfo(eventTarget) {
      let employeeIndex;
      let employeePicutreURL;
      let gridItem;
      if(eventTarget.className === 'grid-item')
        gridItem = eventTarget;
      else if(eventTarget.className === 'image' ||
              eventTarget.tagName === "DIV")
        gridItem = eventTarget.parentNode;
      else
        gridItem = eventTarget.parentNode.parentNode;
      employeePicutreURL = gridItem.children[0].style.backgroundImage.replace('url("', '').replace('")', '');
      for(let i = 0; i < employeeData.length; i++) {
        if(employeeData[i].picture.large === employeePicutreURL)
          employeeIndex = i;
      }
      console.log(employeeData[employeeIndex]);
      return employeeData[employeeIndex];
    }

}); // end ready
