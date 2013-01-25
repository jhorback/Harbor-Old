/*globals */
/*
*/
(function (_) {

	var extension;

	extension = {
		close: function () {
			this.onClose && this.onClose();
			this.undelegateEvents();
			this.off();
			this.stopListening();
		}
	};

	window.CloseViewExtension = {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};

} (_));