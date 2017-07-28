var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    connect= require('gulp-connect'),
    uglify = require('gulp-uglify'),
    imageMin = require("gulp-imagemin");

// 定义
var concatJs='js/*.js';
var htmlSrc = 'page/*.html';
var htmlDist = 'dist/page';
// 定义实时刷新机制
 gulp.task('connects', function () {
     connect.server({
         livereload: true
     });
 });
//  压缩js
 gulp.task('minJs',function(){
    gulp.src(concatJs)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
 })

  gulp.task('html', function () { 
     gulp.src(htmlSrc)
         .pipe(gulp.dest(htmlDist))
 });


gulp.task('Images',function(){
    gulp.src('images/*.*')
        .pipe(imageMin({progressive: true}))
        .pipe(gulp.dest('dist/images'))
})


//检测变化,以便实时刷新
  gulp.task('watch', function () {
 
    //  gulp.watch('page/*.html', ['html']);
 
     gulp.watch('js/*.js', ['minJs']);

     gulp.watch('images/*.*', ['Images']);
 
 });

 gulp.task('default', [ 'minJs', 'html','Images','watch', 'connects']);