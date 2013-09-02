

function currentUserRepo(currentUserDto, modelFactory, globalCache) {
	var currentUser = globalCache.get("currentUser") || null;

	return {
		getCurrentUser: function () {
			if (!currentUser) {
				currentUser = modelFactory.create("currentUser", currentUserDto);
				globalCache.set("currentUser", currentUser);
			}
			return currentUser;
		}
	};
}

currentUserModel.service("currentUserRepo", [
	"currentUserDto", "modelFactory", "globalCache",
	currentUserRepo]);
