'use strict';

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// METHODS
// SELECTING ELEMENTS
// console.log(document.documentElement); // entirety of the page
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections); // returns iterable Node List -- not a live collection

document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
// console.log(allButtons); // returns an HTMLCollection -- A LIVE COLLECTION

// console.log(document.getElementsByClassName('btn')); // an HTMLCollection

// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML

const message = document.createElement('div'); // creates a DOM element and stores it
// is not on the DOM -- you have to build it and then insert it into the DOM, after
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button>';

// header.prepend(message); // prepend == first child of the parent node (head)

// header.append(message); // append == last child of the parent node
// the message element is a LIVE ELEMENT, so it only appears once on the DOM -- above, it was moved from first child to last child
// prepend and append can be used to move things around

// insert an element into multiple positions by cloning the element
// header.append(message.cloneNode(true));

// header.before(message);
header.after(message);

// DELETING/REMOVING ELEMENTS from the DOM -- updated
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

/* older way: DOM Traversal
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.parentElement.removeChild(message);
  });
*/

// STYLES, ATTRIBUTES, AND CLASSES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
// get saved as INLINE STYLES on the elements in the DOM
// console.log(message.style.backgroundColor); // rgb(55, 56, 61)
// can get the inline styles this way
// can get the CSS styles from the DOM this way:
// console.log(getComputedStyle(message).color); // rgb(187, 187, 187)
// console.log(getComputedStyle(message).height); // 50px
// manipulate computed styles on the DOM
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// CSS CUSTOM PROPERTIES -- CSS variables
// :root === document element (document.documentElement)
document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES of elements -- standard attributes inherit methods and properties
const logo = document.querySelector('.nav__logo');
// console.log(logo.alt); // Bankist logo

// absolute path vs relative path (image src and link href)
// console.log(logo.src); // http://127.0.0.1:8080/img/logo.png
// console.log(logo.getAttribute('src')); // img/logo.png

// console.log(logo.className);

// non-standard attribute
// console.log(logo.designer); // undefined
// console.log(logo.getAttribute('designer')); // "Jonas"

// SET ATTRIBUTES
logo.alt = 'Beautiful minimalist logo';
// console.log(logo.alt); // Beautiful minimalist logo
logo.setAttribute('company', 'Bankist');

// DATA ATTRIBUTES -- store data in the HTML code
// console.log(logo.dataset.versionNumber); // 3.0
logo.dataset.trial = 1.0;
// console.log(logo.dataset); // DOMStringMap {versionNumber: "3.0", trial: "1"}

// CLASSES
/*
logo.classList.add()
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

Don't use: logo.className = 'name' // overwrites all existing classes on the node
*/

// GETTING COORDINATES
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log('s1coords ', s1coords);
  // the sections position relative to the viewport
  /*
    DOMRect {x: 0, y: 222, width: 1395, height: 1558.5, top: 222, …}
    bottom: 1780.5
    height: 1558.5
    left: 0
    right: 1395
    top: 222
    width: 1395
    x: 0
    y: 222
    __proto__: DOMRect
  */
  // console.log(e.target.getBoundingClientRect());
  // the buttons position relative to the visible viewport
  /*
    DOMRect {x: 122.5, y: 80.484375, width: 112.46875, height: 29, top: 80.484375, …}
    bottom: 109.484375
    height: 29
    left: 122.5
    right: 234.96875
    top: 80.484375
    width: 112.46875
    x: 122.5
    y: 80.484375
    __proto__: DOMRect
  */
  // console.log('Current scroll (X/Y) ', window.pageXOffset, pageYOffset);
  // the scroll position relative to entire page in DOM

  // console.log(
  //   'height/width of viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // the size in H x W of the viewport

  // SCROLLING -- takes (left + current X scroll position, top + current Y scroll position)
  // window.scrollTo(s1coords.left, s1coords.top); // relative to viewport, not page!
  // position relative to page:
  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  */

  // Smooth scrolling -- old school
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // for modern browsers:
  section1.scrollIntoView({ behavior: 'smooth' });
});

// EVENTS -- a signal generated by a DOM node
// event signals are always generated, even if we are not listening for them!
// old school
/*
h1.onmouseenter = function (e) {
 alert('onmouseenter: Great! You are reading the heading.');
};
*/

/*
  DO NOT USE:
  can make it inline as an attribute <h1 onclick="alert('HTML inline alert')">...</h1>
*/
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  // alert('addEventListener: Great! You are reading the heading.');
  // make it only happen once -- can be anywhere in code, even on a timer (below)
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 8000);

