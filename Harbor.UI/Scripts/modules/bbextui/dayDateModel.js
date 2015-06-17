/*
 * dateModel
 *
 * A simple stand alone date model for a single day that provides previous and next methods
 *     as well as a dateDisplay attribute that will return today, yesterday, or the date
 */
bbext.dayDateModel = {
	defaults: {
		date: null,
		dateDisplay: "Today"
	},

	initialize: function (options) {
		this.date = options.date || new Date();
		this.attributes.date = this.date.toLocaleDateString();
	},

	"[dateDisplay]" : {
		get: function () {
			var date = this.date,
			    now = new Date,
			    datesDate = date.getDate(),
			    todaysDate = now.getDate();

			if (date.getMonth() === now.getMonth()) {
				if (datesDate === todaysDate) {
					return "Today";
				} else if (datesDate === todaysDate - 1) {
					return "Yesterday";
				}
			}
			return date.toLocaleDateString();
		},
		bind: ["date"] // this does not trigger a change (BB and date types?)
	},

	next: function () {
		var date = this.date;
		date.setDate(date.getDate() + 1);
		this.set("date", date.toLocaleDateString());
	},

	previous: function () {
		var date = this.date;
		date.setDate(date.getDate() - 1);
		this.set("date", date.toLocaleDateString());
	}
};

bbext.model("dayDateModel", bbext.dayDateModel);