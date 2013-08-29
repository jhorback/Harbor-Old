

bbext.app = function bbextapp(appName) {
	this.name = appName;
};

bbext.component("app", ["appName", bbext.app]);