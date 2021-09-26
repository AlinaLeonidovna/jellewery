'use strict';

(function () {
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
