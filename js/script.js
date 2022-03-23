"use strict"
//*< Общие переменные>==========================================================================================
const body = document.querySelector('body');
let unlock = true;
// Функция возвращает устройство на котором открыт сайт   isMobile.any()    вернет true, если сайт открыт на устройстве с тачскрином
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
//*</ Общие переменные>==========================================================================================
// слайдер swiper
if (document.querySelector('.main-page__slider')) {
	new Swiper('.main-page__slider', {
		//Навигация
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		//Переключение с помощью клавиатуры
		keyboard: {
			enabled: true,
			onlyInViewport: true,
			pageUpDown: false,
		},
		slidesPerView: 1,
		watchOverflow: true,
		loop: true,
		parallax: true,
		speed: 800,
		loopAdditionalSlides: 5,
		observer: true,
		observeParents: true,
		preloadImages: false,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// }
	});

}
// Изменение прозрачности пунктов меню при наведении на один из них
const menuItems = document.querySelectorAll('.menu__item');
const menuItemsActive = document.querySelector('.menu__item_active');
if (menuItems.length > 0 && !isMobile.any()) {
	menuItems.forEach(menuItem => {
		menuItem.addEventListener('mouseover', function (e) {
			menuItems.forEach(menuItem => {
				menuItem.classList.add('_op');
				menuItem.classList.remove('_op1');
			});
			menuItem.classList.add('_op1');
			menuItem.classList.remove('_op');
		})
		menuItem.addEventListener('mouseout', function (e) {
			menuItems.forEach(menuItem => {
				if (!menuItem.classList.contains('menu__item_opacity')) {
					menuItem.classList.remove('_op');
					menuItem.classList.add('_op1');
				}
			});
			if (menuItem.classList.contains('menu__item_no') || menuItem.classList.contains('menu__item_active')) {
				menuItem.classList.add('_op1');
				menuItem.classList.remove('_op');
			} else {
				menuItem.classList.add('_op');
				menuItem.classList.remove('_op1');
				menuItemsActive.classList.add('_op1');
				menuItemsActive.classList.remove('_op');
			}
		})
	});
}
//перемещение лейбла у тегов форм
const formText = document.querySelector('.form-newsletter__mail'); //Блок, внутри котрого инпут и лэйбл, надо прописать стил при получении класса _active (типо лейбл уменьшаеьтся и перемещается выше)
if (formText != null) {
	addAnEvent(formText);
}
// загрузка видео с ютуба
const buttonsPlay = document.querySelectorAll('.main-page__play');
if (buttonsPlay.length > 0) {
	for (let index = 0; index < buttonsPlay.length; index++) {
		const videoBlock = buttonsPlay[index].closest('.main-page__body').querySelector('.main-page__video');
		buttonsPlay[index].addEventListener('click', function (e) {
			buttonsPlay[index].style.opacity = 0;
			buttonsPlay[index].style.visibility = 'hidden';
			// videoBlock.classList.remove("_ibg");
			// _ibg();
			// videoBlock.querySelector("img").style.display = "none";
			videoBlock.insertAdjacentHTML('afterbegin', `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&amp;mute=1"
			title="YouTube video player" frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen></iframe>`);
		});
	}
}
// header при скролле
// У хедер указываем минимальную высоту,при прокрутке этой высоты добавится класс _scroll, с которым можно что-то сделать. В обратную сторону класс удалится
const headerElement = document.querySelector(".header");
const callback = function (entries, observer) {
	if (entries[0].isIntersecting) {
		headerElement.classList.remove("_scroll")
	} else {
		headerElement.classList.add("_scroll")
	}
}
const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

