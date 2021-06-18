//项目的gulp配置文件
//1 导入依赖包
const gulp = require('gulp');
//  1.2 导入autoprefixer依赖包
const autoprefixer = require('gulp-autoprefixer');
//  1.3 导入cssmin依赖包
const cssmin = require('gulp-cssmin');
//  1.4 导入es6转es5依赖包
const babel = require('gulp-babel');
//  1.5 导入js压缩依赖包
const uglify = require('gulp-uglify')
//  1.6 导入sass转css包
const sass = require('gulp-sass');
//  1.7 导入gulp-htmlmin依赖包
const htmlmin = require('gulp-htmlmin');
//  1.8 导入清除文件夹依赖包
const clean = require('gulp-clean');
//  1.9 导入依赖包gulp-webserver]
const webserver = require('gulp-webserver');
//2 构建css任务 任务完成之后要返回一个gulp 压缩css文件 添加前缀
gulp.task('css', () => {
    // //找到目标文件
    // gulp.src('./src/css/**');//找到路径下面的所有css文件
    // //自动添加前缀 使用依赖包 autoprefixer
    // gulp.pipe(autoprefixer({ overRideBrowserslist: ["last 5 version", "iOS > 3", "Firefox > 2"] }));//我们要做的事情
    // //3 压缩css文件
    // gulp.pipe(cssmin());
    // //4 将打包好的文件放到指定的目录
    // gulp.pipe(gulp.dest(cssmin()));
    //快捷写法
    return gulp
        .src('./src/css/**')
        .pipe(autoprefixer({ overrideBrowserslist: ["last 5 version", "iOS > 3", "Firefox > 2"] }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
})
//3 构建js任务
gulp.task('js', () => {
    return gulp
        .src('./src/js/**')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})
// //4 构建sass任务  将sass转为css  在添加前缀 再压缩
// gulp.task('sass', () => {
//     return gulp
//         .src('./src/sass/**')
//         .pipe(sass())
//         .pipe(autoprefixer({ overrideBrowserslist: ["last 5 version", "iOS > 3", "Firefox > 2"] }))
//         .pipe(cssmin())
//         .pipe(gulp.dest('./dist/css'))
// })
//5 创建html任务 -----------压缩打包html文件
gulp.task('html', () => {
    return gulp
        .src('./src/pages/**')
        .pipe(htmlmin({
            removeEmptyAttributes: true,//清除空属性
            collapseWhitespace: true,//去除空格
            minifyCSS: true,//css标签
            minifyJS: true,//script标签压缩
        }))
        .pipe(gulp.dest('./dist/pages'))
})
// //6 创建lib任务
// gulp.task('lib', () => {
//     return gulp
//         .src('./src/lib/**')
//         .pipe(gulp.dest('./dist/lib'))
// })
// //7 创建static任务
// gulp.task('static', () => {
//     return gulp
//         .src('./src/static/**')
//         .pipe(gulp.dest('./dist/static'))
// })
// //8 创建清除dest目录任务
// gulp.task('clean', () => {
//     return gulp
//         .src('./dist')
//         .pipe(clean())
// })
//9 创建webserver任务 自动打开浏览器
gulp.task('webserver', () => {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: '127.0.0.1',//配置打开浏览器的域名
            port: 8080,//配置打开浏览器的端口号
            open: './pages/index.html',//默认打开那个文件
            livereload: true,//浏览器自动刷新
        }))
})

//10 创建实时监控目录的任务
gulp.task('watch', (cb) => {
    gulp.watch('./src/css/**', gulp.series('css'));
    gulp.watch('./src/sass/**', gulp.series('sass'));
    gulp.watch('./src/js/**', gulp.series('js'));
    gulp.watch('./src/pages/**', gulp.series('html'));
    gulp.watch('./src/lib/**', gulp.series('lib'));
    gulp.watch('./src/static/**', gulp.series('static'));
    cb();
})
//批量按顺序执行任务 将我们需要执行的任务放到default中
gulp.task('default', gulp.series('css', 'html', 'js', 'webserver', 'watch'));