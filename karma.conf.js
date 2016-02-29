module.exports = function(config) {
  var configuration = {
    basePath: './',

    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    // plugins: [
    //     'karma-jasmine',
    //     'karma-coverage',
    //     'karma-chrome-launcher'
    // ],
    reporters: ['mocha', 'coverage'],

    preprocessors: {
      'public/app/**/!(*.spec)+(.js)': ['coverage'],
      // 'app/**/*.js': ['sourcemap']
    },

    // Generate json used for remap-istanbul
    // coverageReporter: {
    //   dir: 'coverage/',
    //   reporters: [
    //     { type: 'text-summary' },
    //     { type: 'json', subdir: '.' },
    //     { type: 'html' }
    //   ]
    // },
    coverageReporter: {
        reporters:[
            {type: 'json', subdir: '.', file: 'coverage-final.json'}
        ]
    },

    files: [
      'node_modules/traceur/bin/traceur-runtime.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      // 'node_modules/zone.js/dist/zone-microtask.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      // 'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/reflect-metadata/Reflect.js',
      'karma-test-shim.js',
      { pattern: 'node_modules/angular2/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'public/**/*.js', included: false, watched: true },
      // { pattern: 'test/test-helpers/*.js', included: false, watched: true },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false },

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      // {pattern: 'public/app/**/*.html', included: false, watched: true},
      // {pattern: 'public/assets/**/*.css', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'public/**/*.ts', included: false, watched: false},
      {pattern: 'public/**/*.js.map', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/src/": "/base/src/"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,

		// Only for travis
		customLaunchers: {
				Chrome_travis_ci: {
						base: 'Chrome',
						flags: ['--no-sandbox']
				}
		},

		// if (process.env.TRAVIS) {
    //     configuration.browsers = ['Chrome_travis_ci'];
    // }
  };

  config.set(configuration);
}