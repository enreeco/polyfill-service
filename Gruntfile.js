require('es6-promise').polyfill();

module.exports = function(grunt) {

	grunt.initConfig({

		"simplemocha": {
			options: {
				globals: ['should'],
				timeout: 5000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: {
				src: ['test/node/**/*.js']
			}
		},
		"saucelabs": {
			compat: {
				options: {
					urls: {
						polyfilled: 'http://127.0.0.1:3000/test/director?mode=all',
						native: 'http://127.0.0.1:3000/test/director?mode=control'
					},
					browsers: browserList
				}
			},
			ci: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: browserList
				}
			},
			quick: {
				options: {
					cibuild: true,
					urls: {
						default: 'http://127.0.0.1:3000/test/director?mode=targeted'
					},
					browsers: 	[
						{
							browserName: 'chrome',
							version: 'beta',
							platform: 'Windows 7'
						},
						{
							browserName: 'internet explorer',
							version: '6',
							platform: 'Windows XP'
						}
					]
				}
			}
		},
		"shipit": {
			"qa": { targetremote: "herokuqa" },
			"prod": { targetremote: "heroku" }
		}
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.registerTask("test", [
		"simplemocha",
		"buildsources",
		"polyfillservice",
		"saucelabs:quick",
	]);

	grunt.registerTask("compatgen", [
		"simplemocha",
		"polyfillservice",
		"buildsources",
		"saucelabs:compat",
		"compattable"
	]);

	grunt.registerTask("ci", [
		"simplemocha",
		"polyfillservice",
		"saucelabs:ci"
	]);

	grunt.registerTask("build", [
		"installcollections",
		"buildsources"
	]);
};

var browserList = [
	{
		browserName: 'chrome',
		version: '39',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '38',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '34',
		platform: 'Windows 7'
	},
	{
		browserName: 'chrome',
		version: '26',
		platform: 'Windows 7'
	},
	{
		browserName: 'firefox',
		version: '34',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '33',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '29',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '20',
		platform: 'Linux'
	},
	{
		browserName: 'firefox',
		version: '3.6',
		platform: 'Linux'
	},
	{
		browserName: 'internet explorer',
		version: '6',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '7',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '8',
		platform: 'Windows XP'
	},
	{
		browserName: 'internet explorer',
		version: '9',
		platform: 'Windows 7'
	},
	{
		browserName: 'internet explorer',
		version: '10',
		platform: 'Windows 7'
	},
	{
		browserName: 'internet explorer',
		version: '11',
		platform: 'Windows 8.1'
	},
	{
		browserName: 'iphone',
		version: '7.1',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'safari',
		version: '5',
		platform: 'OSX 10.6'
	},
	{
		browserName: 'safari',
		version: '6',
		platform: 'OSX 10.8'
	},
	{
		browserName: 'safari',
		version: '7',
		platform: 'OSX 10.9'
	},
	{
		browserName: 'android',
		version: '4.4',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.3',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.2',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.1',
		platform: 'linux'
	},
	{
		browserName: 'android',
		version: '4.0',
		platform: 'linux'
	}
];
