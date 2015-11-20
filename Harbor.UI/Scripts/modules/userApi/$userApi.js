
var userApi = context.module("userApi").use("bbext");


userApi.userApi = function (modelFactory) {

    return {
        getUser: function (username) {
            var existingUser = username !== void (0),
                user;

            user = modelFactory.create("userModel", {
                userName: username,
                created: existingUser
            });

            if (existingUser) {
                user.fetch();
            }

            return user;
        }
    };
};


userApi.service("userApi", [
    "modelFactory",
    userApi.userApi
]);