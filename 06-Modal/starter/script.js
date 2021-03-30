'use strict';
// Adding and removing CSS Classes is basic for DOM manipulation
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');
// console.log(btnsShowModal);
const openModal = function () {
  console.log(`Open modal button clicked`);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
// Both declared functions and function expressions work as callbacks
const closeModal = function () {
  console.log(`Close modal button clicked or Escape key pressed.`);
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
function overlayCloseModal() {
  console.log(`Overlay close modal clicked.`);
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
// add EventListener/Handler to Show Modal... buttons
for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', openModal);
}
// add EventListener/Handler to Close Modal button w/ func expression
btnCloseModal.addEventListener('click', closeModal);
// add EventListener/Handler to Overlay close modal w/ declared func
overlay.addEventListener('click', overlayCloseModal);
// Keyboard Events are Global Events: keydown, keypress, keyup
document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
