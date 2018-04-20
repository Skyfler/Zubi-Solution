"use strict";

try {
	var Helper = require('./helper');
} catch (err) {
	console.warn(err);
}

function InfoBlockController(options) {
	options.name = options.name || 'InfoBlockController';
	Helper.call(this, options);

	this._elem = options.elem;
	this._slider = options.slider;

	this._onSliderSlideChanged = this._onSliderSlideChanged.bind(this);
	this._showSelf = this._showSelf.bind(this);
	this._hideSelf = this._hideSelf.bind(this);

	this._init();
}

InfoBlockController.prototype = Object.create(Helper.prototype);
InfoBlockController.prototype.constructor = InfoBlockController;

InfoBlockController.prototype._init = function() {
	this._tabs = this._elem.querySelectorAll('.info_tab');
	this._innerBlock = this._elem.querySelector('.info_block_inner');
	this._showBtn = this._elem.querySelector('.show');
	this._hideBtn = this._elem.querySelector('.hide');
	this._hideTabsShowOne();

	this._addListener(document, 'sliderSlideChanged', this._onSliderSlideChanged);
	this._addListener(this._showBtn, 'click', this._showSelf);
	this._addListener(this._hideBtn, 'click', this._hideSelf);
};

InfoBlockController.prototype._showSelf = function() {
	this._innerBlock.classList.remove('info_hidden');
	this._showBtn.classList.add('info_hidden');
};

InfoBlockController.prototype._hideSelf = function() {
	this._innerBlock.classList.add('info_hidden');
	this._showBtn.classList.remove('info_hidden');
};

InfoBlockController.prototype._hideTabsShowOne = function(index) {
	for (var i = 0; i < this._tabs.length; i++) {
		if (index !== undefined && this._tabs[i].getAttribute('data-slide-index') == index) {
			this._tabs[i].style.display = '';
		} else {
			this._tabs[i].style.display = 'none';
		}
	}
};

InfoBlockController.prototype._onSliderSlideChanged = function(e) {
	console.log(this.NAME, e);

	var slider = e.detail.slider;
	if (slider === undefined || this._slider !== slider) return;

	var tabIndex = e.detail.slideIndex;
	this._hideTabsShowOne(tabIndex);
};

try {
	module.exports = InfoBlockController;
} catch (err) {
	console.warn(err);
}
