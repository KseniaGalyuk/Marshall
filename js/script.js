"use strict"
//*< Общие переменные>==========================================================================================
const body = document.querySelector('body');
let unlock = true;
// Функция возвращает устройство на котором открыт сайт   isMobile.any()    вернет true, если сайт открыт на устройстве с тачскрином
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
//*</ Общие переменные>==========================================================================================
// делегирование
window.onload = function () {
	document.addEventListener("click", documentActions);
	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector(".search-form").classList.toggle("_active");
		} else if (!targetElement.closest('.search-form') && document.querySelectorAll(".search-form._active")) {
			document.querySelector(".search-form").classList.remove("_active");
		}
		// Открытие корзины по нажатию на нее
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header__empty').style.display = "none";
				document.querySelector('.cart-header__total').style.display = "block";
				document.querySelector('.cart-header__button').style.display = "flex";
			} else {
				document.querySelector('.cart-header__empty').style.display = "block";
				document.querySelector('.cart-header__total').style.display = "none";
				document.querySelector('.cart-header__button').style.display = "none";
			}
			document.querySelector('.cart-header').classList.toggle("_active");
			e.preventDefault();
			// Закрываем при нажатии на любое другое место, кроме кнопки добавления в корзину
		} else if (!targetElement.closest('.cart-header__content') || targetElement.closest('.cart-header__close')) {
			document.querySelector('.cart-header').classList.remove("_active")
		}
		// Удаление товара из корзины
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
	}
}

