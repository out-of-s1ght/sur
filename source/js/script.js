"use strict"

function initBackToTopButton() {
	const backToTopButton = document.querySelector('.back-to-top');

	if (backToTopButton) {
		backToTopButton.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }) });
	}

	document.addEventListener('scroll', () => {
		if (window.pageYOffset > 150 || document.documentElement.scrollTop > 150) {
			backToTopButton.classList.add('back-to-top_visible');
		}
		else {
			backToTopButton.classList.remove('back-to-top_visible');
		}
	});
}

function moveContentToFitHeader() {
	const _resize = () => {
		const newHeight = document.querySelector(".header").clientHeight || document.querySelector(".menu__burg").clientHeight
		const content = document.querySelector(".content")

		content.style.marginTop = `${newHeight}px`
	}

	window.addEventListener("load", _resize)
	window.addEventListener("resize", _resize)
}

function doAnimations() {
	gsap.registerPlugin(ScrollTrigger);
	let a = gsap.fromTo(".appeal__photo", { scale: "0" }, { // selector text, Array, or object
		scale: "1", // any properties (not limited to CSS)
		duration: 1.8, // seconds		delay: 0,
		ease: "power2.inOut",
		scrollTrigger: {
			trigger: ".appeal__photo",
			toggleActions: "play reverse play reverse",
		}
	}
	)
	gsap.fromTo(".intro__body", { x: "200%", scale: "0" }, { // selector text, Array, or object
		x: "0%", // any properties (not limited to CSS)
		scale: "1",
		duration: 1.8,
		delay: 0.1,
		ease: "power2.inOut",
		scrollTrigger: {
			trigger: ".intro__body",

			toggleActions: "play reverse play reverse",
		}
	}
	)
	gsap.fromTo(".video-card", { x: "200%" }, { 
		x: "0%", 
		duration: 0.6,
		stagger: 0.2,
		delay: 0.6,
		ease: "power2.inOut",
		scrollTrigger: {
			trigger: ".video-content",
			// start: "top center",
			toggleActions: "play reverse play reverse",
		}
	}
	)
}

doAnimations()
initBackToTopButton()
moveContentToFitHeader()

//<-------------------------------Мобилка - PC--------------------------------------------------------->
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

function initHeader() {
	if (isMobile.any()) {
		document.body.classList.add('_touch');
		let menuArrows = document.querySelectorAll('.menu__arrow');
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index];
				menuArrow.addEventListener("click", function (e) {
					menuArrow.parentElement.classList.toggle('_active');
				});
			}
		}
	} else {
		document.body.classList.add('_pc');
	}

	const iconMenu1 = document.querySelector('.menu__icon');
	if (iconMenu1) {
		const menuBody = document.querySelector('.menu__body');
		iconMenu1.addEventListener("click", function (e) {
			document.body.classList.toggle('_lock');
			document.html.classList.toggle('_lock');
			iconMenu1.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}

	const btt = document.querySelector(".back-to-top");
	const iconMenu = document.querySelector('.menu__icon-burger');
	if (iconMenu) {
		const menuBody = document.querySelector('.menu__body');
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			btt.classList.remove("back-to-top_visible")
		});
	}
}

initHeader()

//<--------------------------Мобилка - PC--------------------------------------------------------->

//<--------------------------Картинка Fullscreen-------------------------------------------------->
// function ibg() {

// 	let ibg = document.querySelectorAll(".ibg");
// 	for (var i = 0; i < ibg.length; i++) {
// 		if (ibg[i].querySelector('img')) {
// 			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
// 		}
// 	}
// }

// ibg();
//<-----------------------------------------Картинка Fullscreen------------------------------------------------->

//<-----------------------------------------Кнопка прокрутки наверх--------------------------------------------->

//<-----------------------------------------Кнопка прокрутки наверх--------------------------------------------->

//<-----------------------------------------Стрелка вниз наверх--------------------------------------------->
// const fullWidth = Math.max(
// 	document.body.scrollWidth,
// 	document.documentElement.scrollWidth,
// 	document.body.offsetWidth,
// 	document.documentElement.offsetWidth,
// 	document.body.clientWidth,
// 	document.documentElement.clientWidth
// );
// const fullHeight = Math.max(
// 	document.body.scrollHeight,
// 	document.documentElement.scrollHeight,
// 	document.body.offsetHeight,
// 	document.documentElement.offsetHeight,
// 	document.body.clientHeight,
// 	document.documentElement.clientHeight
// );

// const btnarrow = document.querySelector('.firstblock__arrowdown');
// if (btnarrow != undefined) {
// 	function onClick(e) {
// 		window.scrollTo({
// 			top: 350,
// 			behavior: "smooth"
// 		});
// 		e.preventDefault();
// 	};
// 	btnarrow.addEventListener("click", onClick);
// }

// //<-----------------------------------------Стрелка вниз наверх--------------------------------------------->
// const noLinks = document.querySelectorAll('.menu__nolink');
// for (let index = 0; index < noLinks.length; index++) {
// 	const noLink = noLinks[index];
// 	if (noLink != undefined) {
// 		function onClick(e) {
// 			e.preventDefault();
// 		};
// 		noLink.addEventListener("click", onClick);
// 	}
// }
// //<-----------------------------------------Кнопка прокрутки наверх--------------------------------------------->


// //<-----------------------------------------Спойлеры--------------------------------------------------------->
// const spollersArray = document.querySelectorAll('[data-spollers]');
// if (spollersArray.length > 0) {
// 	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
// 		return !item.dataset.spollers.split(',')[0];
// 	});
// 	if (spollersRegular.length > 0) {
// 		initSpollers(spollersRegular);
// 	}

