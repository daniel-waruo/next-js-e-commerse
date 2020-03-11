let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');
let urlAdjuster = require('gulp-css-replace-url');

let $ = 'node_modules/',
  mdbPath = $ + "mdbreact/dist/css/mdb.css",
  fontAwesome = $ + "@fortawesome/fontawesome-free/css/all.min.css",
  destination = 'assets/css/dist',
  nodeRelative,
  nodePath
;

nodeRelative = destination
  .split("/")
  .map(
    x => {
      return ".."
    }
  ).join("/");

nodePath = `${nodeRelative}/${$}`;

gulp.task('mdb', function () {
  return gulp.src([mdbPath])
    .pipe(
      urlAdjuster({replace: ['..', `${nodePath}mdbreact/dist`]})
    )
    .pipe(gulp.dest(destination))
});

gulp.task('font-awesome', function () {
  return gulp.src([fontAwesome])
    .pipe(
      urlAdjuster({replace: ['..', `${nodePath}@fortawesome/fontawesome-free`]})
    )
    .pipe(gulp.dest(destination))
});

gulp.task('bs', function () {
  return gulp.src([
    $ + "bootstrap-css-only/css/bootstrap.min.css",
    //"css/dist/*.css"
  ])
  //.pipe(cleanCSS({debug: true}))
    .pipe(gulp.dest(destination));
});

gulp.task('prepare-css', gulp.series(['mdb', 'font-awesome', 'bs']));


//gulp.task('combine')
gulp.task('combine-clean-css', function () {
  return gulp.src([
    `${destination}/bootstrap.min.css`,
    `${destination}/mdb.css`,
    'assets/css/index.css',
  ]).pipe(concat('style.css'))
    .pipe(gulp.dest(destination));
});


gulp.task('default', gulp.series(['prepare-css', 'combine-clean-css']));