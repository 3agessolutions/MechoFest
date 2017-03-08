var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var merge = require('merge-stream');
var templateCache = require('gulp-angular-templatecache');
var mainBowerFiles = require('main-bower-files');

var rootPath = './';
var rootAppPath = './app/';

/** Development steps **/
gulp.task('start', ['compile-scss', 'font-img', 'cache', 'inject'], function() {
    console.log('Starting compiling scss');
});

gulp.task('clean', function() {
    gulp.src(rootAppPath + 'scss/styles.scss').pipe(clean())
    gulp.src(rootAppPath + 'css/*.gz').pipe(clean())
    return gulp.src(rootAppPath + 'css/*.css').pipe(clean());
});

gulp.task('compile-scss', function() {
    var concatScss = gulp.src([
            rootAppPath + 'scss/theme/mixin.scss',
            rootAppPath + 'scss/common/*.scss',
            rootAppPath + 'js/**/*.scss',
        ])
        .pipe(concat('style.scss'))
        //.pipe(gzip())
        .pipe(gulp.dest(rootAppPath + 'scss'));

    var compileScss = gulp.src([
            rootAppPath + 'scss/style.scss'
        ]).pipe(sass({
            style: 'expanded'
        }).on('error', sass.logError))
        .pipe(minify())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(rootAppPath + 'css'));

    return merge(concatScss, compileScss);

});

gulp.task('inject', ['inject-bower'], function() {

});

gulp.task('inject-bower', function() {
    var bowerJs = gulp.src(mainBowerFiles())
        .pipe(concat('vendor/vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(rootAppPath));

    return gulp.src(rootPath + 'index.php')
        .pipe(inject(gulp.src([
            rootAppPath + 'vendor/vendor.js',
            rootAppPath + '**/*.js',
            '!' + rootAppPath + '/admin{,/**}'
        ], {
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

    return merge(bowerJs, injectJs);
});

gulp.task('font-img', function() {
    gulp.src([rootAppPath + 'scss/fonts/**'])
        .pipe(gulp.dest(rootAppPath + 'css/fonts'));
    return gulp.src([, rootAppPath + 'scss/imgs/**'])
        .pipe(gulp.dest(rootAppPath + 'css/imgs'));

});

gulp.task('cache', function() {
    return gulp.src([rootAppPath + '**/*.html', '!' + rootAppPath + '/admin{,/**}'])
        .pipe(templateCache('mf.template.js', {
            module: 'mechofest'
        }))
        .pipe(gulp.dest(rootAppPath + 'js'));
});
