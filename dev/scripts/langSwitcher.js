"use strict";

try {
	var Helper = require('./helper');
} catch (err) {
	console.warn(err);
}

function LangSwitcher(options) {
	options.name = options.name || 'LangSwitcher';
	Helper.call(this, options);

	this._langSelectElemsArr = options.langSelectElemsArr || [];

	this._onCustomSelect = this._onCustomSelect.bind(this);

	this._init();
}

LangSwitcher.prototype = Object.create(Helper.prototype);
LangSwitcher.prototype.constructor = LangSwitcher;

LangSwitcher.prototype._init = function() {
    this._currentLang = this._getCookie('lang');

    this._addListener(document, 'customselect', this._onCustomSelect);
};

LangSwitcher.prototype._onCustomSelect = function(e) {
    var target = e.target;
    if (!target || this._langSelectElemsArr.indexOf(target) === -1) return;

    var newLang = e.detail.value;
    if (!newLang || newLang === this._currentLang) return;

    this._currentLang = newLang;

    document.cookie = 'lang=' + newLang;

    window.location.reload();
};

try {
	module.exports = LangSwitcher;
} catch (err) {
	console.warn(err);
}
