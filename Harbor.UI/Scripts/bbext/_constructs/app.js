
// jch* - remove / deprecate
bbext.app = function bbextapp(appName) {
    this.name = appName;
    this.insertAfterTemplate = true;
};

bbext.component("app", ["appName", bbext.app]);