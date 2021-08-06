// JavaScript Document
var fqdn = location.host;
var dt = new Date();

function showTopics(obj) {
  $(obj + ' > li:hidden').filter(':lt(5)').show();
  if(!($(obj).next('.moreInfo').length)) {
	var btn =  $('<div class="moreInfo"><span>より以前のお知らせを表示</span></div>').insertAfter(obj);
    $(btn).on('click', function(){
    	showTopics(obj);
    });
  }
  if ( $(obj + ' > li:hidden').length == 0 ) {
  	$(obj).next('.moreInfo').remove();
  }
}

$(document).ready(function () {
  var footerText = $('#footer').text();
  footerText = footerText.replace('xxxx', dt.getFullYear());
  $('#rightBlock .block ul li, #rightBlock .block ol li').css('list-style-type', 'none');
  if($('#rightBlock .topicsList').length) {
      $('#rightBlock .topicsList > li').hide();
	  showTopics('#rightBlock .topicsList');
  }
  var userAgent = window.navigator.userAgent.toLowerCase();
  if(/msie|trident/i.test(userAgent)) {
    $("body").addClass("IEx");
  } 
  if ( !(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) ){
    $("body").addClass("no-svg");
  }
  if(/iPhone|iPad|iPod/i.test(userAgent)) {
    $("body").addClass("ios");
  }  
  $('#footer').text(footerText);
  $('a[href^="http://"][href!=fqdn],a[href^="https://"][href!=fqdn]').attr('target','_blank').attr('title', '外部サイトを開きます').append('&nbsp;<span class="icon-link" aria-hidden="true"></span>');
  var exts = [
    { "ext": "pdf", "class" : "adobeacrobatreader"},
    { "ext": "doc", "class" : "microsoftword"},
    { "ext": "docx", "class" : "microsoftword"},
    { "ext": "xls", "class" : "microsoftexcel"},
    { "ext": "xlsx", "class" : "microsoftexcel"},
    { "ext": "ppt", "class" : "microsoftpowerpoint"},
    { "ext": "pptx", "class" : "microsoftpowerpoint"},
    { "ext": "zip", "class" : "file-zip"},
    { "ext": "txt", "class" : "file-empty"}
  ];
  $.each(exts, function(){
    $('a[href$=".' + this.ext +'"]').addClass(this.class);
    if(this.class=='microsoftword' || this.class=='microsoftexcel' || this.class=='microsoftpowerpoint' || this.class=='file-zip' || this.class=='file-empty') {
      $('a[href$=".' + this.ext +'"]').append('&nbsp;<span class="icon-' + this.class + '" aria-hidden="true"></span>').attr('title', this.ext.toUpperCase() + 'ファイルをダウンロードします');
    }
  if (this.class=='adobeacrobatreader') {
    $('a[href$=".' + this.ext +'"]').append('&nbsp;<span class="icon-' + this.class + '" aria-hidden="true"></span>').attr('title', this.ext.toUpperCase() + 'ファイルを開きます').attr('target','_blank');
  }

  });
  $('a, button, #rightBlock .topicsList + .moreInfo > span').on('mouseenter touchstart', function(){
       $(this).addClass('hover');
  }).on('mouseleave touchend', function(){
       $(this).removeClass('hover');
  });
});
