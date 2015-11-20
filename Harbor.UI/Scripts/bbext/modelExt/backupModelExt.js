/*
 * BackupModelExtension.js
 *
 * Description:
 *     A simple memento plugin that handles a single level backup of the JSON representation of the model.
 *
 * Usage:
 *     backupModelExtension.extend(someModel);
 *     someModel.store();
 *     someModel.restore([setOptions]);
 *              .restore(name [,setOptions]); // restores only that property
 */
bbext.backupModelExt = function () {
	"use strict";

	return {

        /**
         * Backs up the current model attributes to a model property called 'memento'.
         * @returns {object} A reference to the memento hash
         */
		store: function () {
			this.memento = _.extend({}, this.attributes);
			return this.memento;
		},

        /**
         * Restores the backup state by `set`ing it on the model. If an attribute name is passed
         * only that attribute will be restored.
         * @param {string|object=} [name] - Either an attribute name to restore or an options hash for the `set` method
         * @param {setOptions=} [setOptions={}] - Optional options for the `set` method
         * @returns {object} A reference to the memento hash
         */
		restore: function (name, setOptions) {
			if (this.memento) {
				if (name && _.isString(name)) {
					this.set(name, this.memento[name], setOptions);
				} else {
                    setOptions = setOptions || _.isObject(name) ? name : {};
					this.set(this.memento, setOptions);
				}
			}
			return this.memento;
		}
	};
};

bbext.mixin("backupModelExt", [
	bbext.backupModelExt
]);
