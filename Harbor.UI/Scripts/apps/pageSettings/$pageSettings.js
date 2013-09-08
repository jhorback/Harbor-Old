
var pageSettings = context.module("pageSettings").use("bbext");

pageSettings.component("pageSettings");







var PageSettings = new Application({

    settingsView: null,

    start: function (options) {
        if (this.settingsView === null) {
            this.settingsView = new PageSettings.SettingsView({ model: options.page });
        }
        this.settingsView.render();
    },
    
    regions: {
        modal: "#page-modal"
    },
    
    dispose: function () {
	    if (this.settingsView) {
		    this.settingsView.remove();
	    }
    }
});