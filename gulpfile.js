/**
 * Created by wd14931 on 2016/1/4.
 */
'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var glob = require('glob');
var path = require('path');

/*
 *
 * write json
 *
 * */

function writeJson(fileName, data){

    fs.writeFileSync(fileName, JSON.stringify(data));
}

/*
 *
 * read json
 *
 * */
function readJson(fileName){
    var json = JSON.parse(fs.readFileSync(fileName));

    return json;
}


// 报错抛出提示
var onError = function (err) {
    gutil.log('======= ERROR. ========\n');
    notify.onError("ERROR: " + err.message)(err); // for growl
    gutil.beep();
};

var lessSrc = 'public/less/*.less',
    lessDest = 'public/css';

/*
 *
 *  build change less
 *
 */

gulp.task('style', function() {

    gulp.watch('public/less/*.less', {}, function (event) {

        var path = event.path.replace(/\\/g, '/'),
            reg = path.match(/(public\/less(\/\w+)*)?\/([\w]+.less)?$/);

            lessSrc = reg[0];

        gulp.run(['less']);
    });
});

gulp.task('less', function() {

    gulp.src(lessSrc, {client: './'})
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(lessDest))
});

/*
*
* FTP Part
*
* */

/* img */
gulp.task('img-11', function () {

    glob('app/output/img/*', {}, function (err, files) {

        // 获取缓存的img
        var cacheImg = cacheJSON.img;

        var aFiles = files.filter(function(f){
            return cacheImg.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004011 ftp (172.16.4.11)/img1_40017_touch_guoneiyou/wechat',
            log: '[css-11]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

gulp.task('img-10', function () {

    glob('app/output/img/*', {}, function (err, files) {

        // 获取缓存的img
        var cacheImg = cacheJSON.img;

        var aFiles = files.filter(function(f){
            return cacheImg.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004010 ftp (172.16.4.10)/img1_40017_touch_guoneiyou/wechat',
            log: '[css-10]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

/* js */
gulp.task('js-11', function () {

    glob('app/output/js/*.js', {}, function (err, files) {

        // 获取缓存的js
        var cacheJs = cacheJSON.js;

        var aFiles = files.filter(function(f){
            return cacheJs.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004011 ftp (172.16.4.11)/js_40017_touch_guoneiyou/wechat',
            log: '[js-11]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

gulp.task('js-10', function () {

    glob('app/output/js/*.js', {}, function (err, files) {

        // 获取缓存的js
        var cacheJs = cacheJSON.js;

        var aFiles = files.filter(function(f){
            return cacheJs.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004010 ftp (172.16.4.10)/js_40017_touch_guoneiyou/wechat',
            log: '[js-10]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

/* css */
gulp.task('css-11', function () {

    glob('app/output/css/*.css', {}, function (err, files) {

        // 获取缓存的css
        var cacheCSS = cacheJSON.css;

        var aFiles = files.filter(function(f){
            return cacheCSS.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004011 ftp (172.16.4.11)/css_40017_touch_guoneiyou/wechat',
            log: '[css-11]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

gulp.task('css-10', function () {

    glob('app/output/css/*.css', {}, function (err, files) {

        // 获取缓存的css
        var cacheCSS = cacheJSON.css;

        var aFiles = files.filter(function(f){
            return cacheCSS.indexOf(f) === -1;
        });

        return upload({
            files: aFiles,
            path: '/17216004010 ftp (172.16.4.10)/css_40017_touch_guoneiyou/wechat',
            log: '[css-10]'
        }, function(){
            bUpload['cursor']++;
        });
    });
});

gulp.task('wechat-11', function () {

    return upload({
        files: 'app/output/*.html',
        path: '/17216004011 ftp (172.16.4.11)/js_40017_touch_guoneiyou',
        log: '[wechat-11]'
    }, function(){
        bUpload['cursor']++;
    });
});

gulp.task('wechat-10', function () {

    return upload({
        files: 'app/output/*.html',
        path: '/17216004010 ftp (172.16.4.10)/js_40017_touch_guoneiyou',
        log: '[wechat-10]'
    }, function(){
        bUpload['cursor']++;
    });
});

/*
* 更新缓存
* */
function updateCache(){

    if(bUpload['cursor'] < 8){
        return;
    }

    var cache = {};

    glob('app/output/css/*.css', {}, function (err, files) {

        cache['css'] = files;

        glob('app/output/js/*.js', {}, function (err, files) {
            cache['js'] = files;

            glob('app/output/img/*', {}, function (err, files) {
                cache['img'] = files;

                writeJson('./cache.json', cache);
            })
        })
    })
}

gulp.task('default', ['style']);

// FTP upload
//gulp.task('FTP', gulpSequence('img-11', 'js-11', 'css-11', 'img-10', 'js-10', 'css-10', 'wechat-11', 'wechat-10'));