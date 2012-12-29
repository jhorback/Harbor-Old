/*
 * BackupModelExtension.js
 * 
 * Description:
 *     A simple memento plugin that handles a single level backup of the JSON representation of the model.
 *
 * Usage:
 *     BackbupModelExtension.extend(someModel);
 *     someModel.store();
 *     someModel.restore();
 */
(function () {

	var extension = {
			store: function () {
				this.memento = _.extend({}, this.attributes);
				return this.memento;
			},
			restore: function () {
				if (this.memento) {
					this.set(this.memento);
				}
				return this.memento;
			}
		};

	window.BackupModelExtension = {
		extend: function (instance) {
			_.extend(instance, { }, extension);
		}
	};
})();