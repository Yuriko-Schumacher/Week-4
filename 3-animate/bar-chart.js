function BarChart() {
	// selection into which we are going to add the chart
	this.selection = function (selection) {
		// this: function itself, referring to itself
		this._selection = selection;
		return this; // returning itself
	};

	// size
	this.size = function (size) {
		this._size = size;
		return this;
	};

	// margins
	this.margins = function (margins) {
		this._margins = margins;

		if (!this._size) {
			console.error("Setup size before margins");
			return;
		}
		if (!this._selection) {
			console.error("Setup selection before margins");
			return;
		}

		this._containerSize = {
			w: this._size.w - margins.l - margins.r,
			h: this._size.h - margins.t - margins.b,
		};
		this._selection.attr(
			"transform",
			`translate(${margins.l}, ${margins.t})`
		);
		return this;
	};

	// data
	this.data = function (data) {
		this._data = data;
		return this;
	};

	this.selectedState = function (state) {
		this._selectedState = state;
		return this;
	};

	this.dispatch = function (dispatch) {
		this._dispatch = dispatch;
		this._dispatch.on("changeState", (state) => {
			console.log("state", this, state);
			this._selectedState = state;
			this.draw();
		});
		return this;
	};

	// scales
	// axes
	// draw (add rect)
	this.draw = function () {
		let filteredData = this._data.filter(
			(d) => d.state === this._selectedState
		);
		let scaleX = d3
			.scaleBand()
			.domain(filteredData.map((d) => d.county))
			.range([0, this._containerSize.w])
			.padding(0.2);

		let scaleY = d3
			.scaleLinear()
			.domain([0, d3.max(filteredData, (d) => d.cases)])
			.range([this._containerSize.h, 0]);

		let rectSel = this._selection
			.selectAll("rect")
			.data(filteredData, (d, i) => i);

		rectSel
			.enter()
			.append("rect")
			.attr("x", (d) => scaleX(d.county))
			.attr("y", this._containerSize.h)
			.attr("width", scaleX.bandwidth())
			.attr("height", 0)
			.transition()
			.duration(1000)
			.attr("y", (d) => scaleY(d.cases))
			.attr("height", (d) => this._containerSize.h - scaleY(d.cases));

		rectSel
			// .join("rect")
			.transition()
			.duration(1000)
			.attr("x", (d) => scaleX(d.county))
			.attr("y", (d) => scaleY(d.cases))
			.attr("width", scaleX.bandwidth())
			.attr("height", (d) => this._containerSize.h - scaleY(d.cases));

		rectSel.exit().transition().duration(1000).attr("height", 0).remove();

		this.drawAxes(scaleX, scaleY);
	};

	this.drawAxes = function (scaleX, scaleY) {
		this.drawAxisX(scaleX);
		this.drawAxisY(scaleY);
	};

	this.drawAxisX = function (scaleX) {
		let axisX = d3.axisBottom(scaleX);

		let axisG = this._selection
			.selectAll("g.axis-x")
			.data([1]) // hard coded one element array, making sure we have only one data
			.join("g")
			.classed("axis-x", true)
			.classed("axis", true)
			.attr("transform", `translate(0, ${this._containerSize.h})`);

		axisG.call(axisX);
	};

	this.drawAxisY = function (scaleY) {
		let axisY = d3.axisLeft(scaleY);

		let axisG = this._selection
			.selectAll("g.axis-y")
			.data([1])
			.join("g")
			.classed("axis-y", true)
			.classed("axis", true);
		// .attr("transform", `translate(0, ${this._containerSize.h})`);

		axisG.call(axisY);
	};
}
