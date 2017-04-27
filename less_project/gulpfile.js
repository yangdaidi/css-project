var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css');
    del = require('del');

var paths={
	less:{
		del:['./less/**/*.css'],     //./less目录下面(**表示多层路径递归)的所有css文件(可以多个目录，数组格式)
		linput:['./less/**/*.less'], 
		loutput:'./less/'            //css存放在less文件当前目录 
	}
};
/**
 * dscription：css清除方案
 * 执行命令：gulp del
 * 执行方式：手动
 * 参考链接：http://www.gulpjs.com.cn/docs/recipes/delete-files-folder/
 */
gulp.task('del', function (cb) {
  del(paths.less.del, cb);
});


/**
 * dscription：less编译方案
 * 执行命令：gulp less/gulp minless
 * 执行方式：手动-
 * 参考链接：http://www.ydcss.com/archives/34     http://www.ydcss.com/archives/41
 */
//方案1，仅简单生成css文件，不会进行格式化、压缩等
gulp.task('less',['del'], function () {
    gulp.src(paths.less.linput)
        .pipe(less())
        .pipe(gulp.dest(paths.less.loutput));
});
//方案2，增加格式化、压缩
gulp.task('minless', function () {
    gulp.src(paths.less.linput)
        .pipe(less())
        .pipe(cssmin()) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest(paths.less.loutput));
});
/**
 * dscription：less编译方案
 * 执行命令：gulp less/gulp minless
 * 执行方式：手动-
 * 参考链接：http://www.ydcss.com/archives/34     http://www.ydcss.com/archives/41
 */
gulp.task('watch', function() {
    gulp.run('del','less');
    // gulp.watch(paths.less.linput, ['less']);
});





/**
 * dscription：gulp默认执行命令
 * 执行命令：gulp or gulp default
 * 执行方式：手动-
 */
// gulp.task('default',function(){
//     console.log('hello world');
// });

// 返回一个 callback，因此系统可以知道它什么时候完成

var Q = require('q'); //一个著名的异步处理的库 https://github.com/kriskowal/q
gulp.task('one',function(cb){
  var deferred = Q.defer();
  // 做一些异步操作
  setTimeout(function() {
    console.log("one");
     deferred.resolve();
  }, 5000);
  return deferred.promise;
});



// 定义一个所依赖的 task 必须在这个 task 执行之前完成
// gulp two 会自动执行gulp one
gulp.task('two', ['one'], function() {
    console.log("two");
});

gulp.task('default', ['one', 'two']);
