const { src, dest, watch, series, parallel } = require("gulp"),
concat = require("gulp-concat"),
terser = require('gulp-terser');
uglifyes = require('gulp-uglify-es').default,
babel = require("gulp-babel"),
csso = require('gulp-csso'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
livereload = require('gulp-livereload');

// Paths
const files = {
	htmlPath: 'src/**/*.html',
	scssPath: "src/scss/main.scss",
	jsPath: "src/viewer/js/main.js", 
};

// Tasks for copying a html files
function html() {
    return src(files.htmlPath)
        .pipe(dest('public'))
		.pipe(browserSync.stream())
		.pipe(livereload());  
}

// Tasks for Concatenating And Minifying JavaScript and SASS Files

function mainjs() {
	    return src(files.jsPath)
	    .pipe(concat('main.js'))
	    .pipe(uglifyes())
	    .pipe(babel({
		 presets: ['@babel/preset-env'],
		 plugins: ['@babel/transform-runtime']
		 }))
		 .pipe(terser())
	    .pipe(dest('public/viewer/js'))
	    .pipe(browserSync.stream())
	    .pipe(livereload()); 
}


function scss()
{
	return src(files.scssPath)
	.pipe(sass().on('error', sass.logError))
	.pipe(csso())
	.pipe(dest('public/css'))
	.pipe(browserSync.stream())
	.pipe(livereload());  
}

// watch task
function watchTask()
{
	livereload.listen();
	browserSync.init({
		server:{
			baseDir: 'public/' }
		});
	watch([files.htmlPath, files.jsPath, files.scssPath], 
        parallel(html, mainjs, scss)
    ).on('change', browserSync.reload);
}

// Gulp basic task
exports.default = series(
    parallel(html, mainjs, scss, watchTask),
);