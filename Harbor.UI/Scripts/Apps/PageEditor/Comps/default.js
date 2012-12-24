var DefaultComponent = function (el, page, uicid) {
	this.create = this.open = this.close = this.destroy = function () {
		console.warn("Component type not implemented.");
	};
};