// PROCESS OF MOST EVENTS -- event PROPAGATION: Bubbling and Capturing
// CAPTURING PHASE
// on a 'click', the event is generated at the root of the document, top of DOM tree
// event then travels down the tree, through each parent element until it reaches TARGET
// TARGET PHASE
// target identified
// BUBBLING PHASE
// the EVENT LISTENER fires off its callback function
// then the event bubbles back up to the root
// THE EVENT "HAPPENS" IN EVERY PARENT OF THE TARGET ELEMENT
// SO, THE EVENT CAN BE HANDLED IN MULTIPLE PLACES
// Example:
// rgb(255, 255, 255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('LINK Clicked ', e.target); // e.target is always the same element
  // console.log('LINK Clicked ', e.currentTarget);
  // specific to the element firing -- .nav__link -- same a "this"

  // CAN STOP THE PROPAGATION -- can stop it at any level of the bubbling up the tree
  // not often a good idea
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('LINK parent container ', e.target); // e.target same as above
  // console.log('LINK parent container ', e.currentTarget);
  // specific to the element firing -- .nav__links -- same a "this"
  // e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('nav', e.target); // e.target same as above
  // console.log('nav', e.currentTarget);
  // specific to the element firing -- .nav -- same a "this"
});

// EVENT LISTENERS can be fired off during the CAPTURING PHASE
// reverse the order of the bubbling events using the 'true' flag at the end
// rarely used
/*
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
 // console.log('nav', e.target); // e.target same as above
 // console.log('nav', e.currentTarget);
  // specific to the element firing -- .nav -- same a "this"
},
  true
);
*/

// Page Navigation
// old way -- inefficient, multiple copies of forEach function
/* 
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/
// Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
// 3. Make matching strategy -- does element have class needed?
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // the matching strategy:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //  console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// DOM TRAVERSAL
// Children -- moving downwards
// console.log(h1.querySelectorAll('.highlight')); // NodeList(2) [span.highlight, span.highlight]
// Child Nodes -- any object
// console.log(h1.childNodes); // NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// Direct Children -- elements
// console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight] -- LIVE ELEMENT
// console.log(h1.firstElementChild); // <span class="highlight">banking</span>
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Parents -- moving upwards
// console.log(h1.parentNode); // this one and the next return the same thing
// console.log(h1.parentElement);
// IMPORTANT!
// closest parent element with class == header
h1.closest('.header').style.background = 'var(--gradient-secondary)';
// can be itself
h1.closest('h1').style.background = 'var(--gradient-primary)';

// Siblings -- moving sideways
// can only access the previous and the next sibling
// elements
// console.log(h1.previousElementSibling); // null
// console.log(h1.nextElementSibling); // <h4>A simpler banking experience for a simpler life.</h4>

// any sibling
// console.log(h1.previousSibling); // #text
// console.log(h1.nextSibling); // #text

// All siblings is done by getting Parent, then its children
// console.log(h1.parentElement.children);
// HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// TAB COMPONENT
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // Matching strategy -- button and child span gives button as result
  const clicked = e.target.closest('.operations__tab');

  // Guard clause - container clicked, no self or parent with .operations__tab clicked
  if (!clicked) return;

  // Set active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Set active content
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// PASSING ARGUMENTS INTO EVENT HANDLER FUNCTIONS
// MENU FADE ANIMATION
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// mouseenter does not bubble up -- mouseover does, and we need that
// opposites are mouseleave and mouseout

// bind returns a functions, which is expected by addEventListener
// bind makes the parameter value the "this" in the called method, handleHover
// to pass multiple values as this, use an array or object
// usually, this == e.currentTarget, but not in this case;
// e.currentTarget remains.nav element
// only the event itself is ever the argument passed into an event listener
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// STICKY NAVIGATION
// after scrolling down a certain distance, the nav "sticks" to the top of the viewport
// Using scroll event -- DON'T USE -- inefficient, fires tons of events
// very bad performance on mobile
const initialCoords = section1.getBoundingClientRect(); // find current to
/*
window.addEventListener('scroll', function () {
  // console.log(window.scrollY); // top of viewport to the top of the page
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
*/

// INTERSECTION OBSERVER API
// observes changes of target element intersecting with other elements & viewport

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    // console.log(entry);
  });
};
// can take entries and observer object as parameters
// entries is an array of threshold entries

const obsOptions = {
  root: null,
  threshold: 0.1,
};

