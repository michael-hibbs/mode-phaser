const gulp = require('gulp');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const watchify = require('watchify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const gutil = require("gulp-util");

const package = require('./package.json');

const ENTRY_FILE = 'src/App.ts'
const OUTPUT_FILE = `${package.name}.js`;

const SOURCE_PATH = 'src';
const BUILD_PATH = 'build';
const PHASER_PATH = './node_modules/phaser-ce/build';
const PHASER_EXAMPLES_PATH = '/home/michaelhibbs/w/gd/_phaser/phaser-examples';
const STATIC_PATH = './static';
const SERVER_MOUNTS = [ PHASER_PATH, PHASER_EXAMPLES_PATH, BUILD_PATH, STATIC_PATH ];

const watchedBrowserify = watchify(browserify({
  baseDir: SOURCE_PATH,
  entries: [ ENTRY_FILE ],
  debug: true,
}).plugin(tsify));

const build = () => {
  return watchedBrowserify
    .bundle()
    .pipe(source(OUTPUT_FILE))
    .pipe(gulp.dest(BUILD_PATH));
}

const serve = () => {
  browserSync({ server: { baseDir: SERVER_MOUNTS }, open: false });

  watchedBrowserify
    .on('update', build)
    .on('log', (log) => { gutil.log(`[Browserify] ${log}`) });

  gulp.watch(`${BUILD_PATH}/${OUTPUT_FILE}`, browserSync.reload);
}

gulp.task('serve', [/* TODO: 'clean', */ 'build'], serve)
gulp.task('build', build);
gulp.task('default', ['serve']);
