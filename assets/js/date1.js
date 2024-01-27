function calculatePrice() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const priceDisplay = document.getElementById('priceDisplay');
    const endDisplay = document.getElementById('endDisplay');

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const today = new Date();
    const todayTimestamp = today.getTime();

    formatendDate = formatDate(endDate);
    endDisplay.textContent = `${formatendDate}`;
}

function updateMinEndDate() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    endDateInput.min = startDateInput.value;
    endDateInput.value = startDateInput.value; // 设置回程日期为出发日期

    calculatePrice();
}

function updateMinReturnDate() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');

    const today = new Date();
    const todayFormatted = formatDate(today);

    startDateInput.min = todayFormatted;
    startDateInput.value = todayFormatted;

    endDateInput.min = todayFormatted;
    endDateInput.value = todayFormatted; // 设置回程日期初始值为今天

    calculatePrice();
}

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

updateMinReturnDate();



//#購物車動畫效果

jQuery('#item_add').click(function () {

    // $('html, body').animate({
    //     scrollTop: 0
    // }, 100);

    $('#cart-menu').addClass('shake');

    setTimeout(function () {
        $('#cart-menu').removeClass('shake');
    }, 5000); // 这里的 1000 是动画持续的时间，根据实际情况调整

});


