var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var mainBowerFiles = require('main-bower-files');

var rootPath = './';
var rootAppPath = './app/';

/** Development steps **/
gulp.task('start', ['compile-scss', 'cache', 'inject'], function() {
    console.log('Starting compiling scss');
});

gulp.task('clean', function() {
    gulp.src(rootAppPath + 'scss/styles.scss').pipe(clean())
    gulp.src(rootAppPath + 'css/*.gz').pipe(clean())
    return gulp.src(rootAppPath + 'css/*.css').pipe(clean());
});

gulp.task('compile-scss', function() {
    return gulp.src([rootAppPath + '**/*.scss', '!' + rootAppPath + '/admin{,/**}'])
        .pipe(sass({
            style: 'expanded'
        }).on('error', sass.logError))
        .pipe(minify())
        .pipe(concat('style.css'))
        //.pipe(gzip())
        .pipe(gulp.dest(rootAppPath + 'css'));
});

gulp.task('inject', function() {
    return gulp.src(rootPath + 'index.php')
        .pipe(inject(gulp.src(mainBowerFiles(), {
            read: false
        }), {
            name: 'bower',
            addPrefix: '..',
            addRootSlash: false
        }))
        .pipe(inject(gulp.src([rootAppPath + '**/*.js', '!' + rootAppPath + '/admin{,/**}'], {
            read: false
        }), {
            name: 'script',
            addPrefix: '..',
            addRootSlash: false
        }))
        .pipe(inject(gulp.src([rootAppPath + '**/*.css', '!' + rootAppPath + '/admin{,/**}'], {
            read: false
        }), {
            name: 'style',
            addPrefix: '..',
            addRootSlash: false
        }))
        .pipe(gulp.dest(rootAppPath));
});

gulp.task('cache', function () {
  return gulp.src(rootAppPath + '**/*.html')
    .pipe(templateCache('mf.template.js', {
      module: 'mechofest'
    }))
    .pipe(gulp.dest(rootAppPath + 'js'));
});
