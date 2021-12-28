const cssSyntax = 'scss'; // Syntax: scss;

const gulp = require('gulp'),
  pug = require('gulp-pug'),
  browsersync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglifyjs'),
  gulpUtil = require('gulp-util'),
  cssnano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  cleancss = require('gulp-clean-css'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  sass = require('gulp-sass'),
  cache = require('gulp-cache'),
  spritesmith = require("gulp.spritesmith"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  newer = require("gulp-newer"),
  autoprefixer = require('gulp-autoprefixer');

// Работа с Sass
gulp.task(cssSyntax, function () {
    return gulp.src([
        'app/' + cssSyntax + '/main.' + cssSyntax + '',
    ])
      .pipe(plumber())
      .pipe(sass({
          'include css': true
      }))
      
      
      .on("error", notify.onError(function (error) {
          return "Message to the notifier: " + error.message;
      }))
      .pipe(rename({suffix: '.min', prefix: ''})) // Переименование файла с суффиксом .min
      .pipe(autoprefixer(['last 4 version']))
      .pipe(cleancss({level: {1: {specialComments: 0}}})) // Минифицирование css-файла
      .pipe(gulp.dest('app/css'))
      .pipe(browsersync.reload({
          stream: true
      }));
});

// Browsersync
gulp.task('browsersync', function () {
    browsersync({
        server: {
            baseDir: 'app'
        },
        port: 4000,
        open: true,
        notify: false,
        online: false, // Work Offline Without Internet Connection
        tunnel: true,
        tunnel: "cabinfiled" // Demonstration page: http://projectname.localtunnel.me
    })
});

// Работа с Pug
gulp.task('pug', function () {
    return gulp.src('app/pug/pages/*.pug')
      .pipe(plumber())
      .pipe(pug({
          pretty: true
      }))
      .on("error", notify.onError(function (error) {
          return "Message to the notifier: " + error.message;
      }))
      .pipe(gulp.dest('app'))
      .pipe(browserSync.reload());
});

// Работа с JS
gulp.task('scripts', function () {
    return gulp.src([
        // Библиотеки
        // 'app/libs/mmenu-js/mmenu.js',
        // 'app/libs/popper.js/dist/umd/popper.js',
        // 'app/libs/bootstrap5/dist/js/bootstrap.min.js',
        // 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
        // 'app/libs/slick/slick.min.js',
        // 'app/libs/bootstrap-select/js/bootstrap-select.min.js',
        'https://cdn.jsdelivr.net/gh/farhadmammadli/bootstrap-select@main/js/bootstrap-select.min.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/lightgallery-js/1.4.0/js/lightgallery.min.js',
    ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify().on('error', gulpUtil.log))
      .pipe(gulp.dest('app/js'))
      .pipe(browsersync.reload({stream: true}));
});


// Сборка спрайтов PNG
gulp.task('cleansprite', function () {
    return del.sync('app/img/sprite/sprite.png');
});


gulp.task('spritemade', function () {
    let spriteData =
      gulp.src('app/img/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.' + cssSyntax + '',
            padding: 15,
            cssFormat: cssSyntax,
            algorithm: 'binary-tree',
            cssTemplate: cssSyntax + '.template.mustache',
            cssVarMap: function (sprite) {
                sprite.name = 's-' + sprite.name;
            }
        }));
    
    spriteData.img.pipe(gulp.dest('app/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/' + cssSyntax + '/')); // путь, куда сохраняем стили
});

gulp.task('sprite', ['cleansprite', 'spritemade']);

// Слежение
gulp.task('watch', ['browsersync', cssSyntax, 'scripts'], function () {
    gulp.watch('app/pug/**/*.pug', ['pug']);
    gulp.watch('app/' + cssSyntax + '/**/*.' + cssSyntax + '', [cssSyntax]);
    gulp.watch('app/*.html', browsersync.reload);
    gulp.watch(['app/js/*.js', '!app/js/libs.min.js', '!app/js/jquery.js'], ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function () {
    return del.sync('prodact');
});

// Оптимизация изображений
gulp.task('img', function () {
    return gulp.src(['app/img/**/*', '!app/img/sprite/*'])
      .pipe(cache(imagemin({
          progressive: true,
          use: [pngquant()]
      })))
      .pipe(gulp.dest('product/img'));
});

// Сборка проекта
gulp.task('build', ['clean', 'img', cssSyntax, 'scripts'], function () {
    let buildCss = gulp.src('app/css/*.css')
      .pipe(gulp.dest('product/css'));
    let buildFonts = gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('product/fonts'));
    // Font-awesome fonts
    let buildFontAwesome = gulp.src('app/libs/font-awesome/fonts/**/*')
      .pipe(gulp.dest('product/libs/font-awesome/fonts'));
    let buildJs = gulp.src('app/js/**.js')
      .pipe(gulp.dest('product/js'));
    let buildHtml = gulp.src('app/*.html')
      .pipe(gulp.dest('product/'));
    let buildImg = gulp.src('app/img/sprite/sprite.png')
      .pipe(imagemin({
          progressive: true,
          use: [pngquant()]
      }))
      .pipe(gulp.dest('product/img/sprite/'));
});

// Очистка кеша
gulp.task('clear', function () {
    return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);
