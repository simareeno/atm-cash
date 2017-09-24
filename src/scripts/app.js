/* global inputMask:true, $:true */

$ = require('jquery');
TweenMax = require('gsap');
inputMask = require('jquery-mask-plugin');

$(function() {
	require('./logic.js');
	require('./picker.js');
});