//Меню бургер, корзина
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const headerBody = document.querySelector('.header__body');
const cartHeader = document.querySelector('.cart-header');
if (iconMenu != null) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.icon-menu')) {
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			headerBody.classList.toggle('_active');
		}
		if (!e.target.closest('.icon-menu')) {
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			headerBody.classList.remove('_active');
		}
		// Открытие корзины по нажатию на иконку
		if (e.target.classList.contains('cart-header__icon')) {
			cartHeader.classList.toggle("_active");
			document.querySelector('.search__btn').classList.toggle("_active");
			document.querySelector('.header__logo').classList.toggle("_active");
			e.preventDefault();
		}
		if ((!e.target.closest('.cart-header__content') && !e.target.classList.contains('cart-header__icon')) || e.target.closest('.cart-header__close')) {
			cartHeader.classList.remove("_active");
			document.querySelector('.search__btn').classList.remove("_active");
			document.querySelector('.header__logo').classList.remove("_active");
		}
		if (!menuBody.classList.contains('_active') && !cartHeader.classList.contains('_active')) {
			bodyUnLock();
		} else if (menuBody.classList.contains('_active') || cartHeader.classList.contains('_active')) {
			bodyLock();
		}
	});
};
//спойлеры
const iconQuestions = document.querySelectorAll('.question');
//const iconsQuestions = document.querySelectorAll('.question__icon');
if (iconQuestions.length > 0) {
	spollers(iconQuestions);
};
function spollers(iconQuestions) {
	iconQuestions.forEach(iconQuestion => {
		iconQuestionBody(iconQuestion);
		iconQuestion.addEventListener('click', setSpollersAction)
	});
}
function iconQuestionBody(iconQuestion) {
	if (!iconQuestion.classList.contains('_active')) {
		iconQuestion.lastElementChild.hidden = true;
	}
}
function setSpollersAction(e) {
	const el = e.target;
	const spollerBlock = el.closest('.question');
	if (!spollerBlock.querySelectorAll('._slide').length) {
		if (el.classList.contains('question__icon')) {
			el.classList.toggle('_active');
			el.parentNode.classList.toggle('_active');
			spollerBlock.firstElementChild.classList.remove('_active');
			_slideToggle(spollerBlock.lastElementChild, 500);
		} if (el.classList.contains('question__title')) {
			spollerBlock.firstElementChild.classList.toggle('_active');
			el.parentNode.classList.toggle('_active');
			_slideToggle(spollerBlock.lastElementChild, 500);
		} if (el.classList.contains('question__text')) {
			el.parentNode.classList.remove('_active');
			el.previousElementSibling.classList.remove('_active');
			spollerBlock.firstElementChild.classList.remove('_active');
			_slideToggle(spollerBlock.lastElementChild, 500);
		} else {
			el.classList.toggle('_active');
			spollerBlock.firstElementChild.nextElementSibling.classList.toggle('_active');
			if (el.firstElementChild != null) {
				el.firstElementChild.classList.toggle('_active');
			}
			_slideToggle(spollerBlock.lastElementChild, 500);
		}
	}
	// e.preventDefault();
}
/*function hideSpollerBody(spollerBlock) {
	const spoller_activeTitle = spollerBlock.querySelector('.question__title._active');
	if (spoller_activeTitle) {
		spoller_activeTitle.classList.remove('_active');
		_slideUp(spoller_activeTitle.nextElementSibling, 500);
	}
}*/
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height,margin,padding';
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
// Спойлер фрилансера (Оставить функции _slideUp _slideDown _slideToggle)
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spoller_activeTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spoller_activeTitle) {
			spoller_activeTitle.classList.remove('_active');
			_slideUp(spoller_activeTitle.nextElementSibling, 500);
		}
	}
}
//прокрутка к блоку
const productsMain = document.querySelector('.products-main');
const mainPageArrow = document.querySelectorAll('.main-page__arrow');
if (mainPageArrow.length > 0) {
	for (let index = 0; index < mainPageArrow.length; index++) {
		mainPageArrow[index].addEventListener('click', () => scrollToBlock(productsMain));
	}
};
// Cтоимость закaза в корзине
const arrowsMore = document.querySelectorAll('.form-cart-list__amount-more');
const arrowsLess = document.querySelectorAll('.form-cart-list__amount-less');
const arrowsInput = document.querySelectorAll('.form-cart-list__amount-input');
const cartListItems = document.querySelectorAll('.cart-list__item');
if (cartListItems.length > 0) {
	priceFunc();
}
if (arrowsMore.length > 0 && arrowsLess.length > 0 && arrowsInput.length > 0) {
	// Делаем кнопки кликабельными, устанавливаем макс и мин кол-во порций
	arrowsMore.forEach(arrowMore => {
		arrowMore.addEventListener('click', function () {
			++(arrowMore.previousElementSibling.value);
			if (arrowMore.previousElementSibling.value > 100) {
				arrowMore.previousElementSibling.value = 100;
			}
			priceFunc();
		})
	});
	arrowsLess.forEach(arrowLess => {
		arrowLess.addEventListener('click', function () {
			--(arrowLess.nextElementSibling.value);
			if (arrowLess.nextElementSibling.value < 0) {
				arrowLess.nextElementSibling.value = 0;
			}
			priceFunc();
		})
	});
	arrowsInput.forEach(arrowInput => {
		arrowInput.addEventListener('keyup', function () {
			if (arrowInput.value < 0) {
				arrowInput.value = 0;
			} else if (arrowInput.value > 100) {
				arrowInput.value = 100;
			}
			priceFunc();
		})
	});
}
// Перемещаем кнопку в main-page
const mediaQuery = window.matchMedia('(max-width: 991.98px)')
function handleTabletChange(e) {
	if (e.matches) {
		const mainPageButton = document.querySelectorAll('.main-page__button');
		for (let i = 0; i < mainPageButton.length; i++) {
			const mainPageBody = mainPageButton[i].closest('.main-page__body');
			mainPageBody.append(mainPageButton[i]);
		}
	}
}
mediaQuery.addListener(handleTabletChange);
handleTabletChange(mediaQuery);
const mediaQueryMin = window.matchMedia('(min-width: 991.98px)')
function handleTabletChangeMin(e) {
	if (e.matches) {
		const mainPageButton = document.querySelectorAll('.main-page__button');
		for (let i = 0; i < mainPageButton.length; i++) {
			const mainPageBody = mainPageButton[i].closest('.main-page__body');
			const mainPageContent = mainPageBody.querySelector('.main-page__content');
			mainPageContent.append(mainPageButton[i]);
		}
	}
}
mediaQueryMin.addListener(handleTabletChangeMin);
handleTabletChangeMin(mediaQueryMin);

