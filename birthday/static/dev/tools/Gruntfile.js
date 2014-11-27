var path = require('path');
var configFile = require('../js/config.js');
var banner = '/* <%=pkg.name%> | <%=pkg.description%> | vserion <%=pkg.version%>*/\r\n';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		lithe: {
			tpl: {
				options: {
					basepath: path.dirname(__dirname) + '/js/',
					alias: configFile.alias
				},
				files: {
					'../../online/js/conf/': '../js/conf/'
				}
			}
		},
		concat: {
			config: {
				files: {
					'../../online/js/lithe.min.js': ['../js/lithe.min.js', '../../online/js/config.js']
				}
			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['require']
				},
				banner: banner
			},
			apps: {
				src: '../../online/js/conf/*.js',
				dest: '../../online/js/conf/',
				expand: true,
				flatten: true,
				ext: '.js'
			},
			config: {
				files: {
					'../../online/js/config.js': ['../js/config.js']
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: '../css/conf/',
				src: ['*.css'],
				dest: '../../online/css/conf/',
				ext: '.css'
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: '../images/',
						src: '**',
						dest: '../../online/images/'
					},
					{
						expand: true,
						cwd: '../css/fonts/',
						src: '**',
						dest: '../../online/css/fonts/'
					},
					{
						expand: true,
						cwd: '../js/vendor/',
						src: '**',
						dest: '../../online/js/vendor/'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-lithe');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['lithe:tpl', 'uglify:apps', 'uglify:config', 'concat:config', 'cssmin', 'copy:main']);
};

