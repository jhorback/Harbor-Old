﻿/*
 * BackupModelExtension.js
 * 
 * Description:
 *     A simple memento plugin that handles a single level backup of the JSON representation of the model.
 *
 * Usage:
 *     backupModelExtension.extend(someModel);
 *     someModel.store();
 *     someModel.restore();
 *              .restore(name); // restores only that property
 */
context.module("bbext").service("bbext.backupModelExt", function () {
	"use strict";

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

	return {
		extend: function (instance) {
			_.extend(instance, extension);
		}
	};
});