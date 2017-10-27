var gulp = require("gulp"),
    del = require("del"),
    $ = require("gulp-load-plugins")();

gulp.task("scripts", function(){
  return gulp.src("src/javascript/*.js")
      .pipe($.jshint(""))
      .pipe($.jshint.reporter("default"))
      .pipe($.concat("main.js"))
      .pipe(gulp.dest("dist/javascript"))
      .pipe($.rename({suffix: ".min"}))
      .pipe($.uglify())
      .pipe(gulp.dest("dist/javascript"))
      .pipe($.notify({message: "Scripts task complete"}))
});

gulp.task("styles", function(){
  return gulp.src("src/stylesheet/*.scss")
      .pipe($.sass())
      .pipe(gulp.dest("dist/stylesheet"))
      .pipe($.rename({suffix: ".min"}))
      .pipe($.sass({outputStyle: "compressed"}))
      .pipe(gulp.dest("dist/stylesheet"))
      .pipe($.notify({message: "Styles task complete"}))
});

gulp.task("images", function(){
  return gulp.src("src/images/*")
      .pipe($.imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
      .pipe(gulp.dest("dist/images"))
      .pipe($.notify({message: "Images task complete"}))
});

gulp.task("clean", function(){
  return del(["dist/javascript", "dist/stylesheet", "dist/images"])
});

gulp.task("default", ["clean"], function(){
  gulp.start("styles", "scripts", "images")
});

gulp.task("watch", function(){
  gulp.watch("src/stylesheet/*.scss", ["styles"]);
  gulp.watch("src/javascript/*.js", ["scripts"]);
  gulp.watch("src/images/*", ["images"]);
});
