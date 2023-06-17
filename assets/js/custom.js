var currentDate = new Date();
var currentDateTime = currentDate.toISOString().slice(0, 16);

// Kiểm tra xem trang hiện tại có phải là trang "index.html" hay không
if (window.location.pathname === "/index.html") {
  var currentDateStart = new Date();
  var currentDateEnd = new Date();
  currentDateStart.setUTCHours(7, 0);
  currentDateEnd.setUTCHours(19, 0);

  var currentDateTimeStart = currentDateStart.toISOString().slice(0, 16);
  var currentDateTimeEnd = currentDateEnd.toISOString().slice(0, 16);

  // Thiết lập giá trị mặc định cho ngày nhận và ngày trả xe trên trang "index.html"
  document.getElementById("dateTimePickerStart").value = currentDateTimeStart;
  document.getElementById("dateTimePickerEnd").value = currentDateTimeEnd;
  localStorage.setItem("startDateStorage", currentDateTimeStart);
  localStorage.setItem("endDateStorage", currentDateTimeEnd);
}
else {
  // Lấy giá trị đã lưu trong localStorage cho ngày nhận và ngày trả xe
  document.getElementById("dateTimePickerStart").value = localStorage.getItem("startDateStorage");
  document.getElementById("dateTimePickerEnd").value = localStorage.getItem("endDateStorage");
}

// Thiết lập giá trị tối thiểu cho ngày nhận và ngày trả xe là thời điểm hiện tại
document.getElementById("dateTimePickerStart").min = currentDateTime;
document.getElementById("dateTimePickerEnd").min = currentDateTime;

// Hàm cập nhật ngày trả xe
function updateEndDate() {
  var startDate = document.getElementById("dateTimePickerStart").value;
  var endDateInput = document.getElementById("dateTimePickerEnd");
  var startDateTime = new Date(startDate);
  var endDateTime = new Date(endDateInput.value);

  endDateInput.min = startDateTime.toISOString().split(".")[0];

  // Kiểm tra và điều chỉnh ngày trả xe nếu cần thiết
  if (endDateTime.getDate() == startDateTime.getDate() && endDateTime.getHours() < startDateTime.getHours()) {
    endDateTime.setDate(startDateTime.getDate() + 1);
  } else if ((startDateTime.getDate() > endDateTime.getDate() && startDateTime.getMonth() == endDateTime.getMonth() && startDateTime.getHours() < endDateTime.getHours()) || (startDateTime.getMonth() > endDateTime.getMonth())) {
    endDateTime.setDate(startDateTime.getDate());
    endDateTime.setMonth(startDateTime.getMonth());
  }
  
  var formattedEndDate = endDateTime.getFullYear() + "-" + padZero(endDateTime.getMonth() + 1) + "-" + padZero(endDateTime.getDate()) + "T" + padZero(endDateTime.getHours()) + ":" + padZero(endDateTime.getMinutes());

  endDateInput.value = formattedEndDate;

  // Lưu ngày nhận và ngày trả xe vào localStorage
  localStorage.setItem("startDateStorage", startDate);
  localStorage.setItem("endDateStorage", formattedEndDate);

  // Tính và hiển thị thời gian thuê
  var timeDiff = endDateTime.getTime() - startDateTime.getTime();
  var totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  localStorage.setItem("totalDays", totalDays);

  document.getElementById("totalDays").textContent = "x" + localStorage.getItem("totalDays") + " ngày";
}

// Hàm thêm số 0 đằng trước các giá trị tháng và ngày nếu cần
function padZero(value) {
  return value.toString().padStart(2, '0');
}

// Sự kiện onload cho trang "index.html"
window.addEventListener('load', function() {
  var desiredPage = '/index.html';
  if (window.location.pathname === desiredPage) {
    var slider = document.getElementById('slider');
    var images = ['./assets/img/pexels-craig-adderley-1563356.jpg', './assets/img/pexels-nout-gons-248159.jpg', './assets/img/pexels-tiana-614484.jpg'];

    // Hàm thay đổi background slider
    function changeBackground() {
      var randomIndex = Math.floor(Math.random() * images.length);
      var randomImage = images[randomIndex];
      slider.style.backgroundImage = 'url("' + randomImage + '")';
    }

    // Thay đổi background ban đầu
    changeBackground();

    // Sự kiện beforeunload khi rời khỏi trang
    window.addEventListener('beforeunload', function() {
      changeBackground();
    });
  }
});

// Xử lý sự kiện khi nhấn nút đóng của toast
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

// Xử lý sự kiện click ngoài collapse menu để đóng menu
document.addEventListener("click", function(event) {
  var collapseMenu = document.getElementById("collapseMenu");
  var targetElement = event.target;

  var isClickInside = collapseMenu.contains(targetElement);

  if (!isClickInside || targetElement.matches("#loginBtn")) {
    collapseMenu.classList.remove("show");
  }
});
