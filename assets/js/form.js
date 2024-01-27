document.getElementById('sendToSheet').addEventListener('click', function (event) {
    event.preventDefault();

    var name = document.querySelector('input[name="Name"]').value.trim();
    var phone = document.querySelector('input[name="Phone"]').value.trim();
    var lineID = document.querySelector('input[name="IineID"]').value.trim();

    if (name === '' || phone === '' || lineID === '') {
        alert('请填写所有必填项！');
        return;
    }

    var phonePattern = /^09\d{8}$/;
    if (!phonePattern.test(phone)) {
        alert('请输入正确的手机号格式！');
        return;
    }

    // 触发按钮所在的表单提交
    event.target.closest('form').submit();

    // 替換成你想要跳轉的網址
    var finishPageUrl = 'finish.html';

    // 等待 1 秒後進行網頁跳轉
    setTimeout(function () {
        window.location.href = finishPageUrl;
        simpleCart.empty();
    }, 1000); // 1000 毫秒等於 1 秒

    
});