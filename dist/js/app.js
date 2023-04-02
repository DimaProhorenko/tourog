gsap.registerPlugin(ScrollTrigger);

const burgerEl = document.querySelector('.burger');
const followBtn = document.querySelector('.header__follow');
const preloader = document.querySelector('.preloader');
const duration = 0.3;
let preloaderRepeats = 0;
let pageLoaded = false;

// function createCharSpans2(targetClass) {
//     const animatedEls = document.querySelectorAll(targetClass);
//     let wordsArrs = [];
//     let chars = [];
//     animatedEls.forEach(el => {
//         wordsArrs.push(el.innerHTML.trim().split(' '));
//     })
//     // const w2 = animatedEls.map(el => el.innerHTML.trim().split(' '))

//     wordsArrs.forEach(arr => {

//     })

//     console.log(wordsArrs);
//     // console.log(w2);
// }

// createCharSpans2('.intro h2');

function createCharSpans(targetClass) {
    const animatedEls = document.querySelectorAll(targetClass);
    const returnChars = [];
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
}


function animateHero() {
    const tl = gsap.timeline({ duration });
    tl.fromTo('.header', {scaleX: 0,}, { scaleX: 1, transformOrigin: 'center left', ease: 'back.out(2.7)', duration})
      .from('.hero', {opacity: 0}, '<')

    return tl;
}

function animatePreloaderText() {
    createCharSpans('.preloader__text');
    const chars = gsap.utils.toArray('.preloader__text span');

    const tl = gsap.timeline();
    
    tl.to(chars, {
        y: '-=20',
        stagger: .1,
        repeat: -1,
        yoyo: true,
        duration: .4,
        onRepeat() {
            if (loaded) {
                preloaderRepeats += 1;
                if (preloaderRepeats > 2) {
                    preloaderTextTl.repeat(1).pause();
                    animatePreloaderPane();
                }
            }
        }
       
    } )
    return tl;
}

function animatePreloaderPane() {
    gsap.set('.preloader__pane', {transformOrigin: 'top left'})
    const tl =  gsap.timeline();
    tl.to('.preloader__pane', {  scaleX: 1 })
      .to('.preloader__pane', {width: '100%', backgroundColor: '#75dab4'})
      .to('.preloader__text', {opacity: 0}, '<')
      .set('.preloader__pane', {transformOrigin: 'center', position: 'absolute'})
      .to('.preloader__pane', {height: '100vh'})
      .to('.preloader', {xPercent: -100, duration: 1, ease: Power4.easeInOut})

    return tl;
}

function hidePreloaderText() {
    return gsap.to('.preloader__text', {opacity: 0})
}

function preloaderPaneGrow() {
    return gsap.to('.preloader__pane', {
        width: '100%',
    })
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
                end: 'bottom+=300 bottom',
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

function textFromBottom(className) {
    const animatedEls = document.querySelectorAll(className);
    animatedEls.forEach(el => {
        gsap.from(el, {y: '+= 15', opacity: 0, scrollTrigger: {
            trigger: el,
            start: 'top 80%',
        }})
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

function blockReveal(query) {
    const targets = gsap.utils.toArray(query);
    targets.forEach(target => {
        const tl = gsap.timeline({
            ease: Power4.easeInOut,
            scrollTrigger: {
                trigger: target,
                start: 'top bottom',
                end: 'top bottom',
                // toggleActions: 'restart none none reverse'
            }
        });
        tl.to(target, {'--scale-y': 1, ease: Power4.easeInOut})
            .to(target, {'--scale-x': 1})
            .set(target, {'--to': 'top right'})
            .to(target, {'--scale-x': 0})
            .to(target, {'--scale-y': 0})
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

const preloaderTl = gsap.timeline();
const preloaderTextTl = animatePreloaderText();
preloaderTl.add(preloaderTextTl);

const loadHeroTl = gsap.from('.hero', {opacity: 0})


// animateBeforeOnScroll();
textRevealCircle();
fadeRightOnScroll();
blockReveal('.animate-block');
textFromBottom('.text-from-bt');

const loadTl = gsap.timeline();
loadTl.add(preloaderTl);


window.addEventListener('DOMContentLoaded', () => {
    loaded = true;
})

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
});

const introSwiper = new Swiper('.intro__swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 50,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
    }
})