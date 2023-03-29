const burgerEl = document.querySelector('.burger');
const duration = 0.3;


// Tweens

// Burger tween
const burgerTl = gsap.timeline()
    .to('.burger__line--top', { yPercent: 250, duration})
    .to('.burger__line--mid', {opacity: 0, duration}, '<')
    .to('.burger__line--bot', {yPercent: -250, duration}, '<')
    .to('.burger', {rotation: 360, duration: duration})
    .to('.burger__line--top', {rotation: 45, transformOrigin: 'center center', duration})
    .to('.burger__line--bot', {rotation: -45, transformOrigin: 'center center', duration}, '<')

burgerEl.addEventListener('mouseover', () => {
    const burgerLines = gsap.utils.toArray('.burger__line').forEach(line => {
        gsap.fromTo(line, {scaleX: 0, duration}, {scaleX: 1, duration})
    })
})

burgerEl.addEventListener('click', () => {
    burgerTl.reversed(!burgerTl.reversed());
})