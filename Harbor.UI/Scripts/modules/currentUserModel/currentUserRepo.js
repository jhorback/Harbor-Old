

function currentUserRepo(
	currentUserDto,
	menuDto,
	modelFactory,
	globalCache
) {
	var currentUser = globalCache.get("currentUser") || null;

	console.debug("menuDto", menuDto, menuDto.length);

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
	"currentUserDto",
	"menuDto",
	"modelFactory",
	"globalCache",
	currentUserRepo
]);
