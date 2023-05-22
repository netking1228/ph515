jQuery( document ).ready(function( $ ) {
	var u = window.location.toString();
	var s = "<a href=\"#\" class=\"fa-twitter-square\" style=\"color: #ffffff; font-size: 19px;\" onClick=\"javascript:void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent('"+u+"'))));return false;\"></a>&nbsp;&nbsp;&nbsp;";
	s = s + "<a href=\"#\" class=\"fa-pinterest-square\" style=\"color:#ffffff; font-size:19px;\" onClick=\"javascript: void(window.open('http://www.plurk.com/?qualifier=shares&status=' .concat(encodeURIComponent('"+u+"')) .concat(' ') .concat('&#40;') .concat(encodeURIComponent(document.title)) .concat('&#41;')));return false;\"></a>&nbsp;&nbsp;&nbsp;";
	s = s + "<a href=\"#\" class=\"fa-facebook-square\" style=\"color:#ffffff; font-size:19px;\" onClick=\"javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent('"+u+"')) ));return false;\"></a>&nbsp;&nbsp;&nbsp;";
	s = s + "<a href=\"https://plus.google.com/share?url="+u+"\" class=\"fa-google-plus-square\" style=\"color:#ffffff; font-size:19px;\" onclick=\"javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;\"></a>"
	$("span#share2_icon").html(s);
}); 
