/* global inputMask:true, $:true */

$ = require('jquery');
inputMask = require('jquery-mask-plugin');

$(function () {
	require('./logic.js');
	require('./input-masks.js');
});
