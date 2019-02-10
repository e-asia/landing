'use strict';

var page = page || {};
var $ = jQuery;

/* INIT
 ----------------------------------------------------------------------------------------------------------------------*/
page.init = function () {
  page.footerBottom();
  page.buttonBurger();
  page.moveTitle();
  page.moveTitleFront();
}

/* DOM READY
 ----------------------------------------------------------------------------------------------------------------------*/
$(page.init);

/* FUNCTIONS
 ----------------------------------------------------------------------------------------------------------------------*/
page.footerBottom = function () {

  // console.log('page');

  function footerAdapt() {
    var footer = $('footer[role="footer"]');

    $(footer).css('height', 'auto');

    var footerHeight = $(footer).outerHeight();

    $('body').css('padding-bottom', footerHeight);
    $(footer).css('height', footerHeight);
  }

  $(document).ready(function(){
    footerAdapt();
  });

  $(window).resize(function() {
    footerAdapt();
  });

};

page.buttonBurger = function () {

  // console.log('menu hamburger');

  var button = $('.hamburger');
  var navbar = $('#navbarNav');

  navbar.on('show.bs.collapse', function() {
    button.addClass('is-active');
  });

  navbar.on('hide.bs.collapse', function() {
    button.removeClass('is-active');
  });

};

page.moveTitle = function () {
  var titleFront = $('.block--starter-page-title');

  $( ".banner" ).prepend(titleFront);
};

page.moveTitleFront = function () {
  var titleFront = $('.page--front .block--starter-page-title');

  $( ".banner-front__body" ).prepend(titleFront);
};
