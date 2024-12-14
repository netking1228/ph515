// 获取当前日期并格式化为 YYYY-MM-DD
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // 月份是从 0 开始的
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

// 设置当前日期为日期输入框的值
var currentDateInput = document.getElementById('currentDate');
currentDateInput.value = today;

var currentPage = window.location.href;
if (currentPage.indexOf('boat-1.html') > -1 || currentPage.indexOf('boat-2.html') > -1) {
  
    var nextDateInput=document.getElementById('nextDate');
    nextDateInput.value = today;
   
    currentDateInput.addEventListener('change', function() {
        // 當 currentDate 的值改變時，將其值設置給 nextDate
        nextDateInput.value = currentDateInput.value;
        nextDateInput.min=currentDateInput.value;
    });

  }


// 设置最小日期为今天

currentDateInput.min = today;
