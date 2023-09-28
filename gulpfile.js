let gulp = require('gulp');
let browserSynk = require('browser-sync');
let sass = require('gulp-sass')(require('sass'));
let rename = require('gulp-rename');
let autopredixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');


gulp.task('server', function() {
    browserSynk.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src("src/sass/*.sass")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
            }))
            .pipe(autopredixer({
                overrideBrowserslist: ['last 2 versions'],
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest("src/css"))
            .pipe(browserSynk.stream());
});

gulp.task('watch', function(){
    gulp.watch("src/sass/*.sass", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSynk.reload)
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));