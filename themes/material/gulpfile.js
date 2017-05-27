let gulp = require('gulp');
let postcss = require('gulp-postcss');
let atImport = require('postcss-import');
let mqpacker = require('css-mqpacker');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let autoprefixer = require('gulp-autoprefixer')
let del = require('gulp-delete-file')


//定义一个testLess任务（自定义任务名称）

gulp.task('del', () => {
    var regexp = /^.min.css$/i;
    return gulp.src('./source/css/*.min.css')
        .pipe(del({
            reg: regexp,
            deleteMatch: false
        }))

})


gulp.task('rename', ['del'], () => {
    return gulp.src('./source/css/*.css')
        .pipe(rename((path) => {
            path.basename += '.min'
            path.extname = '.css'
        }))
        .pipe(gulp.dest('./source/css'))

})


gulp.task('cssnano', ['autoprefixer'], function () {
    return gulp.src('./source/css/*.min.css') //该任务针对的文件
        .pipe(cssnano()) //该任务调用的模块
        .pipe(gulp.dest('./source/css')); //将会在src/css下生成index.css
});

gulp.task('autoprefixer', ['postcss'], function () {
    return gulp.src('./source/css/*.min.css') //该任务针对的文件
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })) //该任务调用的模块
        .pipe(gulp.dest('./source/css')); //将会在src/css下生成index.css
});

gulp.task('postcss', ['rename'], () => {
    let processors = [
        atImport,
        mqpacker
    ];

    gulp.src('./source/css/.min.css') //该任务针对的文件
        .pipe(postcss(processors)) //该任务调用的模块
        .pipe(gulp.dest('./source/css')); //将会在src/css下生成index.css
});


gulp.task('default', ['cssnano']);
//定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径