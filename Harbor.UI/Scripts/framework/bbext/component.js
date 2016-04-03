/*
 * component Construct
 *
 * A component is used to render a root template in a region.
 *
 * The region can be defined at component creation.
 * 	   someApp.component("someComponent", {
 * 		   region: "#frame-body"
 * 	   });
 *
 *     The name of the component associates the component with a root template.
 *     Above, "someComponentView" will be rendered during a call to render on the component.
 *
 *
 * Or during rendering.
 * 	   someComponent.render({
 * 	   	   // options for the root view
 * 	   	   region: "#frame-body"
 * 	   });
 *
 * Closing the component:
 * 	   someComponent.close();
 *
 *
 * Managing components
 *     Components can also be managed by using a key.
 *         someComponent.render("someKey", options);
 *         someComponent.close("someKey");
 *
 * Caching components:
 * 	   If cache: true is set as an option, a call to close only detaches the component.
 * 	   Then a call to open will reattach if there is a cached component.
 *
 * Inserting after the template
 *     When defining the component, an insertAfterTemplate option can be set to true if
 *     wanting the template to be rendered in place:
 *     someApp.component("someComponent", {
 *         insertAfterTemplate: true
 *     });
 *
 * Events:
 *     component:show
 *     component:detached
 *
 * Scroll position:
 *      When detaching/showing cached components, scroll positions will be preserved on all
 *      elements that have a [data-rel='scroll'] attribute.
 *
 *  Ignoring scrolling
 *       For some parent components, ignoring scroll handling may be desired.
 *       Add a scroll: false option to turn off scroll handling.
 *       This option can be set when defining the component or when calling render.
 */
var Component = (function () {

	var nextCid = 0,
	    privates = {};

	function Component(_, templateRenderer, console) {
		this.cid = nextCid++;

		privates[this.cid] = {
			templateRenderer: templateRenderer,
			console: console,
			_: _,
			cache: {} // key: { view:, cache:, detached:, region:}
		};
	}

	Component.prototype = {
		render: function (options) {
			var comp = this,
			    _ = privates[this.cid],
			    view = null,
			    key = "",
			    region,
			    cached,
			    o = options || {},
                parentView = o.parentView;

			_.console.group("component.render:", this.name);

			if (_._.isString(o)) {
				key = o;
				o = arguments[1];
			}

			o = o || {};
			o.region = o.region || o.regionEl || this.region; // regionEl obsolete
			o.cache = o.cache === void(0) ? this.cache : o.cache;

			cached = privates[this.cid].cache[key];
			if (cached && cached.cache && o.cache) {
				view = cached.view;
			}

			if (!o.region && this.insertAfterTemplate) {
				o.insertAfterTemplate = true;
			}

			if (!view) {
				// if (this.name === "resolutionComponent") alert("component.templateRenderer.render." + this.name);
				view = _.templateRenderer.render(this.name + "View", o);
				view.on("close", function () {
					comp.close(key);
				});

				if (o.scroll !== false && this.scroll !== false && view.scroll !== false) {
					handleScrollPositions(view);
				}
			}

			region = parentView ? parentView.$(o.region) : $(o.region);
			if (o.region && region.length === 0) {
				_.console.error("The region does not exist.");
			}

			privates[this.cid].cache[key] = {
				isOpen: true,
				view: view,
				cache: o.cache,
				detached: detachChildren(region),
				region: region
			};
			region.append(view.$el.show());
			view.trigger("component:show");

			_.console.groupEnd();

			return view;
		},

		close: function (key) {
			var view = null,
				 _ = privates[this.cid],
			    cached;

			key = key || "";
			cached = privates[this.cid].cache[key];
			if (!cached) {
				return;
			}
			_.console.group("component.close:", this.name);
			cached.view.trigger("component:detached");
			if (cached.cache) {
				cached.view.$el.detach();
			} else {
				// cached.view.$el.remove() - jch* this was the initial code, seemed wrong
				// since it did not allow the view to clean up - keep an eye on it.
				cached.view.close ? cached.view.close() : cached.view.remove();
				delete privates[this.cid].cache[key];
			}
			reattachChildren(cached.region, cached.detached);

			this.onClose && this.onClose({
				view: cached.view
			});

			_.console.groupEnd();
		},

		view: function (key) {
			var view = null,
				 _ = privates[this.cid],
			    cached;

			key = key || "";
			cached = privates[this.cid].cache[key];
			return cached ? cached.view : null;
		}
	};


	function handleScrollPositions(view) {
		var els = view.$("[data-rel='scroll']");

		if (els.length > 0) {

			view.on("component:detached", function () {
				els.each(function (i, el) {
					el = $(el);
					el.data("lastScrollTop", el.scrollTop());
				});
			});

			view.on("component:show", function () {
				els.each(function (i, el) {
					var lastScrollTop;
					el = $(el);
					lastScrollTop = el.data("lastScrollTop");
					lastScrollTop && el.scrollTop(lastScrollTop);
					setTimeout(function () {
						lastScrollTop && el.scrollTop(lastScrollTop);
					}, 0); // yield
				});
			});
		}
	}


	function reattachChildren(parent, els) {
        els.not("[data-templatefor]").hide();
		els.each(function (i, el) {
			el = $(el);
			if (el.data("wasVisible") === true) {
				el.show();
			}
		});
		parent.append(els);
	}

	function detachChildren(parent) {
		var currentChildren = parent.children(),
			elsToKeepContainer,
			elsToKeep;

		currentChildren.each(function (i, child) {
			child = $(child);
			child.data("wasVisible", child.is(":visible"));
		});

		elsToKeepContainer = parent.add(currentChildren);
		// dont remove other root templates that have not been used yet
		elsToKeep = parent.children("[data-templatefor]");
		// do not detach stylesheet links
		elsToKeep = elsToKeepContainer.find("link").add(elsToKeep);
		currentChildren.detach();
		$("body").append(elsToKeep);

		return currentChildren;
	}

	return Component;
}());



function componentConstruct(mixinConstruct, Component) {
	return mixinConstruct.createFrom(Component);
}


// register the component as an object also so DI does not instantiate it
Component.prototype.$inject = ["_", "templateRenderer", "console"];
bbext.register("bbext.Component", bbext.Component = Component);
bbext.register("bbext.Component.construct", bbext.Component, "object");


// register the construct
bbext.construct("component", [
	"mixinConstruct", "bbext.Component.construct",
	bbext.componentConstruct = componentConstruct]);
