// jch* - initial pass
session.scrollHeader = function () {
	return {
		start: function () {
			var doc = $(document),
				body = $("body"),
				headBg = $("#frame-header-background"),
				setScrolled = _.throttle(function () {
					if (doc.scrollTop() > 0) {
						body.addClass("scrolled");
						headBg.css("opacity", 1);
					} else {
						headBg.css("opacity", .2);
						body.removeClass("scrolled");
					}
				}, 200);
			doc.on("scroll", setScrolled);
			setScrolled();
		}
	};
};
session.service("scrollHeader", session.scrollHeader);