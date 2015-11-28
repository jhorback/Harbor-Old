
var userAccount = context.app("userAccount", "currentUserModel");

userAccount.bootstrap = function (userApi, currentUserRepo, viewRenderer) {
    
    var currentUser = currentUserRepo.getCurrentUser(),
        username = currentUser.get("username"),
        userModel = userApi.getUser(username);


    userModel.once("sync", function () {
        var mainView = viewRenderer.render("userAccountMainView", {
            el: $(".page"),
            model: userModel
        });
    });
};

userAccount.start([
    "userApi",
    "currentUserRepo",
    "viewRenderer",
    userAccount.bootstrap
]);