const obsOptions2 = {
  root: null,
  threshold: [0, 0.2],
};
// root: <element> -- null observes target element's intersections of entire viewport
// root: is the element we watch the target element intersecting with
// threshold: percent -- % of intersection between root element & target element that triggers the callback
// callback fires when isIntersecting == true, both when entering the condition and when exiting the condition
// when an array of two values, callback fires on both conditions == true when entering the conditions and when exiting the conditions -- can be more than 2

// const observer = new IntersectionObserver(obsCallback, obsOptions); // takes callback & options object
const observer2 = new IntersectionObserver(obsCallback, obsOptions2);

// observer.observe(section1);
observer2.observe(section1);

// whenever section1 is intersecting the viewport (root) at 10% (threshold), the callback function is called -- whether we are scrolling up or down
// fires when section 1 enters or leaves the viewport
// intersectionRation is at 0.1...
// fires on both isIntersecting true && false w/in || w/out 10 %
/*
IntersectionObserverEntry {time: 7510.365000000093, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
  boundingClientRect: DOMRectReadOnly {x: 0, y: 420, width: 1395, height: 1559, top: 420, …}
  intersectionRatio: 0.1007055789232254
  intersectionRect: DOMRectReadOnly {x: 0, y: 420, width: 1395, height: 157, top: 420, …}
  isIntersecting: true
  isVisible: false
  rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1395, height: 577, top: 0, …}
  target: section#section--1.section
  time: 7510.365000000093
  __proto__: IntersectionObserverEntry
*/

// so, when should the nav become sticky?
// when the header moves completely out of view, display nav "sticky"
const stickyNav = function (entries) {
  const [entry] = entries; // destructing for single, first threshold array element
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
// console.log('navHeight ', navHeight);

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
// rootMargin == box of x pixels around the target element
// negative value is x pixels above target element and positive is x pixels below
// 90px in this case is the height of the nav
// rootMargin can be hardcoded or determined dynamically (which is way better, responsive design)

// REVEAL SECTIONS ANIMATION UPON SCROLLING USING INTERSECTION OBSERVER
// uses .section--hidden

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log('entry ', entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // once they've been observed, turn the observer off -- performance+
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //  section.classList.add('section--hidden');
});

// IMAGES -- BIGGEST PERFORMANCE IMPACT ON WEB PAGES
// LAZY LOADING
// actually two images -- a small one and the real one; replace source; remove blur filter
// HTML:
/*
    <img
      src="img/digital-lazy.jpg"
      data-src="img/digital.jpg"
      alt="Computer"
      class="features__img lazy-img"
    />
*/
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // loads new image, emitting "load" event

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
// rootMargin loads images before user scrolls the blurred images into view port

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER
/* make slider smaller & all slides visible for development
const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.3) translateX(-1200px)';
slider.style.overflow = 'visible';
*/
// Put slider code in a single function, prevent pollution of global namespace

const slider = function () {
  // Element Variables
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length - 1;
  let curSlide = 0;

  // curSlide == 0: 0%, 100%, 200%, 300%
  // curSlide = 1: -100%, 0%, 100%, 200%
  // curSlide = 2: -200%, -100%, 0%, 100%
  // position on the X-axis (translateX(<num>%))
  // overflow hidden allows only slide at 0% to be viewed

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // activate active dot
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // INIT
  const init = function () {
    goToSlide(curSlide);
    createDots();
    activateDot(curSlide);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    //  console.log(e); // key: "ArrowRight" ; key: "ArrayLeft"
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    // console.log('clicked a dot');
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// DOM LIFECYCLE EVENTS
// document (DOM)
// DOMContentLoaded -- fires when HTML & scripts are loaded; doesn't wait for images, etc.
// DOMContentLoaded is "document.ready" in jQuery
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOMContentLoaded -- HTML parsed & DOM tree built! ', e);
});
// window (browser)
// load -- fires when everything is loaded, images, scripts, etc.
window.addEventListener('load', function (e) {
  console.log('window load -- Page fully loaded ', e);
});
// beforeunload -- only use if data will be lost by leaving now
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log('window beforeunload -- before page is left ', e);
//   e.returnValue = ' ';
// });

// WAYS OF LOADING JAVASCRIPT FILES -- DEFER, ASYNC SCRIPT LOADING
// at end of body
// in head with either defer or async
// defer is usually best -- scripts execute in order, are executed after HTML is fully parsed, DOMContendLoaded event fires after script execution...
// async is good for 3rd-party scripts where order doesn't matter
