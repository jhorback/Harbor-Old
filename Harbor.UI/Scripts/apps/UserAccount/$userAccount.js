
var userAccount = context.app("userAccount").use("currentUserModel", "userApi");

userAccount.bootstrap = function (userApi, currentUserRepo, viewRenderer) {
    
    var currentUser = currentUserRepo.getCurrentUser(),
        username = currentUser.get("username"),
        userModel = userApi.getUser(username);


    userModel.once("sync", function () {
        debugger;
        var mainView = viewRenderer.render("userAccountMainView", {
            el: $("#accountPage"),
            model: userModel
        }, {
            fromServer: true
        });
    });
};

userAccount.start([
    "userApi",
    "currentUserRepo",
    "viewRenderer",
    userAccount.bootstrap
]);
