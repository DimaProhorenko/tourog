gsap.registerPlugin(ScrollTrigger);

const burgerEl = document.querySelector('.burger');
const followBtn = document.querySelector('.header__follow');
const duration = 0.3;


function animateHero() {
    const tl = gsap.timeline({ duration });
    tl.fromTo('.header', {scaleX: 0,}, { scaleX: 1, transformOrigin: 'center left', ease: 'back.out(2.7)', duration})
      .from('.hero', {opacity: 0}, '<')

    return tl;
}

function animateTextOnScroll() {
    // Create and insert spans for each letter
    const animatedEls = document.querySelectorAll('.animated-text');
    animatedEls.forEach(el => { 
        const chars = el.innerText.split('');
        console.log(chars);
        el.innerHTML = '';
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerHTML = char.replace(' ', '&nbsp;');
            el.appendChild(charSpan);
        })
    })

    animatedEls.forEach(el => {
        const spans = el.querySelectorAll('span');
        console.log(spans);
        const parentSection = el.closest('.section');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom+=100 bottom',
                scrub: true,
                
            }

        });
        tl.from(spans, {
            y: 10,
            opacity: 0,
            duration,
            stagger: .1
        })
    })
}


function animateBeforeOnScroll() {
    const animatedEls = document.querySelectorAll('.animate-before');
    animatedEls.forEach(el => {
        const parent = el.closest('.section');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: parent,
                start: 'top bottom',
                end: 'bottom+=100 bottom',
                scrub: true,
                
            }
        });
        tl.to(el, {
            '--before-scale-x': 0,
        })
    })
}

function textRevealCircle() {
    const animatedEls = document.querySelectorAll('.animate-circle');
    animatedEls.forEach(el => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top+=150 bottom',
                end: 'bottom+=400 bottom',
                scrub: true,
                
            }
        });
        tl.to(el, {
            "--clip": "100%",
        })     
    })
}

function textReveal(className) {
    const animatedEls = document.querySelectorAll(className);
    animatedEls.forEach(el => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top+=150 bottom',
                end: 'bottom+=100 bottom',
                scrub: true,
                
            }
        });
        tl.to(el, {
            "--clip": "100%",
        })     
    })
}

function fadeRightOnScroll() {
    const targets = gsap.utils.toArray('.fade-right');
    targets.forEach(target => {
        gsap.effects.fadeRight(target, {
            scrollTrigger: {
                trigger: target,
                start: 'top+=150 bottom',
                end: 'bottom+=100 bottom',
                scrub: true,
                
            },
            duration: 5
        })
        
    })
}

function scale() {
    const targets = gsap.utils.toArray('.scale');
    targets.forEach(target => {
        gsap.from(target, {
            scale: 0,
            scrollTrigger: {
                trigger: target,
                start: 'top+=150 bottom',
                end: 'bottom+=100 bottom',
                scrub: true,
                
            }
        })
    })
}

// Effects
gsap.registerEffect({
    name: 'overlaySlide',
    effect: (targets, config) => {
        const tl = gsap.timeline({ paused: true, reversed: true, ease: 'power4.inOut'});
        tl.fromTo(targets[0], {xPercent: 100, duration }, {xPercent: 0, duration});
        tl.fromTo(targets[1], {scaleX: 0, duration}, {scaleX: 1, duration});
        return tl;
    }
})

gsap.registerEffect({
    name: 'fadeRight',
    effect: (targets, config) => {
       return gsap.from(targets, {x: '+=100', opacity: 0, scrollTrigger: config.scrollTrigger });
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
animateTextOnScroll();
// animateBeforeOnScroll();
textRevealCircle();
fadeRightOnScroll();
scale();

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