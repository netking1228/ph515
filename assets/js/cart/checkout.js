simpleCart.ready(function () {
  simpleCart.each(function (item, x) {
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Name" value="' + item.get('name') + '">');
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Type" value="' + item.get('type') + '">');
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Date" value="' + item.get('date') + '">');
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Session" value="' + item.get('session') + '">');
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Quantity" value="' + item.get('quantity') + '">');
    $('form').append('<input type="hidden" name="' + item.get('id') + ' Total" value="' + item.get('total') + '">');
  });
});

