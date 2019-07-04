// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    files: [
      { pattern: "./assets/js/support.js", watched: false },
      { pattern: "./assets/js/jquery.js", watched: false },
      { pattern: "./assets/js/jquery-migrate.min.js", watched: false },
      { pattern: "./assets/js/jquery.timepicker.min.js", watched: false },
      { pattern: "./assets/js/jquery.unveil.js", watched: false },
      { pattern: "./assets/js/bootstrap.min.js", watched: false },
      { pattern: "./assets/js/slick.min.js", watched: false },
      { pattern: "./assets/js/jquery.magnific-popup.min.js", watched: false },
      { pattern: "./assets/js/perfect-scrollbar.jquery.min.js", watched: false },
      { pattern: "./assets/js/functions.js", watched: false },
      { pattern: "./assets/js/widget.min.js", watched: false },
      { pattern: "./assets/js/mouse.min.js", watched: false },
      { pattern: "./assets/js/support.js", watched: false },
      { pattern: "./assets/js/slider.min.js", watched: false },
      { pattern: "./assets/js/select2.full.min.js", watched: false },
      { pattern: "./assets/js/ajax-filters.min.js", watched: false },
      { pattern: "./assets/js/listing.js", watched: false },
      { pattern: "./assets/js/js_composer_front.min.js", watched: false },
      { pattern: "./assets/js/isotope.pkgd.min.js", watched: false }
    ],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../coverage/business-listing"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true
    },
    reporters: ["progress", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true
  });
};
