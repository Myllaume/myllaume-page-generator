var gulp = require('gulp');

/**
 * -----------------------
 * Commande par DÉFAUT
 * ---
 * - Affichage du message "Hello world"
 * -----------------------
 */

gulp.task('default', function () {
    console.log('Hello world');
});

/**
 * -----------------------
 * Commandes de GÉNÉRATION
 * ---
 * - $ gulp css => compliation SCSS -> main.css + prefixage
 * - $ gulp js => concatenation JS -> main.js
 * -----------------------
 */

// https://www.npmjs.com/package/gulp-sass
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
// https://www.npmjs.com/package/gulp-autoprefixer
var autoprefixer = require('gulp-autoprefixer');
// https: //www.npmjs.com/package/gulp-clean-css
var minifyCss = require('gulp-clean-css');

gulp.task('css', function () {
    return gulp.src('./dist/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/assets/'))
});

// https://www.npmjs.com/package/gulp-concat
var concat = require('gulp-concat');
// https://www.npmjs.com/package/gulp-minify
var minifyJs = require('gulp-uglify');

gulp.task('js', function () {
    return gulp.src('./dist/javascript/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/assets/'))
});

/**
 * -----------------------
 * Commande d'AUTOMATISATION
 * ---
 * - $ gulp watch => activation des commandes de GÉNÉRATION
 * -----------------------
 */

gulp.task('watch', function () {
    gulp.watch('./dist/sass/**/*.scss', gulp.series('css'))
        .on('change', function (event) {
            console.log('CSS updated');
        });
    gulp.watch('./dist/javascript/**/*.js', gulp.series('js'))
        .on('change', function (event) {
            console.log('JS updated');
        });
});