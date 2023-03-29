const burgerEl = document.querySelector('.burger');
const duration = 0.3;


// Tweens

// Burger tween
const burgerTl = gsap.timeline({ paused: true, reversed: true })
    .to('.burger__line--top', { yPercent: 250, duration})
    .to('.burger__line--mid', {opacity: 0, duration}, '<')
    .to('.burger__line--bot', {yPercent: -250, duration}, '<')
    .to('.burger', {rotation: 360, duration: duration})
    .to('.burger__line--top', {rotation: 45, transformOrigin: 'center center', duration})
    .to('.burger__line--bot', {rotation: -45, transformOrigin: 'center center', duration}, '<')


// Nav Tween
const navTl = gsap.timeline({ paused: true, reversed: true, ease: 'power4.inOut'})
    .fromTo('.nav', {xPercent: 100, duration }, {xPercent: 0, duration})
    .fromTo('.nav__overlay', {scaleX: 0, duration}, {scaleX: 1, duration})
    .from('.nav__link', {y: -20, opacity: 0, duration, stagger: 0.1});

burgerEl.addEventListener('mouseover', () => {
    const burgerLines = gsap.utils.toArray('.burger__line').forEach(line => {
        gsap.fromTo(line, {scaleX: 0, duration}, {scaleX: 1, duration})
    })
})

burgerEl.addEventListener('click', () => {
    burgerTl.resume().reversed(!burgerTl.reversed());
    navTl.resume().reversed(!navTl.reversed());
    
})