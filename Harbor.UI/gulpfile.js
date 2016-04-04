/// <binding />

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    bower = require("gulp-bower"),
    rename = require("gulp-rename"),
    mainBowerFiles = require("gulp-main-bower-files"),
    del = require("del");


// Compile all `*.scss` files and write their output to the `/Content`
// directory.  The existing folder structure will be preserved.
gulp.task('sass', function () {
    return gulp.src('./Content/**/*.scss')
		.pipe(sass({
		    errLogToConsole: true
		}))
		.pipe(gulp.dest('./Content'));
});


// Watch task for active development.  Whenever a file is changed that matches 
// the glob pattern, run the specified task(s).
gulp.task('watch-sass', function () {
    gulp.watch('./Content/**/*.scss', ['sass']);
});


// pull dependencies with bower
gulp.task("bower", function () {
    return bower("./bower_components");
});


// copy over the main files to lib
gulp.task('bower-main', ["bower"], function () {
    return gulp.src("./bower.json")
        .pipe(mainBowerFiles())
        .pipe(gulp.dest("./scripts/lib"));
});


// clean the lib directory
gulp.task("clean-lib", function () {
    return del("./scripts/lib/*");
    //del.sync(["scripts/lib/**", "!scripts/lib"]);
});

gulp.task("clean-bower-main", ["clean-lib", "bower-main"]);


// These tasks will run in series when calling gulp with no arguments.
gulp.task('default', ['sass', 'watch-sass']);
