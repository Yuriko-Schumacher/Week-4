gsap.registerPlugin(ScrollTrigger);

gsap.to("#square-two", {
	scrollTrigger: {
		trigger: "#square-one",
		endTrigger: "#square-three",
		start: "top 100px",
		end: "bottom 300px",
		markers: true,
		scrub: 1, // seconds
		pin: "#square-two", // won't scroll up until the trigger ends
		pinSpacing: false, // won't be a lot of spaces
	},
	x: 500,
	rotate: "360deg",
});
