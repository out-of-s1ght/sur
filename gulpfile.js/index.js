const gulp = require("gulp")
const del = require("del")
const fileinclude = require("gulp-file-include")
const htmlmin = require("gulp-htmlmin")
const sass = require("gulp-sass")(require("sass"))
const cleancss = require("gulp-clean-css")
const bs = require("browser-sync").create()
const uglify = require("gulp-uglify")
const imgmin = require("gulp-imagemin")
const postcss = require("gulp-postcss")
const prefixer = require("autoprefixer")
const sourcemaps = require("gulp-sourcemaps")
const imagemin = require("gulp-imagemin")

const { src, dest, series, parallel } = gulp
const path = {
    source: {
        markup: "source/*.html",
        styles: ["source/scss/*.scss", "!source/scss/!*.scss"],
        scripts: ["source/js/**/*.js", "source/js/**/*.mjs"],
        images: "source/img/**/*",
        fonts: "source/font/**/*",

        includes: {
            markup: "source/includes/",
            style: "source/scss/"
        }
    },
    public: {
        markup: "public/",
        styles: "public/css/",
        scripts: "public/js/",
        images: "public/img/",
        fonts: "public/font/"
    },
    clean: "public/*"
}
path.watch = {
    markup: [path.source.markup, path.source.includes.markup + "**/*"],
    styles: [path.source.styles[0], path.source.includes.style + "**/*"],
    scripts: path.source.scripts,
    images: path.source.images,
    fonts: path.source.fonts
}

const cleanMarkup = () => del(path.public.markup + "*.html")
const cleanStyles = () => del(path.public.styles)
const cleanScripts = () => del(path.public.scripts)
const cleanImages = () => del(path.public.images)
const cleanFonts = () => del(path.public.fonts)
const clean = () => del(path.clean)

const buildMarkup = () => src(path.source.markup).pipe(fileinclude({ basepath: path.source.includes.markup }))
    .pipe(htmlmin({ collapseWhitespace: true, removeAttributeQuotes: true }))
    .pipe(dest(path.public.markup))

const buildStyles = () => src(path.source.styles).pipe(sourcemaps.init())
    .pipe(sass.sync({ includePaths: path.source.includes.style }).on("error", sass.logError))
    .pipe(postcss([prefixer()]))
    .pipe(cleancss())
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.public.styles))

const buildScripts = () => src(path.source.scripts).pipe(dest(path.public.scripts))

const buildImages = () => src(path.source.images).pipe(imgmin([imagemin.mozjpeg({ quality: 40, progressive: true,  })]))
    .pipe(dest(path.public.images))

const buildFonts = () => src(path.source.fonts).pipe(dest(path.public.fonts))

const build = series(clean, parallel(buildMarkup, buildStyles, buildScripts, buildImages, buildFonts))

const watch = () => {
    const _watch = (path, task) => gulp.watch(path, { delay: 500 }, task)
    const reload = done => done(bs.reload())

    bs.init({ server: "./public", host: "192.168.0.32" })

    _watch(path.watch.markup, series(cleanMarkup, buildMarkup, reload))
    _watch(path.watch.styles, series(cleanStyles, buildStyles, reload))
    _watch(path.watch.scripts, series(cleanScripts, buildScripts, reload))
    _watch(path.watch.images, series(cleanImages, buildImages, reload))
    _watch(path.watch.fonts, series(cleanFonts, buildFonts, reload))
}

exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch