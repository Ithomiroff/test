var gulp         = require('gulp'),
    rigger       = require('gulp-rigger'),
    sourcemaps   = require('gulp-sourcemaps'),
    rimraf       = require('rimraf'),
    prefixer     = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    less         = require('gulp-less'),
    watch        = require('gulp-watch'),
    flatten      = require('gulp-flatten');
    
var path = {
    dist:{
        html: 'dist/',
        css: 'dist/',
        pic: 'dist/img',
        fonts: 'dist/fonts/'
    },
    src:{
        html: 'src/*.html',
        css: 'src/**/*.less',
        pic: 'src/**/*{png,svg}',
        fonts: 'src/fonts/*{ttf,woff,woff2,eot}'
    },
    watch:{
        html: 'src/*.html',
        css: 'src/**/*.less',
        pic: 'src/**/*{png,svg}',
        fonts: 'src/fonts/*{ttf,woff,woff2,eot}'
    },
    clean:'./dist'
};

gulp.task('fonts:dist', function() {
  gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('html:dist', function(){
    gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dist.html))
});

gulp.task('pic:dist', function(){
    gulp.src(path.src.pic)
    .pipe(flatten())
    .pipe(gulp.dest(path.dist.pic))
});

gulp.task('css:dist', function(){
    gulp.src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.dist.css))
});

gulp.task('watch', function() {
    watch([path.watch.html], function(ev, callback){
        gulp.start('html:dist');
    });
    watch([path.watch.css], function(ev, callback){
        gulp.start('css:dist');
    });
    watch([path.watch.pic], function(ev, callback){
        gulp.start('pic:dist');
    });
    watch([path.watch.fonts], function(ev, callback){
        gulp.start('fonts:dist');
    });
});

gulp.task('dist',[
    'html:dist',
    'css:dist',
    'pic:dist',
    'fonts:dist'
    ]);

gulp.task('clean', function(callback){
    rimraf(path.clean, callback)
});

gulp.task('bild', ['dist']);