//*< Функции>==========================================================================================
//Функция считает и выводит стоимость заказа
function priceFunc() {
	let finPrice = document.querySelector('.cart-header__total .cart-header__price');
	let cartsListPrice = document.querySelectorAll('.cart-list__price span');
	let priceItem = 0;
	let priceTotal = 0;
	for (let i = 0; i < cartListItems.length; i++) {
		priceItem = +(cartListItems[i].dataset.price) * +(arrowsInput[i].value);
		cartsListPrice[i].innerHTML = priceItem.toFixed(2);
		priceTotal = priceTotal + priceItem;
		finPrice.innerHTML = priceTotal.toFixed(2);
	}
}
//Прокрутка до блока при нажатии на кнопку
//Пример применения
// const questionsX = document.querySelector('.questions_scroll');
// const questions = document.querySelector('.questions');
// if (questionsX != null) {
// 	questionsX.addEventListener('click', () => scrollToBlock(questions));
// };
// if (rationsX.length > 0) {
// 	for (let index = 0; index < rationsX.length; index++) {
// 		rationsX[index].addEventListener('click', () => scrollToBlock(rations));
// 	}
// };
function scrollToBlock(block) { //в скобки передаем блок, до которого надо докрутить
	let getTop = block.getBoundingClientRect().top;
	let getTopDocument = getTop + window.scrollY;
	window.scrollTo({
		top: getTopDocument,
		left: 0,
		behavior: "smooth",
	});
};
// Убирает переданный класс у переданного элемента
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
// Функции для перемещения лейблов у тегов форм
function addAnEvent(elem) {
	elem.firstElementChild.addEventListener('focus', function () {
		formAddClass(elem)
	});
	elem.firstElementChild.addEventListener('blur', function () {
		formRemoveClass(elem)
	});
}
function formAddClass(elem) {
	elem.classList.add('_active');
}
function formRemoveClass(elem) {
	const elemChildValue = elem.firstElementChild.value;
	if (elemChildValue == '') {
		elem.classList.remove('_active');
	}
}
//узнает местоположение объекта.Можно получить значение сверху и слева
function offset(el) { //в скобках объект, чье местоположение нужно
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//Блокирует прокрутку
const lockPadding = document.querySelectorAll('.lock-padding');
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('_lock')

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Разблокировывает прокрутку
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock')
	}, 200);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, 500); //Время, в течении которого нельзя повторно открыть поп-ап, обычно равен времени анимации
}
//Ставит картинку как фон
function _ibg() {
	let _ibg = document.querySelectorAll("._ibg");
	for (var i = 0; i < _ibg.length; i++) {
		if (_ibg[i].querySelector('img')) {
			_ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
_ibg();
//*</ Функции>==========================================================================================
// Скрипты для форм
//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
