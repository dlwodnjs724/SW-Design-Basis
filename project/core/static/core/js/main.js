// swiper.js
// var swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1,
//   loop: true,
//   speed: 1500,
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

var swiperH = new Swiper('.swiper-container-h', {
  loop: true,
  speed: 1500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination-h',
    type: 'progressbar',
  },
  simulateTouch: false,
});

var swiperV = new Swiper('.swiper-container-v', {
  direction: 'vertical',
  slidesPerView: 1,
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination-v',
    clickable: true,
  },
  // simulateTouch: false,
});

// typed.js
var typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 40,
  backSpeed: 40,
  backDelay: 1000,
  loop: true,
  loopCount: Infinity,
});