// слайдер swiper
if (document.querySelector('.swiper')) {
	new Swiper('.swiper', {  //Класс должен быть указан блока, на который повешан слайдер
		//Навигация
		pagination: {
			el: '.swiper-pagination',// не обязательно ставить этот класс, если блок уже назван, вставить его класс в скобки
			// Буллеты
			//тип по умолчанию
			type: 'bullets',
			//можно ли на него нажимать
			clickable: true,
		},
		// Навигация стрелки
		// Arrows
		// Чтобы обратиться именно к этим стрелкам, а не к стрелкам с таким же названием в другом блоке, надо обратиться через родителя
		navigation: {
			nextEl: ".slider__main .slider-arrow__next", // не обязательно ставить этот класс, если блок уже назван, вставить его класс в скобки
			prevEl: ".slider__main .slider-arrow__prev", // не обязательно ставить этот класс, если блок уже назван, вставить его класс в скобки
		},

		//Переключение с помощью клавиатуры
		keyboard: {
			//включить/выключить
			enabled: true,
			//Только когда слайдер в пределах вьюпорта вкдючить/выключить
			onlyInViewport: true,
			// Управление клавишами pageUp/pageDown включить/выключить
			pageUpDown: true,
		},


		// Переключение колесом мыши
		mousewheel: {
			// Чувствительность колеса мыши 0-не работает, можно больше 1
			sensitivity: 1,
			//Класс объекта на котором сработает прокрутка мышью
			// Если слайдеров много, они сработают все, в таком случае лучше оставлять по умолчанию
			eventsTarget: '.swiper', //Обычно класс тот же, что и сверху
		},


		// Количество слайдов для показа, можно указывать не целые числа, можно 'auto'-колво слайдеров выводится автоматически, в зависимости от контента или заданной ширины
		//slidesPerView: 1,


		// Если слайдов меньше чем нужно, слайдер полностью перестанет работать, пока будет нужного количества
		watchOverflow: true,


		// Отступ между слайдами
		spaceBetween: 20,


		// Активный слайдер по центру
		// centeredSlides: true,


		// Бесконечный слайдер
		//loop: true,


		// Свободный режим, можно листать в любое положение
		//freeMode:true,

		// Брейк поинты, работают по принципу мобайл ферст, срабатывают н аширине больще указанной
		// Этим способом нельзя координально измеить логику слайдера, например поменять горизонтальный скролл на вертикальный
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			1150: {
				slidesPerView: 2,
				keyboard: {
					enabled: false,
				},
				mousewheel: {
					enabled: false,
				},
			}
		},
		// Парралакс эффект
		parallax: true,
		// Добавить атрибуты data-swiper-parallax-opacity="0" data-swiper-parallax-x="-100%" к элементу для парралах эффекта
		// Скорость
		speed: 800,

		// Точно не знаю за что отвечают следующие параметры
		loopAdditionalSlides: 5,
		observer: true,
		observeParents: true,
		preloadImages: false,
	});

}
// Изменение прозрачности пунктов меню при наведении на один из них
const menuItems = document.querySelectorAll('.menu__item');
if (menuItems.length > 0 && !isMobile.any()) {
	menuItems.forEach(menuItem => {
		menuItem.addEventListener('mouseover', function (e) {
			menuItems.forEach(menuItem => {
				menuItem.style.opacity = 0.5;
			});
			menuItem.style.opacity = 1;
		})
		menuItem.addEventListener('mouseout', function (e) {
			menuItems.forEach(menuItem => {
				menuItem.style.opacity = 1;
			});
		})
	});
}
//перемещение лейбла у тегов форм
const formText = document.querySelector('.form-contacts__text'); //Блок, внутри котрого инпут и лэйбл, надо прописать стил при получении класса _active (типо лейбл уменьшаеьтся и перемещается выше)
if (formText != null) {
	addAnEvent(formText);
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

//Меню бургер
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const headerBody = document.querySelector('.header__body');
if (iconMenu != null) {
	document.addEventListener('click', function (e) {
		if (e.target.closest('.icon-menu')) {
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			headerBody.classList.toggle('_active');
			bodyLock();
			if (!menuBody.classList.contains('_active')) {
				bodyUnLock();
			}
		}
		if (!e.target.closest('.icon-menu') && !e.target.closest('._popup-link') && !e.target.closest('.popup__content')) {
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			headerBody.classList.remove('_active');
			bodyUnLock();
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
//Прокрутка к началу строници
const scrollToTop = document.querySelectorAll('.scroll-to-top');
if (scrollToTop.length > 0) {
	for (let index = 0; index < questionsX.length; index++) {
		scrollToTop[index].addEventListener('click', scrollTop());
	}
}
//прокрутка к блоку
const questions = document.querySelector('.questions');
const questionsX = document.querySelectorAll('.questions_scroll');
if (questionsX.length > 0) {
	for (let index = 0; index < questionsX.length; index++) {
		questionsX[index].addEventListener('click', () => scrollToBlock(questions));
	}
};
//анимация при скролле
const animItems = document.querySelectorAll('._anim-items');//этот класс добавляется к анимируемым объектам
if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight; //высота объекта
			const animItemoffset = offset(animItem).top; //позиция объекта относительно верха
			const animStart = 4; //регулирует момент старта анимации, в данном случае при скролле 1/4 от высоты объекта

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > animItemoffset - animItemPoint) && scrollY < (animItemoffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) { //этот класс для того, чтобы не запускать анимацию повторно и не убирать класс _active
					animItem.classList.remove('_active');
				}
			}
		}
	}
	setTimeout(() => { //Если есть анимации на верхнем блоке, она покакжется без скролла через 0.3 сек
		animOnScroll();
	}, 300);
}
//Popups
//у попапа должен быть id с его названием, а у кнопки, по которой он открывается href='#{название поп-апа}'
let popupLink = document.querySelectorAll('._popup-link'); //этот класс добавляется ко всем кнопкам, на которых открывается поп-ап
const lockPadding = document.querySelectorAll('.lock-padding'); //Этот класс добавляется к фиксированным объектам, например к шапке
if (popupLink.length > 0) {
	for (let index = 0; index < popupLink.length; index++) {
		const el = popupLink[index];
		el.addEventListener('click', function (e) {
			let popupName = el.getAttribute('href').replace('#', '');
			let curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}
let popupCloseIcon = document.querySelectorAll('.popup__close');//этот класс добавляется для крестика, по которому поп-ап закрывается
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			e.stopPropagation();
			if (menuBody.classList.contains('_active')) {
				popupClose(el.closest('.popup'), false);
			} else {
				popupClose(el.closest('.popup'));
			}
			e.preventDefault();
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		const popup_active = document.querySelector('.popup._active');
		if (menuBody.classList.contains('_active')) {
			popupClose(popup_active, false);
		} else {
			popupClose(popup_active);
		}
	}
});


