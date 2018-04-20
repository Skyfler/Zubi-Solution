"use strict";

(function ready() {

    var _polyfills = require('./polyfills');
    var _extendStandartPrototypes = require('./extendStandartPrototypes');
	var SimpleMenu = require('./simpleMenu');
	// var CustomSelect = require('./customSelect');
	// var LangSwitcher = require('./langSwitcher');
	var Slider = require('./slider');
	var GMapController = require('./gmapController');
	var Tabs = require('./tabs');
	var SliderControlls = require('./slider-sliderControlls');
	var ContactFormController = require('./contactFormController');
	var InfoBlockController = require('./infoBlockController');

	// initialise all polyfills
	_polyfills.init();
	// initialise all prototype extensions
	_extendStandartPrototypes.init();

	var headerElem = document.querySelector('#header');
	if (headerElem) {
		var header = new SimpleMenu({
			elem: headerElem,
			openBtn: document.querySelector('#header_menu_open_btn'),
			closeBtn: document.querySelector('#header_menu_close_btn')
		});
	}

	// var langSelectElemsArr = [];
	//
	// var langSelectHeaderElem = document.querySelector('#lang_switch_header');
	// if (langSelectHeaderElem) {
	// 	var langSelectHeader = new CustomSelect({
	// 		elem: langSelectHeaderElem
	// 	});
	//
	// 	langSelectElemsArr.push(langSelectHeaderElem);
	// }
	//
	// var langSwitcher = new LangSwitcher({
	// 	langSelectElemsArr: langSelectElemsArr
	// });

	var ourTeamSliderElem = document.querySelector('#our_team_slider');
	if (ourTeamSliderElem) {
		var ourTeamSlider = new Slider({
			elem: ourTeamSliderElem,
			breakPoint: {
				max: 667
			},
			delay: 0
		});
	}

	var worksSliderElem = document.querySelector('#works_slider');
	if (worksSliderElem) {
		var worksSlider = new Slider({
			elem: worksSliderElem,
			delay: 0,
			allowTouchDrag: false
		});

		var workSliderControllsElem = document.querySelector('#work_slider_controls');
		if (workSliderControllsElem) {
			var workSliderControlls = new SliderControlls({
				elem: workSliderControllsElem,
				slidesCount: worksSlider.getSlidesCount(),
				slider: worksSlider,
				noTransition: true
			});
		}
	}

	var mapElem = document.querySelector('#map');
	if (mapElem) {
		var pos = {lat: 49.993060, lng: 36.231508};
		var gMap = new GMapController({
			elem: mapElem,
			gMapLoaded: gMapLoaded,
			gMapOptions: {
				zoom: 18,
				center: pos,
				streetViewControl: false,
				mapTypeControl: false,
				scrollwheel: false,
			},
			markers: [{
				icon: 'img/map_marker.png',
				position: pos,
				title: 'Title'
			}]
		});
	}

	var tabsContainerElem = document.querySelector('.tabs_container');
	if (tabsContainerElem) {
		var tabs = new Tabs({
			elem: tabsContainerElem,
			transitionDuration: 0.15,
			// initialTabNum: 1,
			initialTabTarget: '#thumbnails_tab'
		});
	}

	var contactFormElem = document.querySelector('#contact_form');
	if (contactFormElem) {
		var contactForm = new ContactFormController({
			elem: contactFormElem,
			actionUrl: contactFormElem.action,
			// succsessNotificationHTML: '<div class="success_notification">' +
			// '<p>Ваша заявка принята!</p>' +
			// '<p>Наши менеджеры свяжутся с вами в ближайшее время ;)</p>' +
			// '</div>'
		});
	}

	var infoBlockElem = document.querySelector('#info_block');
	if (infoBlockElem) {
		var infoBlock = new InfoBlockController({
			elem: infoBlockElem,
			slider: worksSlider
		});
	}

})();