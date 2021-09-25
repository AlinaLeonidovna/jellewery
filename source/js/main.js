'use strict';

(function () {
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
