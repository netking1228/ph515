simpleCart({

  checkout: {
    // type: "PayPal",
    // email: "you@yours.com",
  },

  // tax: 0.075,
  // currency: "THB",

  cartStyle: "table",

  cartColumns: [
    { attr: "name", label: "產品名稱" },
    { attr: "type", label: "類型" },
    { attr: "date", label: "預訂日期" }, // 新增送貨日期欄位設定
    { attr: "session", label: "場次" },
    { view: "decrement", label: false, text: "▼" },
    { attr: "quantity", label: "數量" },
    { view: "increment", label: false, text: "▲" },
    { attr: "total", label: "小計", view: 'currency' },
    { view: "remove", text: "✖", label: "刪除" },
  ]

});

//讓價格隨種類變化，其中"價格"是關鍵詞
simpleCart.ready(function () {
  simpleCart.bind('beforeAdd', function (item) {

    var currentPage = window.location.pathname;

    if (currentPage.indexOf('boat-1.html') > -1 || currentPage.indexOf('boat-2.html') > -1) {
      // 如果当前页面的路径包含 'boat-1.html' 或 'boat.html'，则执行操作 A
      // 在这里放置操作 A 的代码
      var newCheckInDateString = item.get('date');
      var newCheckOutDateString = item.get('session');
     
      // Convert date strings to Date objects
      var newCheckInDate = new Date(newCheckInDateString.replace(/-/g, '/'));
      var newCheckOutDate = new Date(newCheckOutDateString.replace(/-/g, '/'));

      // Set time parts to zero
      newCheckInDate.setHours(0, 0, 0, 0);
      newCheckOutDate.setHours(0, 0, 0, 0);

      var dateDiffInDays = Math.floor((newCheckOutDate - newCheckInDate) / (1000 * 60 * 60 * 24));
     
      if (newCheckInDate - newCheckOutDate >= 0) {
        alert('回程日期要大於出發日期！');
        return false;
      }
      
    





    } else if (currentPage.indexOf('/rooms/') > -1) {
      // 如果当前页面的路径包含 '/rooms/'，则执行操作 B
      // 在这里放置操作 B 的代码

      var items = simpleCart.items();
      var newRoomId = item.get('name');
      var newCheckInDateString = item.get('date');
      var newCheckOutDateString = item.get('session');
     
      // Convert date strings to Date objects
      var newCheckInDate = new Date(newCheckInDateString.replace(/-/g, '/'));
      var newCheckOutDate = new Date(newCheckOutDateString.replace(/-/g, '/'));

      // Set time parts to zero
      newCheckInDate.setHours(0, 0, 0, 0);
      newCheckOutDate.setHours(0, 0, 0, 0);

      var dateDiffInDays = Math.floor((newCheckOutDate - newCheckInDate) / (1000 * 60 * 60 * 24));
     
      if (newCheckInDate - newCheckOutDate === 0) {
        alert('至少要訂１天喔！');
        return false;
      }

      for (var i = 0; i < items.length; i++) {
        var existingRoomId = items[i].get('name');
        var existingCheckInDateString = items[i].get('date');
        var existingCheckOutDateString = items[i].get('session');

        // Convert existing date strings to Date objects
        var existingCheckInDate = new Date(existingCheckInDateString.replace(/-/g, '/'));
        var existingCheckOutDate = new Date(existingCheckOutDateString.replace(/-/g, '/'));

        if (existingRoomId === newRoomId) {
          if (
            newCheckInDate.getTime() >= existingCheckInDate.getTime() && newCheckInDate.getTime() < existingCheckOutDate.getTime() ||
            newCheckOutDate.getTime() > existingCheckInDate.getTime() && newCheckOutDate.getTime() <= existingCheckOutDate.getTime() ||
            newCheckOutDate.getTime() > existingCheckOutDate.getTime() && newCheckInDate.getTime() < existingCheckInDate.getTime()
          ) {
            alert('該房間在選定日期範圍內已被預訂！');
            return false;
          }
        }
      }

      return true;


    } else {
      // 如果当前页面的路径不包含上述任何内容，则执行操作 C
      // 在这里放置操作 C 的代码

      var selectElement = document.querySelector('.item_type'); // 获取 select 元素
      var selectedOption = selectElement.options[selectElement.selectedIndex]; // 获取选定的选项元素
      var optionText = selectedOption.textContent.trim(); // 获取选项文本内容

      // 使用正则表达式提取数字部分
      var price = parseInt(optionText.match(/NT\$(\d{1,3}(,\d{3})*(\.\d+)?)/)[1].replace(',', ''), 10);//取出NT$後面的數字

      item.price(price); // 设置商品价格

      var type = optionText.split('價格')[0]; // 使用 '價格' 进行字符串分割，获取数字前面的部分

      item.set('type', type); // 设置商品类型


    }















  });
});


// simpleCart.currency({
// code: "THB",
// name: "Thai Baht",
// symbol: "&#3647;",
// delimiter: " ",
// decimal: ",",
// after: true,
// accuracy: 0
// });



//* Refresh cart once simpleCart is ready to listen.
simpleCart.ready(function () {
  simpleCart.update();
});



