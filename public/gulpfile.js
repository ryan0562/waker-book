var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'), //js检测
    uglify = require('gulp-uglify') //js压缩
path = {
    scss: {
        src: ['scss/**/*.scss', '!scss/base/*.scss'],
        baseSrc: ['scss/base/*.scss'],
        dest: 'css'
    },
    js: {
        src: ['controllers/*.js'],
        dest: 'js'
    }
};
// 检查js
gulp.task('lint', function () {
    return gulp.src(path.js.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify({
            message: 'lint task ok'
        }));
});

// 合并、压缩js文件
// gulp.task('js', function() {
//   return gulp.src(path.js.src)
//     .pipe(concat('index.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(path.js.dest))
//     .pipe(uglify({ message: 'js task ok' }));
// });

gulp.task('scss', function () {
    return gulp.src(path.scss.src)
        .pipe(changed(path.scss.dest))
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 version', 'safari5', 'ie8', 'ie9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest(path.scss.dest));
});
gulp.task('watch', function () {
    gulp.watch(path.scss.src, ['scss']);
    gulp.watch(path.scss.baseSrc, ['scss']);
    gulp.watch(path.js.src, ['lint']);
    // gulp.watch(path.js.src, ['js']);
});
gulp.task('default', ['scss', 'lint', 'watch']);
