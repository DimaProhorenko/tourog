const burgerEl = document.querySelector('.burger');
const followBtn = document.querySelector('.header__follow');
const duration = 0.3;


function animateHero() {
    const tl = gsap.timeline({ duration });
    tl.from('.header', {x: -200, opacity: 0})
      .from('.hero', {opacity: 0}, '<')

    return tl;
}


// Effects
gsap.registerEffect({
    name: 'overlaySlide',
    effect: (targets, config) => {
        console.log(targets);
        const tl = gsap.timeline({ paused: true, reversed: true, ease: 'power4.inOut'});
        tl.fromTo(targets[0], {xPercent: 100, duration }, {xPercent: 0, duration});
        tl.fromTo(targets[1], {scaleX: 0, duration}, {scaleX: 1, duration});
        return tl;
    }
})

// Timelines

// Burger Timeline
const burgerTl = gsap.timeline({ paused: true, reversed: true })
    .to('.burger__line--top', { yPercent: 250, duration})
    .to('.burger__line--mid', {opacity: 0, duration}, '<')
    .to('.burger__line--bot', {yPercent: -250, duration}, '<')
    .to('.burger', {rotation: 360, duration: duration})
    .to('.burger__line--top', {rotation: 45, transformOrigin: 'center center', duration})
    .to('.burger__line--bot', {rotation: -45, transformOrigin: 'center center', duration}, '<')


// Nav Timeline
// const navTl = gsap.timeline({ paused: true, reversed: true, ease: 'power4.inOut'})
//     .fromTo('.nav', {xPercent: 100, duration }, {xPercent: 0, duration})
//     .fromTo('.nav__overlay', {scaleX: 0, duration}, {scaleX: 1, duration})
//     .from('.nav__link', {y: -20, opacity: 0, duration, stagger: 0.1});
const navTl = gsap.effects.overlaySlide(['.nav', '.nav .overlay__bg']).from('.nav__link', {y: -20, opacity: 0, duration, stagger: 0.1});


// Follow timeline
const followTl = gsap.effects.overlaySlide(['.follow', '.follow .overlay__bg']).from('.follow__content', {opacity: 0, y: -50});



burgerEl.addEventListener('mouseover', () => {
    const burgerLines = gsap.utils.toArray('.burger__line').forEach(line => {
        gsap.fromTo(line, {scaleX: 0, duration}, {scaleX: 1, duration})
    })
})

burgerEl.addEventListener('click', () => {
    burgerTl.resume().reversed(!burgerTl.reversed());
    navTl.resume().reversed(!navTl.reversed());
    
})

followBtn.addEventListener('click', () => {
    console.log('click');
    followTl.resume().reversed(!followTl.reversed());
})


const heroTl = animateHero();



// Swiper
const heroSwiper = new Swiper('.hero__swiper', {
    loop: true,
    effect: 'creative',
    creativeEffect: {
        prev: {translate: [0, 0, -800]},
        next: {translate: ['100%', 0, 0]}
    },
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
})