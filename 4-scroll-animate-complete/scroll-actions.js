gsap.registerPlugin(ScrollTrigger);

function ScrollActions () {

    this.dispatch = function(dispatch) {
        if (arguments.length > 0) {
            this._dispatch = dispatch;
            return this;
        }
        return this._dispatch;
    }

    this.addScrollTriggers = function () {

        // TO PIN THE BAR CHART
        gsap.to('#annotation-container', {
            scrollTrigger: {
                trigger: '#annotation-container',
                start: 'top bottom',
                end: `bottom bottom`,
                pin: '#bar-chart',
                pinSpacing: false,
                id: 'pinning',
                markers: false
            }
        });

        let elements = document.getElementsByClassName('annotation');
        elements = Array.from(elements);



        elements.forEach((ele, i) => {
            let eleId = ele.getAttribute('id');

            gsap.to(`#${eleId}`, {
                scrollTrigger: {
                    trigger: `#${eleId}`,
                    start: 'top 80%',
                    end: `bottom center`,
                    id: ele.getAttribute('id'),
                    onEnter: () => {
                        this._dispatch.call('changeState', this, ele.dataset.state);
                    },
                    onEnterBack: () => {
                        this._dispatch.call('changeState', this, ele.dataset.state);
                    },
                    markers: false
                },
                duration: 1
            });
        });
    }

}