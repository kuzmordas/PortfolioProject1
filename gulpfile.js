let gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    del          = require('del');

gulp.task('sass', function() {
    return gulp.src('app/sass/common.blocks/**/*.scss')
               .pipe(sass())
               .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
               .pipe(gulp.dest('app/css/common.blocks/'))
               .pipe(browserSync.reload({stream: true}));
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

gulp.task('build', ['clean', 'sass'], function() {

    gulp.src(['app/css/common.blocks/**/*.css'])
        .pipe(gulp.dest('dist/css/common.blocks'));

    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});