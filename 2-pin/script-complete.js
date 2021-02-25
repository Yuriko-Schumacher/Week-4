gsap.registerPlugin(ScrollTrigger);

// gsap.to('#square-two', {
//     scrollTrigger: {
//         trigger: '#square-two',
//         start: 'top center',
//         end: `bottom 300px`,
//         markers: true,
//         toggleActions: 'play reverse none none',
//         // onEnter onLeave onEnterBack onLeaveBack
//         // possible values: play, restart, reverse, resume, complete, none
//         scrub: 1,
//         // this property makes the animation connected to the scrollbar
//         pin: true
//     },
//     x: 500,
//     duration: 1
// });


gsap.to('#square-two', {
    scrollTrigger: {
        trigger: '#square-one',
        endTrigger: '#square-three',
        start: 'top 100px',
        end: `bottom 300px`,
        markers: true,
        toggleActions: 'play reverse none none',
        // onEnter onLeave onEnterBack onLeaveBack
        // possible values: play, restart, reverse, resume, complete, none
        scrub: 1,
        // this property makes the animation connected to the scrollbar
        pin: '#square-two'
    },
    x: 500,
    duration: 1
});
