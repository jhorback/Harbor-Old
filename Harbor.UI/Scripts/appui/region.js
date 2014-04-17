///* jch* can remove file
// region was moved into the component
//Takes a selector/node and provides push/pop methods to add or remove
//elements from the region.

//The region is idempotent so any calls with an el that points to the same node
//will return the same region object.
//*/
//function region($, console) {
//	return function (regionEl) {
//		var children = [], // for push, pop
//			cached = {}, // for show, hide
//			region;

//		regionEl = $(regionEl).eq(0);
//		if (regionEl.length === 0) {
//			console.warn("Region not found:", regionEl);
//		}

//		if (regionEl.data("region")) {
//			return regionEl.data("region");
//		}

//		region = {
//			push: function (el) {
//				var currentChildren = detachChildren();

//				if (currentChildren.length === 1 && currentChildren[0] === el) {
//					// el is already open (its the current child)
//					return;
//				}
				
//				children.push(currentChildren);
//				regionEl.append(el);
//			},

//			pop: function () {
//				var lastEls, removed;
				
//				if (children.length === 0) {
//					return void(0);
//				}

//				lastEls = children.pop();
//				removed = regionEl.children().remove();
//				reattachChildren(lastEls);
//				return removed;
//			},

//			show: function (key, el) {
//				var els = cached[key] || el;
//				regionEl.append(els);
//			},

//			hide: function (key) {
//				cached[key] = detachChildren();
//			},

//			remove: function (key) {
//				delete cached[key];
//			}
//		};

//		function reattachChildren(els) {
//			els.hide();
//			els.each(function (i, el) {
//				el = $(el);
//				if (el.data("wasVisible") === true) {
//					el.show();
//				}
//			});
//			regionEl.append(els);
//		}

//		function detachChildren() {
//			var currentChildren = regionEl.children(),
//				    elsToKeepContainer,
//				    elsToKeep;

//				currentChildren.each(function (i, child) {
//					child = $(child);
//					child.data("wasVisible", child.is(":visible"));
//				});
				
//				// do not detach templates and stylesheet links
//				elsToKeepContainer = regionEl.add(currentChildren);
//				elsToKeep = elsToKeepContainer.find("[data-templatefor]");
//				elsToKeep = elsToKeepContainer.find("link").add(elsToKeep);
//				currentChildren.detach();
//				$("body").append(elsToKeep);

//			return currentChildren;
//		}

//		regionEl.data("region", region);
//		return region;
//	};
//}


//appui.service("region", ["$", "console", appui.region = region]);



///*
//// jch - should the intelligence be in the region, component, or router?

//scenarios
//// syncInfo, devices, device, devices, syncInfo
//// device, syncInfo


//#devices-tab: syncInfo
//#devices-tab: hides syncInfo, shows devices
//#frame-body: // need to hide anything in frame-body



//var test = [{
//	syncInfo: {},
//	devices: {
//		callback: "devices"
//	},
//	"id/:id": {
//		name: "device",
//		url: function (id) {
//			return "device/" + id;
//		},
//		callback: "device"
//	},
//	"*default": {
//		name: "default",
//		url: "",
//		callback: "syncInfo"
//	}
//}, {
//	syncInfo: function () {
//		this.showComponent("syncSessionComponent", {
//			region: "#devices-tab"
//		});
//	},
//	devices: function () {
//		this.showComponent("devicesComponent", {
//			region: "#devices-tab"
//		});
//	},
//	device: function (id) {
//		this.showComponent("deviceViewComponent", {
//			region: "#frame-body"
//		});
//	}
//}];
//*/