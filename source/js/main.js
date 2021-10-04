'use strict';

(function () {

  // menu
  var page = document.querySelector('.page');
  var header = page.querySelector('.header');
  var menuToggle = header.querySelector('.header__menu-toggle');
  var navigation = header.querySelector('.navigation');
  var loginLink = navigation.querySelector('.navigation__link--login');

  header.classList.add('header--menu-closed');
  menuToggle.classList.add('header__menu-toggle--closed');
  navigation.classList.add('navigation--closed');

  var closeMenu = function () {
    if (header.classList.contains('header--menu-opened')) {
      page.classList.remove('page--no-scroll');
      header.classList.remove('header--menu-opened');
      header.classList.add('header--menu-closed');
      menuToggle.classList.remove('header__menu-toggle--opened');
      menuToggle.classList.add('header__menu-toggle--closed');
      navigation.classList.remove('navigation--opened');
      navigation.classList.add('navigation--closed');

      header.removeEventListener('click', onNavigationClick);
      loginLink.removeEventListener('focusout', onLoginLinkFocusout);
      document.removeEventListener('keydown', onOpenMenuEscPress);
    }
  };

  var openMenu = function () {
    if (header.classList.contains('header--menu-closed')) {
      page.classList.add('page--no-scroll');
      header.classList.add('header--menu-opened');
      header.classList.remove('header--menu-closed');
      menuToggle.classList.add('header__menu-toggle--opened');
      menuToggle.classList.remove('header__menu-toggle--closed');
      navigation.classList.add('navigation--opened');
      navigation.classList.remove('navigation--closed');

      header.addEventListener('click', onNavigationClick);
      loginLink.addEventListener('focusout', onLoginLinkFocusout);
      document.addEventListener('keydown', onOpenMenuEscPress);
    }
  };

  var onOpenMenuEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMenu();
    }
  };

  var onToggleMenuClick = function () {
    if (header.classList.contains('header--menu-opened')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  var onFocusCange = function () {
    if (!document.activeElement.closest('.header')) {
      menuToggle.focus();
    }

    document.removeEventListener('focusin', onFocusCange);
  };

  var onLoginLinkFocusout = function () {
    document.addEventListener('focusin', onFocusCange);
  };

  var onNavigationClick = function (evt) {
    if ((evt.target.closest('a[href]') || evt.target.closest('.header')) && evt.target !== menuToggle) {
      closeMenu();
    }
  };

  menuToggle.addEventListener('click', onToggleMenuClick);

  // popup login

  var body = document.querySelector('.page');
  var loginLinks = document.querySelectorAll('.link-login');
  var popupLogin = document.querySelector('.popup-login');

  if (popupLogin) {
    var popupBox = popupLogin.querySelector('.popup-login__wrapper');
    var closeLogin = popupLogin.querySelector('.popup-login__close-btn');

    var popupForm = popupLogin.querySelector('.popup-login__form');
    var popupEmail = popupLogin.querySelector('#email-popup');
    var popupPassword = popupLogin.querySelector('#password');

    var isStorageSupport = true;
    var storageEmail = '';

    try {
      storageEmail = localStorage.getItem('email');
    } catch (err) {
      isStorageSupport = false;
    }

    var openPopup = function (link, currentPopup) {
      link.addEventListener('click', function (evt) {
        evt.preventDefault();
        currentPopup.classList.add('popup-login--open');
        body.classList.add('page--no-scroll');

        popupEmail.focus();

        if (storageEmail) {
          popupEmail.value = storageEmail;
        }
      });
    };

    for (var h = 0; h < loginLinks.length; h++) {
      openPopup(loginLinks[h], popupLogin);
    }

    closeLogin.addEventListener('click', function (evt) {
      evt.preventDefault();
      popupLogin.classList.remove('popup-login--open');

      if (header.classList.contains('header--menu-closed')) {
        body.classList.remove('page--no-scroll');
      }
    });

    popupForm.addEventListener('submit', function (evt) {
      if (!popupEmail.value || !popupPassword.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('email', popupEmail.value);
        }
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (popupLogin.classList.contains('popup-login--open')) {
          evt.preventDefault();
          popupLogin.classList.remove('popup-login--open');

          if (body.classList.contains('header--menu-closed')) {
            body.classList.remove('page--no-scroll');
          }
        }
      }
    });

    popupLogin.addEventListener('click', function (evt) {
      if (evt.target !== popupBox) {
        popupLogin.classList.remove('popup-login--open');

        if (header.classList.contains('header--menu-closed')) {
          body.classList.remove('page--no-scroll');
        }
      }
    });

    popupBox.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }

  // filter

  var filter = document.querySelector('.filter');
  var filterOpen = document.querySelector('.filter__open-filter-btn');
  var filterClose = document.querySelector('.filter__close-btn');

  if (filter) {
    filterOpen.addEventListener('click', function () {
      if (filter.classList.contains('filter--open')) {
        filter.classList.remove('filter--open');
      } else {
        filter.classList.add('filter--open');
      }
    });

    filterClose.addEventListener('click', function (evt) {
      evt.preventDefault();

      filter.classList.remove('filter--open');
    });
  }

  // accordion

  var accordions = document.querySelectorAll('.accordion');

  var addSwitch = function (block) {
    var switcher = block.querySelector('.accordion__switch');
    var title = block.querySelector('.accordion__title span');

    var closePopup = function (evt) {
      if (block.classList.contains('accordion--open')) {
        evt.stopPropagation();

        block.classList.remove('accordion--open');

        switcher.removeEventListener('click', closePopup);
        title.removeEventListener('click', closePopup);
      }
    };

    block.addEventListener('click', function () {
      block.classList.add('accordion--open');

      switcher.addEventListener('click', closePopup);
      title.addEventListener('click', closePopup);
    });
  };

  if (accordions) {
    for (var j = 0; j < accordions.length; j++) {
      accordions[j].classList.remove('accordion--nojs');

      addSwitch(accordions[j]);
    }
  }
})();

(function () {
  var slider = document.querySelector('.swiper-container');

  if (slider) {
    // eslint-disable-next-line no-new
    // eslint-disable-next-line no-undef
    var swiper = new Swiper('.swiper-container', {
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
            },
          },
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
      },
    });
    swiper.slideNext();
  }
}());
