// gsap doesn't come with scroll trigger
// so we need to add this plugin manually
gsap.registerPlugin(ScrollTrigger);

// creating a trigger
gsap.to('#square-two', {
    scrollTrigger: {
        trigger: '#square-two',
        start: 'top center',
        end: `bottom 300px`,
        markers: true,
        toggleActions: 'play reverse none none',
        // onEnter onLeave onEnterBack onLeaveBack
        // possible values: play, restart, reverse, resume, complete, none
        // scrub: 3
        // this property makes the animation connected to the scrollbar
    },
    x: 500,
    duration: 1
});

