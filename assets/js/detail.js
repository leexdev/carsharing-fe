document.getElementById("dateTimePickerStart").value = localStorage.getItem("startDateStorage");
document.getElementById("dateTimePickerEnd").value = localStorage.getItem("endDateStorage");
var priceElement = document.getElementById("price");
var priceText = priceElement.textContent.trim();
var unitPrice = parseInt(priceText.replace(/\D/g, ''));

document.getElementById("totalDays").textContent = "x" + localStorage.getItem("totalDays") + " ngày";