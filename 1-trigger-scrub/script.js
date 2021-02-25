gsap.registerPlugin(ScrollTrigger);

gsap.to("#square-two", {
	x: 500, // pixels
	background: "red",
	rotate: "180deg",
	duration: 3, // seconds
	scrollTrigger: {
		trigger: "#square-one",
		endTrigger: "#square-three",
		start: "bottom center", // relative-the-element, relative-to-the-page
		end: "bottom 300px", // top/bottom/center/px/%
		toggleActions: "restart complete reverse resume", // onEnter onLeave onEnterBack onLeaveBack
		// start_scroller-start: onEnter
		// end_scroller-end: onLeave
		// end_scroller-end(reverse-scrolling): onEnterBack
		// start_scroller-start(reverse-scrolling): onLeaveBack
		markers: true,
		scrub: true, // duration doesn't matter anymore
		onEnter: function () {
			console.log("enter");
		},
		// onLeave, onEnterBack, onLeaveBack
		onUpdate: function (event) {
			console.log(event.progress); // every time you move the scroll bar a little bit
		},
	},
});
