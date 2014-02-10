
bbext.tabFactoryProgressModel = function (attrs, options) {

	this.items = options.items;
	this.model = options.model;
	this.modelAttr = options.modelAttr;
};


bbext.tabFactoryProgressModel.prototype = {
	defaults: {
		step: 0,
		isFirst: true,
		isLast: true
	},

	initialize: function () {
		var step = this.attributes.step || 1;

		//this.items.each(function (item, i, items) {
		//	console.warn(i, step - 1);
		//	if (i !== step - 1) {
		//		item.set("disabled", true);
		//	}
		//});
		this.modelAttrChanged(this.model, this.model.get(this.modelAttr));
		this.on("change:step", this.stepChanged);
		this.listenTo(this.model, "change:" + this.modelAttr, this.modelAttrChanged);
	},

	"[isFirst]": {
		get: function () {
			return this.attributes.step === 1;
		},

		bind: ["step"]
	},

	"[isLast]": {
		get: function () {
			return this.attributes.step === this.items.length;
		},

		bind: ["step"]
	},

	next: function () {
		var nextStep;

		if (this.get("isLast") === false) {
			nextStep = this.attributes.step + 1;
			this.set("step", nextStep);		
		}
	},

	previous: function () {
		var nextStep;
		
		if (this.get("isFirst") === false) {
			nextStep = this.attributes.step - 1;
			this.set("step", nextStep);		
		}
	},

	// keep the model in sync with the step
	stepChanged: function (model, step) {
		var currItem = this.items.at(step - 1);

		console.warn("SETTING DISABLED"); // jch!
		currItem.set("disabled", false);
		this.model.set(this.modelAttr, currItem.attributes.value);
	},

	// keep the step in sync with the model
	modelAttrChanged: function (model, attrValue) {
		var index,
		    item;
		
		item = this.items.findWhere({
			value: attrValue
		});
		index = this.items.indexOf(item);
		this.set("step", index + 1);
	}
};




bbext.model("tabFactoryProgressModel", [
	"attrs",
	"options",
	bbext.tabFactoryProgressModel
]);