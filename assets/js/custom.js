// JavaScript
var today = new Date();

// Lấy ngày hôm sau
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Đặt giá trị mặc định là ngày hôm sau và 7 giờ sáng
var defaultDateTimeStart = tomorrow.toISOString().slice(0, 10) + 'T07:00';
var defaultDateTimeEnd = tomorrow.toISOString().slice(0, 10) + 'T19:00';

document.getElementById('dateTimePickerStart').value = defaultDateTimeStart;
document.getElementById('dateTimePickerEnd').value = defaultDateTimeEnd;


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
  