var currentDate = new Date();
var currentDateStart = new Date();
var currentDateEnd = new Date();
currentDateStart.setUTCHours(7, 0);
currentDateEnd.setUTCHours(19, 0);

var currentDateTime = currentDate.toISOString().slice(0, 16);
var currentDateTimeStart = currentDateStart.toISOString().slice(0, 16);
var currentDateTimeEnd = currentDateEnd.toISOString().slice(0, 16);

document.getElementById("dateTimePickerStart").value = currentDateTimeStart;
document.getElementById("dateTimePickerEnd").value = currentDateTimeEnd;
document.getElementById("dateTimePickerStart").min = currentDateTime;
document.getElementById("dateTimePickerEnd").min = currentDateTime;

function updateEndDate() {
  var startDate = document.getElementById("dateTimePickerStart").value;
  var endDateInput = document.getElementById("dateTimePickerEnd");
  var startDateTime = new Date(startDate);
  var endDateTime = new Date(endDateInput.value);

  endDateInput.min = startDateTime.toISOString().split(".")[0];

  if (endDateTime.getHours() < startDateTime.getHours() || startDateTime.getDate() > endDateTime.getDate()) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  var formattedEndDate = endDateTime.getFullYear() + "-" + padZero(endDateTime.getMonth() + 1) + "-" + padZero(endDateTime.getDate()) + "T" + padZero(endDateTime.getHours()) + ":" + padZero(endDateTime.getMinutes());
  endDateInput.value = formattedEndDate;
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

window.addEventListener('load', function() {
  var slider = document.getElementById('slider');
  var images = ['/assets/img/pexels-craig-adderley-1563356.jpg', '/assets/img/pexels-nout-gons-248159.jpg', '/assets/img/pexels-tiana-614484.jpg'];

  function changeBackground() {
    var randomIndex = Math.floor(Math.random() * images.length);
    var randomImage = images[randomIndex];
    slider.style.backgroundImage = 'url("' + randomImage + '")';
  }

  changeBackground();

  window.addEventListener('beforeunload', function() {
    changeBackground();
  });
});

var closeButtonList = document.querySelectorAll('#close-toast');

closeButtonList.forEach(function(closeButton) {
  closeButton.addEventListener('click', function() {
    var toastElement = this.closest('.toast');

    if (toastElement) {
      toastElement.classList.add('hide');

      setTimeout(function() {
        toastElement.remove();
      }, 300);
    }
  });
});
document.addEventListener("click", function(event) {
  var collapseMenu = document.getElementById("collapseMenu");
  var targetElement = event.target; // Phần tử được nhấp chuột

  // Kiểm tra xem phần tử được nhấp chuột có nằm trong collapseMenu hay không
  var isClickInside = collapseMenu.contains(targetElement);

  // Nếu phần tử được nhấp chuột không nằm trong collapseMenu hoặc là nút đăng nhập, đóng collapseMenu
  if (!isClickInside || targetElement.matches("#loginBtn")) {
    collapseMenu.classList.remove("show");
  }
});
