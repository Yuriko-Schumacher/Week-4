gsap.registerPlugin(ScrollTrigger);

function ScrollActions() {
	this.dispatch = function () {
		this._dispatch = dispatch;
		return this;
	};

	this.addScrollTriggers = function () {
		gsap.to("#annotation-container", {
			trigger: "#annotation-container",
			start: "top bottom",
			end: "bottom bottom",
			pin: "#bar-chart",
			pinSpacing: false,
			markers: true,
		});

		let elements = document.getElementsByClassName("annotations");
		elements = Array.from(elements);

		for (element in elements) {
			let elementId = elements[1].getAttribute("id");

			gsap.to(`#${elementId}`, {
				scrollTrigger: {
					trigger: `#${elementId}`,
					start: "top 80%",
					end: "bottom center",
					markers: true,
					onEnter: () => {
						this._dispatch.call(
							"changeState",
							this,
							elements[1].dataset.state
						);
					},
					onEnterBack: () => {},
				},
			});
		}
	};
}
