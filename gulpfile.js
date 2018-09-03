let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    del          = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache');

gulp.task('sass', function() {
    return gulp.src(['app/sass/common.blocks/**/*.scss',
                     'app/sass/common.blocks/*.scss'])
               .pipe(sass())
               .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
               .pipe(gulp.dest('app/css/common.blocks/'))
               .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin(cache({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/common.blocks/**/*.scss', ['sass']);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'img', 'sass'], function() {

    gulp.src(['app/css/common.blocks/**/*.css'])
        .pipe(gulp.dest('dist/css/common.blocks'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});