// 'use strict';
//
// var mainMenu = mainMenu || {};
// var $ = jQuery;
//
// /* INIT
//  ----------------------------------------------------------------------------------------------------------------------*/
// mainMenu.init = function () {
//   mainMenu.dropdownHover();
// }
//
// /* DOM READY
//  ----------------------------------------------------------------------------------------------------------------------*/
// $(mainMenu.init);
//
// /* FUNCTIONS
//  ----------------------------------------------------------------------------------------------------------------------*/
// mainMenu.dropdownHover = function () {
//
//   // console.log('mainMenu');
//
//   var linkDropdown = $('[data-toggle="dropdown"]');
//
//   linkDropdown.on('click', function(){ if ($(this).attr('aria-expanded')=='true') {window.location = $(this).attr('href');} } )
//
//   linkDropdown.bootstrapDropdownHover({
//     'setClickBehavior': 'link'
//   });
//
// };
