const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require('browserify');
const buffer = require("vinyl-buffer");
const source = require('vinyl-source-stream');
const rename = require("gulp-rename");
const sourceMaps = require("gulp-sourcemaps");
const livereload = require("gulp-livereload");

const config = {
        src: "./src/main.js",
        outputDir: "./dist/",
        mapsDir: "./maps/",
        outputFile: "bundle.js",
};

gulp.task("moveHTML", function() {
	return gulp.src("src/*.html")
		.pipe(gulp.dest(config.outputDir));
});

gulp.task("js", () => {
    return browserify(config.src)
            .transform(babelify.configure({
                presets: ["@babel/preset-env", "@babel/preset-react"]
              }))
            .bundle()
            .pipe(source(config.src))
            .pipe(buffer())
            .pipe(rename(config.outputFile))    
            .pipe(sourceMaps.init({ loadMaps : true })) 
            .pipe(sourceMaps.write(config.mapsDir))  
            .pipe(gulp.dest(config.outputDir))
            .pipe(livereload());  
});

gulp.task('default', gulp.series("moveHTML","js"));