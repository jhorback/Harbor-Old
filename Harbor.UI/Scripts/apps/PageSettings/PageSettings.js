﻿var PageSettings = new Application({

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
        this.settingsView.remove();
    }
});