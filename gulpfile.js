let autoPrefixer = require("autoprefixer"),
	browserSync = require("browser-sync").create(),
	concat = require("gulp-concat"),
	del = require("del"),
	path = require("path"),
	join = path.join,
	gulp = require("gulp"),
	less = require("gulp-less"),
	minify = require("cssnano"),
	notify = require("gulp-notify"),
	babel = require("gulp-babel"),
	plumber = require("gulp-plumber"),
	pug = require("gulp-pug"),
	postCss = require("gulp-postcss"),
	sourceMaps = require("gulp-sourcemaps"),
	runSequence = require("run-sequence"),
	webpack = require("webpack-stream");

const DEST = "out",
	SRC = "src",
	TEMPLATES = join(SRC, "templates"),
	STYLES = join(SRC, "styles"),
	SCRIPTS = join(SRC, "scripts"),
	IMAGES = join(SRC, "images"),
	FONTS = join(SRC, "fonts");

gulp.task("styles", function() {

	let processors = [
		autoPrefixer({browsers: ["ie 9"]}),
		minify(),
	];

	return gulp.src(join(STYLES, "main.less"))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "STYLES",
					message: err.message
				};
			})
		}))
		.pipe(sourceMaps.init())
		.pipe(less())
		.pipe(postCss(processors))
		.pipe(concat("styles.css"))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest(join(DEST, "styles")));
});


gulp.task("images", function(){
	return gulp.src(join(IMAGES, "**/*.+(png|jpg|jpeg|gif|svg)"))
	.pipe(gulp.dest(join(DEST, "images")));
});

gulp.task("fonts", function() {
	return gulp.src(join(FONTS, "**/*"))
	.pipe(gulp.dest(join(DEST, "fonts")));
});

gulp.task("pug-index", function() {
	return gulp.src([join(TEMPLATES, "*.pug")])
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "pug-index",
					message: err.message
				};
			})
		}))
		.pipe(pug({
			compileDebug: false,
			pretty: true
		}))
		.pipe(gulp.dest(DEST));
});


gulp.task("js", function() {

	return gulp.src(join(SCRIPTS, "app.js"))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: "JS",
					message: err.message
				};
			})
		}))
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(webpack({
			output: {
				filename: "bundle.js",
			},
		}))
		.pipe(gulp.dest(join(DEST, "scripts")));
});


gulp.task("clean:dist", function() {
	return del.sync(DEST);
});

gulp.task("pug-index:sync", ["pug-index"], function(done) {
	browserSync.reload();
	done();
});

gulp.task("styles:sync", ["styles"], function(done) {
	browserSync.reload();
	done();
});

gulp.task("js:sync", ["js"], function(done) {
	browserSync.reload();
	done();
});

gulp.task("fonts:sync", ["fonts"], function(done) {
	browserSync.reload();
	done();
});

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
			baseDir: "./out"
		},
	});
	gulp.watch(join(TEMPLATES, "**/*.pug"), ["pug-index:sync"]);
	gulp.watch(join(STYLES, "**/*.less"), ["styles:sync"]);
	gulp.watch(join(SCRIPTS, "**/*.js"), ["js:sync"]);
	gulp.watch(join(FONTS, "**/*"), ["fonts:sync"]);
	gulp.watch(join(IMAGES, "**/*"), ["images"]);
});


gulp.task("watch", ["browserSync"], function() {
	gulp.watch(join(TEMPLATES, "**/*.pug"), ["pug-index"]);
	gulp.watch(join(STYLES, "**/*.less"), ["styles"]);
	gulp.watch(join(SCRIPTS, "**/*.js"), ["js"]);
	gulp.watch(join(FONTS, "**/*"), ["fonts"]);
	gulp.watch(join(IMAGES, "**/*"), ["images"]);
});


gulp.task("build", function (callback) {
	runSequence("clean:dist",
		["pug-index", "styles", "fonts", "js", "images"],
		callback
	);
});