// Cтоимость закза в корзине
//Стоимость попап заказа
const arrowsMore = document.querySelectorAll('.form-cart-list__amount-more');
const arrowsLess = document.querySelectorAll('.form-cart-list__amount-less');
const arrowsInput = document.querySelectorAll('.form-cart-list__amount-input');
const gramSelect = document.querySelector('.form-popup__gram-select');
let finPrices = document.querySelectorAll('.cart-list__price span');
let price; //В этой переменной будет стоимость заказа
// if (gramSelect != null) {
// 	priceFunc();
// 	gramSelect.addEventListener('change', function () { //Событие при выборе опшинов
// 		priceFunc();
// 	})
// }
if (arrowsMore.length > 0 && arrowsLess.length > 0 && arrowsInput.length > 0) {
	// Делаем кнопки кликабельными, устанавливаем макс и мин кол-во порций
	arrowsMore.forEach(arrowMore => {
		arrowMore.addEventListener('click', function () {
			++(arrowMore.previousElementSibling.value);
			if (arrowMore.previousElementSibling.value > 100) {
				arrowMore.previousElementSibling.value = 100;
			}
			//priceFunc();	
		})
	});

	arrowsLess.forEach(arrowLess => {
		arrowLess.addEventListener('click', function () {
			--(arrowLess.nextElementSibling.value);
			if (arrowLess.nextElementSibling.value < 0) {
				arrowLess.nextElementSibling.value = 0;
			}
			//priceFunc();
		})
	});
	arrowsInput.forEach(arrowInput => {
		arrowInput.addEventListener('keyup', function () {
			if (arrowInput.value < 0) {
				arrowInput.value = 0;
			} else if (arrowInput.value > 100) {
				arrowInput.value = 100;
			}
			//priceFunc();
		})
	});


}
//*< Функции>==========================================================================================
//Закрывает меню бургер
function menu_close() {
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
	bodyUnLock();
}
//Функция считает и выводит стоимость заказа
// function priceFunc() {
// 	//коллекция всех опшинов
// 	const gramOptions = gramSelect.children;
// 	for (let index = 0; index < gramOptions.length; index++) {
// 		// перебираем опшины и находим выбранный
// 		if (gramOptions[index].value == gramSelect.value) {
// 			// у выбранного опшина берем значение data атрибута (в нем стоимость) и умножаем на кол-во
// 			price = +(gramOptions[index].dataset.price) * +(arrowInput.value);
// 			finPrice.innerHTML = price;
// 		}
// 	}
// }
// Добавляет/удаляет товары в корзину
// При удалении в выхове функции надо 3 параметром указать false
function updateCart(productButton, productId, productAdd = true) {
	const cart = document.querySelector('.cart-header');
	const cartIcon = cart.querySelector('.cart-header__icon');
	const cartQuantity = cartIcon.querySelector('span');
	const cartProduct = document.querySelector(`[data-cart-pid='${productId}']`);
	const cartList = document.querySelector('.cart-list');
	// Добавление товара
	if (productAdd) {
		// Если спан существует, мы увеличиваем его значение на единицу
		if (cartQuantity) {
			cartQuantity.innerHTML = ++cartQuantity.innerHTML;
		} else { //Если спана нет, добавляем его со значением 1
			cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`)
		}
		// Если в карзине нет товара, на котрый мы нажимаем, мы добавляем его, используя контент оригинального товара
		if (!cartProduct) {
			const product = document.querySelector(`[data-pid='${productId}']`);
			const cartProductImage = product.querySelector('.item-product__image').innerHTML;
			const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
			// Пишем HTML код внутренностей карточки товара
			const cartProductContent = `
		<a href="" class="cart-list__image _ibg">${cartProductImage}</a>
		<div class="cart-list__body">
			<a href="" class="cart-list__title">${cartProductTitle}</a>
			<div class="cart-list__quantity">Quantity: <span>1</span></div>
			<a href="" class="cart-list__delete">Delete</a>
		</div>`;
			// Добавляем в конец списка пункт, внутри которого предыдущий HTML код
			cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid='${productId}' class='cart-list__item'>${cartProductContent}</li>`);
			_ibg();
		} else {
			// Если в корзине уже есть добавляемый товар, тогда увеличиваем значение в спане
			const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span')
			cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
		}
		// После всех действий отбираем класс холд у кнопки добавления в корзину, чтобы можно было еще добавить этот в корзину
		productButton.classList.remove('_hold');
	} else {
		const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
		cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
		if (!parseInt(cartProductQuantity.innerHTML)) {
			cartProduct.remove();
		}
		const cartQuantityValue = --cartQuantity.innerHTML;

		if (cartQuantityValue) {
			cartQuantity.innerHTML = cartQuantityValue;
		} else {
			cartQuantity.remove();
			cart.classList.remove('_active');
		}
	}
}
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
//Прокрутка к началу строници
function scrollTop(e) {
	e.preventDefault();
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});
};
function scrollToBlock(block) { //в скобки передаем блок, до которого надо докрутить
	let getTop = block.getBoundingClientRect().top;
	let getTopDocument = getTop + window.scrollY;
	window.scrollTo({
		top: getTopDocument,
		left: 0,
		behavior: "smooth",
	});
};
//эта функция точно узнает местоположение объекта.Можно получить значение сверху и слева
function offset(el) { //в скобках объект, чье местоположение нужно
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.scrollX || document.documentElement.scrollLeft,
		scrollTop = window.scrollY || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
//Открывает поп-ап
function popupOpen(curentPopup) { //В скобках попап, который надо открыть (найти его можно по айди)
	if (curentPopup && unlock) {
		let _activePopup = document.querySelector('.popup._active');
		if (_activePopup) {
			popupClose(_activePopup, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('_active');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				e.stopPropagation();
				if (menuBody.classList.contains('_active')) {
					popupClose(e.target.closest('.popup'), false);
				} else {
					popupClose(e.target.closest('.popup'));
				}
			}
		});
	}
}
//Закрывает поп-ап
function popupClose(item, doUnlock = true) { //в скобках поп-ап, который надо закрыть и надо ли разблокировать прокрутку
	if (unlock) {
		item.classList.remove('_active');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
//Блокирует прокрутку
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
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			if (message) {
				popup_open(message + '-message');
			}
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}
	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

//viewPass
let viewPass = document.querySelectorAll('._viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classList.toggle('_active');
	});
}

