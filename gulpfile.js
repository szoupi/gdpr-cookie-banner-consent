// https://github.com/CodeChron/browsersync-gulp-4-express/blob/master/gulpfile.js

var gulp = require('gulp')
var browserSync = require('browser-sync').create()
// import {zip} from 'gulp-zip';
const zip = require('gulp-zip');



// dist is the distribution folder
var paths = {
	// copyFilesDist: {
	// 	src: './*.html',
	// 	dest: './dist/'
	// },
	styles: {
		src: './sass/**/*.scss',
		dest: './css'
	},
	// stylesDist: {
	// 	src: './sass/**/*.scss',
	// 	dest: './dist/css'
	// },
	images: {
		src: './img-raw/**/*.{jpg,png}',
		dest: './img'
	},
	imagesWebp: {
		src: './img-raw/**/*.{jpg,png}',
		dest: './img-raw'
	},
	scripts: {
		src: './js/**/*.js',
		dest: './js/'
	},
	scriptsDist: {
		src: './js/**/*.js',
		dest: './dist/js/'
	},
	zip_export: {
		src: '../litos/**',
		dest: '../',
	}	

}

function watch() {
	//watch the styles folder and execute styles func
	// gulp.watch(paths.styles.src).on('change', browserSync.reload)
	gulp.watch('./**/*.{html,js,php,twig,yaml,scss,css,json}').on('change', browserSync.reload)
}

function browserSyncInit() {
	browserSync.init({
		proxy: 'http://localhost/j5dev/',
		// browser:  ["firefox", "chromium-browser", "google-chrome"]
		browser:  ["google-chrome"]
	});

}



/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', gulp.series(gulp.parallel(watch, browserSyncInit)))

// export plugin for wp installation, exluce files with "!"
// gulp.task('zip', () => {
// 	return gulp.src([ paths.zip_export.src, '!node_modules/**',
// 		'!package-lock.json',
// 		'!package.json',
// 		'!gulp*.js', 
// 		'!.vscode',
// 		'!.gitignore',
// 		]) 
// 	  .pipe(zip('wp_litos_xxx.zip'))
// 	  .pipe(gulp.dest(paths.zip_export.dest));
//   });

