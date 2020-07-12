//////////////////////////////////////
// ----- NEEDED GULP MODULES ----- //
////////////////////////////////////
/*const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');*/

var gulp = require("gulp"),
    purgecss = require('gulp-purgecss'),
    compiler = require('webpack');
    webpack = require('webpack-stream'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    gutil = require("gutil"),
    cleancss = require("gulp-clean-css"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    babelify = require("babelify"),
    windowify = require("windowify"),
    plumber = require("gulp-plumber"),
    concat = require("gulp-concat");

///////////////////////////////////


///////////////////////////////////
// --- LOCATION OF SRC FILES --- //
///////////////////////////////////

var src_sass = "./sass/style.scss";
var src_js = "./js/scripts.js";

//scss ne dela
var vendor_css = [
    "./node_modules/bootstrap/dist/css/bootstrap.css",
    "./node_modules/slick-carousel/slick/slick.css"
];
var vendor_js = [
    "./lib/jquery.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
    "./node_modules/slick-carousel/slick/slick.min.js"
];

// KO DODAJAS zazeni "GULP VENDOR"

// vendor_js.push("./lib/imagesloaded.pkgd.min.js");

///////////////////////////////////

//////////////////////////////////
// -------- GULP TASKS -------- //
/////////////////////////////////

//sass compile and minify
gulp.task("sass",function(){
    gulp.src(src_sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error",function(err){
            gutil.log(err);
            this.emit("end");
        }))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./css/"));
});

gulp.task("sass-prod",function(){
    gulp.src(src_sass)
        .pipe(sass().on("error",function(err){
            gutil.log(err);
            this.emit("end");
        }))
        .pipe(autoprefixer())
        .pipe(cleancss())
        .pipe(purgecss({
            content: ['./js/**/*.js', './lib/*.js', './**/*.php', './**/*.html', './**/*.inc', './node_modules/slick-carousel/slick/*.js']
        }))
        .pipe(gulp.dest("./css/"));
});

gulp.task("js", function() {
    return gulp.src(src_js) 
        .pipe(webpack({
            mode: 'development',
            devtool: 'source-map',
            output: {
                filename: 'scripts.min.js',
            },
            module: {
                rules:[       
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use:[
                            { loader: 'babel-loader', options: { presets: [ ['@babel/preset-env', {"targets": { "ie": "11" }}] ] } }
                        ]
                    }
                ]
            }
        },compiler, function(err, stats) {
            /* Use stats to do more things if needed */
        }))
        .pipe(gulp.dest('./js/'));
});

gulp.task("js-prod", function() {
    return gulp.src(src_js) 
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'scripts.min.js',
            },
            module: {
                rules:[       
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use:[
                            { loader: 'babel-loader', options: { presets: [ ['@babel/preset-env', {"targets": { "ie": "11" }}] ] } }
                        ]
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./js/'));
});



// concatenate and minify vendor scripts

gulp.task("vendor-js", function(){
    gulp.src(vendor_js) 
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'vendor.min.js',
            },
            module: {
                rules:[  
                    {
                        test: require.resolve('jquery'),
                        loader: 'expose-loader',
                        options: {
                          exposes: ['$', 'jQuery'],
                        },
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use:[
                            { loader: 'babel-loader', options: { presets: [ ['@babel/preset-env', {"targets": { "ie": "11" }}] ] } }
                        ]
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./vendor/'));
});

gulp.task("vendor-css", function(){
    gulp.src(vendor_css)
        .pipe(cleancss())
        .pipe(purgecss({
            content: ['./js/**/*.js', './lib/*.js', './**/*.php', './**/*.html', './**/*.inc', './node_modules/slick-carousel/slick/*.js']
        }))
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('./vendor/'));
});


/////////////////////////////////


/////////////////////////////////
// ---- WATCH SASS CHANGES ----//
/////////////////////////////////

//watch  sass changes
gulp.task("sass-watch",["sass"],function(){
    gulp.watch("sass/**/*.scss",["sass"]);
});

//watch js changes
gulp.task("js-watch", ["js"], function(){
    gulp.watch("js/**/*.js", ["js"]);
});


/////////////////////////////////


// --- DEFAULT GULP TASK --- //
gulp.task("default",["sass-watch","js-watch"]);

// create vendor scripts
gulp.task("vendor", ["vendor-js", "vendor-css"]);


gulp.task("prod",["sass-prod","js-prod"]);