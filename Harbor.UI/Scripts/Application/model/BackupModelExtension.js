﻿/*
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

			restore: function (name) {
				if (this.memento) {
					if (name) {
						this.set(name, this.memento[name]);
					} else {
						this.set(this.memento);
					}
				}
				return this.memento;
			}
		};

	window.BackupModelExtension = {
		extend: function (instance) {
			_.extend(instance, extension);
		}
	};
})();