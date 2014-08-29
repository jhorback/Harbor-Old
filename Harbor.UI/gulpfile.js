var gulp = require('gulp'),
    sass = require('gulp-sass');

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
gulp.task('watch', function () {
    gulp.watch('./Content/**/*.scss', ['sass']);
});

// These tasks will run in series when calling gulp with no arguments.
gulp.task('default', ['sass', 'watch']);