// 	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
// 		return item.dataset.spollers.split(',')[0];
// 	});
// 	if (spollersMedia.length > 0) {
// 		const breakpointsArray = [];
// 		spollersMedia.forEach(item => {
// 			const params = item.dataset.spollers;
// 			const breakpoint = {};
// 			const paramsArray = params.split(',');
// 			breakpoint.value = paramsArray[0];
// 			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
// 			breakpoint.item = item;
// 			breakpointsArray.push(breakpoint);
// 		});

// 		let mediaQueries = breakpointsArray.map(function (item) {
// 			return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
// 		});
// 		mediaQueries = mediaQueries.filter(function (item, index, self) {
// 			return self.indexOf(item) === index;
// 		});


// 		mediaQueries.forEach(breakpoint => {
// 			const paramsArray = breakpoint.split(',');
// 			const mediaBreakpoint = paramsArray[1];
// 			const mediaType = paramsArray[2];
// 			const matchMedia = window.matchMedia(paramsArray[0]);
// 			const spollersArray = breakpointsArray.filter(function (item) {
// 				if (item.value === mediaBreakpoint && item.type === mediaType) {
// 					return true;
// 				}
// 			});
// 			matchMedia.addListener(function () {
// 				initSpollers(spollersArray, matchMedia);
// 			});
// 			initSpollers(spollersArray, matchMedia);
// 		});
// 	}


// 	function initSpollers(spollersArray, matchMedia = false) {
// 		spollersArray.forEach(spollersBlock => {
// 			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
// 			if (matchMedia.matches || !matchMedia) {
// 				spollersBlock.classList.add('_init');
// 				initSpollerBody(spollersBlock);
// 				spollersBlock.addEventListener('click', setSpollerAction);
// 			} else {
// 				spollersBlock.classList.remove('_init');
// 				initSpollerBody(spollersBlock, false);
// 				spollersBlock.removeEventListener('click', setSpollerAction);
// 			}
// 		});
// 	}

// 	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
// 		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
// 		if (spollerTitles.length > 0) {
// 			spollerTitles.forEach(spollerTitle => {
// 				if (hideSpollerBody) {
// 					spollerTitle.removeAttribute('tabindex');
// 					if (!spollerTitle.classList.contains('_active')) {
// 						spollerTitle.nextElementSibling.hidden = true;
// 					}
// 				} else {
// 					spollerTitle.setAttribute('tabindex', '-1');
// 					spollerTitle.nextElementSibling.hidden = false;
// 				}
// 			});
// 		}
// 	}

// 	function setSpollerAction(e) {
// 		const el = e.target;
// 		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
// 			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
// 			const spollersBlock = spollerTitle.closest('[data-spollers]');
// 			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
// 			if (!spollersBlock.querySelectorAll('._slide').length) {
// 				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
// 					hideSpollersBody(spollersBlock);
// 				}
// 				spollerTitle.classList.toggle('_active');
// 				_slideToggle(spollerTitle.nextElementSibling, 500);
// 			}
// 			e.preventDefault();
// 		}
// 	}
// 	function hideSpollersBody(spollersBlock) {
// 		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
// 		if (spollerActiveTitle) {
// 			spollerActiveTitle.classList.remove('_active');
// 			_slideUp(spollerActiveTitle.nextElementSibling, 500);
// 		}
// 	}
// }

// let _slideUp = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = target.offsetHeight + 'px';
// 		target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		window.setTimeout(() => {
// 			target.hidden = true;
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('padding-top');
// 			target.style.removeProperty('padding-bottom');
// 			target.style.removeProperty('margin-top');
// 			target.style.removeProperty('margin-bottom');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// }

// let _slideDown = (target, duration = 500) => {
// 	if (!target.classList.contains('_slide')) {
// 		target.classList.add('_slide');
// 		if (target.hidden) {
// 			target.hidden = false;
// 		}
// 		let height = target.offsetHeight;
// 		target.style.overflow = 'hidden';
// 		target.style.height = 0;
// 		target.style.paddingTop = 0;
// 		target.style.paddingBottom = 0;
// 		target.style.marginTop = 0;
// 		target.style.marginBottom = 0;
// 		target.offsetHeight;
// 		target.style.transitionProperty = 'height, margin, padding';
// 		target.style.transitionDuration = duration + 'ms';
// 		target.style.height = height + 'px';
// 		target.style.removeProperty('padding-top');
// 		target.style.removeProperty('padding-bottom');
// 		target.style.removeProperty('margin-top');
// 		target.style.removeProperty('margin-bottom');
// 		window.setTimeout(() => {
// 			target.style.removeProperty('height');
// 			target.style.removeProperty('overflow');
// 			target.style.removeProperty('transition-duration');
// 			target.style.removeProperty('transition-property');
// 			target.classList.remove('_slide');
// 		}, duration);
// 	}
// }

// let _slideToggle = (target, duration = 500) => {
// 	if (target.hidden) {
// 		return _slideDown(target, duration);
// 	} else {
// 		return _slideUp(target, duration)
// 	}
// }
//<-----------------------------------------Спойлеры--------------------------------------------------------->


// function filter_list(l) {
// 	let newArray = [];
// 	let element;
// 	for (let index = 0; index < l.length; index++) {
// 		element = l[index];
// 		if (typeof (element) == 'number')
// 			newArray.push(element);
// 	}

// 	return newArray;

// }
// console.log(filter_list([1, 3, 'a', 'b']));




