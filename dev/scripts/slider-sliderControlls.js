"use strict";

try {
	var Helper = require('./helper');
} catch (err) {
	console.warn(err);
}

function SliderControlls(options) {
	options.name = options.name || 'SliderControlls';
	Helper.call(this, options);

	this._elem = options.elem;
	this._slidesCount = options.slidesCount;
	this._slider = options.slider;
	this._sliderElem = options.sliderElem;
	this._sliderSelector = options.sliderSelector;
	this._noTransition = !!options.noTransition;

	this._onClick = this._onClick.bind(this);
	this._onSliderSlideChanged = this._onSliderSlideChanged.bind(this);

	this._init();
}

SliderControlls.prototype = Object.create(Helper.prototype);
SliderControlls.prototype.constructor = SliderControlls;

SliderControlls.prototype._init = function() {
	this._controllsElemsArr = this._elem.querySelectorAll('.slider_controll');

	this._setActive(this._slider.getActiveSlideIndex());

	this._addListener(this._elem, 'click', this._onClick);
	this._addListener(document, 'sliderSlideChanged', this._onSliderSlideChanged);
};

SliderControlls.prototype._onClick = function(e) {
	var target = e.target;

	this._controlSlider(target);
};

SliderControlls.prototype._onSliderSlideChanged = function(e) {
	var slideIndex = e.detail.slideIndex;
	var slider = e.detail.slider;
	if (slideIndex === undefined || this._slider !== slider) return;

	this._setActive(slideIndex);
};

SliderControlls.prototype._setActive = function(index) {
	for (var i = 0; i < this._controllsElemsArr.length; i++) {
		this._controllsElemsArr[i].classList.remove('active');
	}

	var activeControll = this._elem.querySelector('[data-slide-index="' + index + '"]');
	if (activeControll) {
		activeControll.classList.add('active');
	}
};

SliderControlls.prototype._controlSlider = function(target) {
	var control = target.closest('.slider_controll');
	if (!control) return;
	var slideIndex = control.dataset.slideIndex;
	if (!slideIndex) return;

	var targetSlider = this._slider || this._sliderElem || this._sliderSelector || false;
	this._sendCustomEvent(document, 'sliderControl', { bubbles: true, detail: {slideIndex: parseInt(slideIndex), targetSlider: targetSlider, noTransition: this._noTransition} });
};

try {
	module.exports = SliderControlls;
} catch (err) {
	console.warn(err);
}
