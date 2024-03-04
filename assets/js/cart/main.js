simpleCart({

  checkout: {
    // type: "PayPal",
    // email: "you@yours.com",
  },

  // tax: 0.075,
  // currency: "THB",

  cartStyle: "table",





  cartColumns: [
    { attr: "name", label: "房間名稱" },
    { attr: "date", label: "預訂入住日期" }, // 新增送貨日期欄位設定
    { attr: "session", label: "預訂退房日期" },
    { attr: "total", label: "小計", view: 'currency' },
    { view: "remove", text: "✖", label: "刪除" },
  ]

  

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

//*加入房間的時段判斷

simpleCart.bind('beforeAdd', function (item) {
  var items = simpleCart.items();
  
  var newRoomId = item.get('name');
  var newCheckInDateString = item.get('date');
  var newCheckOutDateString = item.get('session');
  // var price = parseFloat(item.get('price'));

  // Convert date strings to Date objects
  var newCheckInDate = new Date(newCheckInDateString.replace(/-/g, '/'));
  var newCheckOutDate = new Date(newCheckOutDateString.replace(/-/g, '/'));
  
  // Set time parts to zero
  newCheckInDate.setHours(0, 0, 0, 0);
  newCheckOutDate.setHours(0, 0, 0, 0);

  var dateDiffInDays = Math.floor((newCheckOutDate - newCheckInDate) / (1000 * 60 * 60 * 24));
  // item.set('price', price * dateDiffInDays);

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
});












//* Refresh cart once simpleCart is ready to listen.
simpleCart.ready(function () {
  simpleCart.update();
});




