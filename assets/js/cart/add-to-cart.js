
jQuery('#item_add').click(function () {

  // $('html, body').animate({
  //   scrollTop: 0
  // }, 100);

  $('#cart-menu').addClass('shake');


  setTimeout(function () {
    $('#cart-menu').removeClass('shake');
  }, 5000); // 这里的 1000 是动画持续的时间，根据实际情况调整

});



