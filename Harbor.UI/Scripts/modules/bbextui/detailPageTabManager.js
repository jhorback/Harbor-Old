/*
 * detailPageTabMangaer
 *     This service uses the tabFactory to create the tabs and also manage the showing, hiding, scroll positions
 *     etc. of the child tab view.
 *     Call detailPageTabManager.createTabs(options) "onRender" of the parent view.
 *

 jch! - can i use a bb collection over the tabFactory (which is deprecated?)

 * Options
 *     parentView - the parent Backbone view.
 *     tabsEl - the dom node to render the tablist to.
 *     bodyEl - the element to use as the region in the component (you can set this here if not defined by the component).
 *     tabs - the Backbone collection of tab models. The default is parentView.model.tabs.
 *     model (deprecate? use ddf instead?) - the name of the sub model in the rootModel to use as this.model in the child component.
 *     currentTabAttributeName - the name of the attribute in the parentView model to listen
 *         to for tab changes. The default is "currentTabView".
 *
 * Expectations of the parentView
 *    The model of the parent view will be passed down to all child components as their model (and rootModel) property
 *      unless a model option is provided.
 *
 * Tab model properties
 *     text - the text to show for the tab in the tab list
 *     component - the name of the component to show when the tab is selected.
 *     detailPageClassNames - class names to place on the root ".detailpage" div when the tab is visible.
 *         Can be any combination of: has-tabs has-actionbar has-sidebar
 *	   text - The text on the tabs (see the tabFactory for additional details and options).
 */
bbext.detailPageTabManager = function (tabFactory, context) {

    /**
     * @typedef {{
     *   text: string,
     *   component: string,
     *   classNames: string
     * }} ComponentTabConfig
     */

    /** @name bbext.detailPageTabManager */
	return {
		createTabs: function(options) {
			var parentView = options.parentView,
				rootModel = parentView.model;

			parentView.scroll = false; // only respect scrolling on the child components
			options.currentTabAttributeName = options.currentTabAttributeName || "currentTabView";
			options.tabs = options.tabs || options.parentView.model.tabs;

			options.parentView.components = {};
			options.tabs.each(function(tab) { // map the component to the tab value for the tabFactory.
				var componentName = tab.get("component");
				componentName && tab.set("value", componentName);
			});
			tabFactory.createDetailPageNav(options.tabsEl, {
                parentView: parentView,
				items: options.tabs,
				model: parentView.model,
				attr: options.currentTabAttributeName,
				valueAttribute: "component"
			});

			parentView.listenTo(rootModel, "change:currentTabView", changeTabCurry(options));
			parentView.on("component:show", componentShowAndDetachedCurry(options, "component:show"));
			parentView.on("component:detached", componentShowAndDetachedCurry(options, "component:detached"));
		}
	};

	function changeTabCurry(options) {
		var parentView = options.parentView,
			rootModel = parentView.model,
			currTabAttrName = options.currentTabAttributeName,
			components = parentView.components;

		return function changeTab(model, value) {
			var prevTab = rootModel.previousAttributes()[currTabAttrName],
				prevComponent = components[prevTab],
				currTab = rootModel.attributes[currTabAttrName],
				currComponent = components[currTab],
				currentTabModel,
				componentRenderOptions;

			// close the previous component and render the next one
			prevComponent && prevComponent.close();
			if (!currComponent) {
				currComponent = context.instantiate(currTab);
				components[currTab] = currComponent;
			}

            currentTabModel = options.tabs.findWhere({ value: currTab });

			componentRenderOptions = {
                parentView: parentView,
				cache: true,
				model: rootModel[currentTabModel.attributes.model] || rootModel,
				rootModel: rootModel // added for convenience
			};

			if (options.bodyEl) {
				componentRenderOptions.region = options.bodyEl;
			}

			currComponent.render(componentRenderOptions);

			parentView.$el.attr("class", "detailpage " + currentTabModel.get("detailPageClassNames"));
		};
	}

	function componentShowAndDetachedCurry(options, eventName) {
		var parentView = options.parentView,
			rootModel = parentView.model,
			currTabAttrName = options.currentTabAttributeName,
			components = parentView.components;

		return function componentShow () {
			var currTab = rootModel.attributes[currTabAttrName],
				currComponent = components[currTab];
			currComponent && currComponent.view().trigger(eventName);
		}
	}
};

bbext.service("detailPageTabManager", [
	"tabFactory",
	"context",
	bbext.detailPageTabManager
]);