//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.code === 'Escape') {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div hidden class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const selectTitle = select.querySelector('.select__title');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	selectTitle.addEventListener('click', function (e) {
		selectItemActions();
	});

	function selectMultiItems() {
		let selectedOptions = select.querySelectorAll('.select__option');
		let originalOptions = original.querySelectorAll('option');
		let selectedOptionsText = [];
		for (let index = 0; index < selectedOptions.length; index++) {
			const selectedOption = selectedOptions[index];
			originalOptions[index].removeAttribute('selected');
			if (selectedOption.classList.contains('_selected')) {
				const selectOptionText = selectedOption.innerHTML;
				selectedOptionsText.push(selectOptionText);
				originalOptions[index].setAttribute('selected', 'selected');
			}
		}
		select.querySelector('.select__value').innerHTML = '<span>' + selectedOptionsText + '</span>';
	}
	function selectItemActions(type) {
		if (!type) {
			let selects = document.querySelectorAll('.select');
			for (let index = 0; index < selects.length; index++) {
				const select = selects[index];
				const select_body_options = select.querySelector('.select__options');
				if (select != select_item.closest('.select')) {
					select.classList.remove('_active');
					_slideUp(select_body_options, 100);
				}
			}
			_slideToggle(select_body_options, 100);
			select.classList.toggle('_active');
		}
	}
	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value && !original.hasAttribute('multiple')) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				if (original.hasAttribute('multiple')) {
					select_option.classList.toggle('_selected');
					selectMultiItems();
				} else {
					select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
					original.value = select_option_value;
					select_option.style.display = 'none';
				}
			}
			let type;
			if (original.hasAttribute('multiple')) {
				type = 'multiple';
			}
			selectItemActions(type);
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.innerHTML;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				if (input.getAttribute('data-type') === "pass") {
					if (input.parentElement.querySelector('._viewpass')) {
						if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
							input.setAttribute('type', 'password');
						}
					} else {
						input.setAttribute('type', 'password');
					}
				}
				if (input.classList.contains('_date')) {
					/*
					input.classList.add('_mask');
					Inputmask("99.99.9999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
					*/
				}
				if (input.classList.contains('_phone')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask("+375 (99) 9999999", {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_digital')) {
					input.classList.add('_mask');
					Inputmask("9{1,}", {
						"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
			if (input.classList.contains('_date')) {
				const calendarItem = datepicker(input, {
					customDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
					customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
					overlayButton: 'Применить',
					overlayPlaceholder: 'Год (4 цифры)',
					startDay: 1,
					formatter: (input, date, instance) => {
						const value = date.toLocaleDateString()
						input.value = value
					},
					onSelect: function (input, instance, date) {
						input_focus_add(input.el);
					}
				});
				const dataFrom = input.getAttribute('data-from');
				const dataTo = input.getAttribute('data-to');
				if (dataFrom) {
					calendarItem.setMin(new Date(dataFrom));
				}
				if (dataTo) {
					calendarItem.setMax(new Date(dataTo));
				}
			}
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//RANGE
const priceSlider = document.querySelector('.price-filter__slider');
if (priceSlider) {

	let textFrom = priceSlider.getAttribute('data-from');
	let textTo = priceSlider.getAttribute('data-to');

	noUiSlider.create(priceSlider, {
		start: [0, 200000],
		connect: true,
		tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
		range: {
			'min': [0],
			'max': [200000]
		}
	});

	/*
	const priceStart = document.getElementById('price-start');
	const priceEnd = document.getElementById('price-end');
	priceStart.addEventListener('change', setPriceValues);
	priceEnd.addEventListener('change', setPriceValues);
	*/

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if (priceStart.value != '') {
			priceStartValue = priceStart.value;
		}
		if (priceEnd.value != '') {
			priceEndValue = priceEnd.value;
		}
		priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
	}
}