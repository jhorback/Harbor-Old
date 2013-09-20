/*
Takes a selector/node and provides push/pop methods to add or remove
elements from the region.

The region is idempotent so any calls with an el that points to the same node
will return the same region object.
*/
function region($, console) {
	return function (el) {
		var regionEl = $(el),
			children = [],
			region;

		if (regionEl.length === 0) {
			console.warn("Region not found:", el);
		}

		if (regionEl.data("region")) {
			return regionEl.data("region");
		}

		region = {
			push: function (el) {
				var currentChildren = regionEl.children().detach();
				
				if (currentChildren.length === 1 && currentChildren[0] === el) {
					// el is already open (its the current child)
					return;
				}
				children.push(currentChildren);
				regionEl.append(el);
			},

			pop: function () {
				var lastEl, removed;
				
				if (children.length === 0) {
					return;
				}
				lastEl = children.pop();
				removed = regionEl.children().remove();
				regionEl.append(lastEl);
				return removed;
			}
		};

		regionEl.data("region", region);
		return region;
	};
}


appui.service("region", ["$", "console", appui.region = region]);