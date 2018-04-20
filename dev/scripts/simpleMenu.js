"use strict";

try {
	var Helper = require('./helper');
} catch (err) {
	console.warn(err);
}

function SimpleMenu(options) {
	options.name = options.name || 'SimpleMenu';
	Helper.call(this, options);

	this._elem = options.elem;
	this._openBtn = options.openBtn;
	this._closeBtn = options.closeBtn;
	this._menuOpenClass = options.menuOpenClass || 'menu_open';
	this._pageScrolledClass = options.pageScrolledClass || 'page_scrolled_down';

	this._onOpenBtnClick = this._onOpenBtnClick.bind(this);
	this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
	this._onWindowScroll = this._onWindowScroll.bind(this);

	this._init();
}

SimpleMenu.prototype = Object.create(Helper.prototype);
SimpleMenu.prototype.constructor = SimpleMenu;

SimpleMenu.prototype._init = function() {
	this._onWindowScroll();

	this._addListener(this._openBtn, 'click', this._onOpenBtnClick);
	this._addListener(this._closeBtn, 'click', this._onCloseBtnClick);
	this._addListener(window, 'scroll', this._onWindowScroll);
};

SimpleMenu.prototype._onOpenBtnClick = function() {
	this._elem.classList.add(this._menuOpenClass);
};

SimpleMenu.prototype._onCloseBtnClick = function() {
	this._elem.classList.remove(this._menuOpenClass);
};

SimpleMenu.prototype._onWindowScroll = function() {
	var currentScroll = window.scrollY || document.documentElement.scrollTop;

	if (currentScroll > 0 && !this._headerClassSet) {
		this._headerClassSet = true;
		this._elem.classList.add(this._pageScrolledClass);

	} else if (currentScroll === 0 && this._headerClassSet) {
		this._headerClassSet = false;
		this._elem.classList.remove(this._pageScrolledClass);

	}
};

try {
	module.exports = SimpleMenu;
} catch (err) {
	console.warn(err);
}
