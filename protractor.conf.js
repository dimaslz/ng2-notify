exports.config = {

  specs: [
    './src/**/*.e2e.ts'
  ],

  seleniumAddress: 'http://localhost:4444/wd/hub',
  // baseUrl: 'http://localhost:3000',
  useAllAngular2AppRoots: true,
  
  capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'args': ['show-fps-counter=true']
		}
	},
  jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    framework: 'jasmine2',
    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: false}));

        browser.ignoreSynchronization = false;
    },

};