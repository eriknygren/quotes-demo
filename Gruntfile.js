'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      project: {
          app: ['public'],
          css: ['<%= project.app %>/stylesheets/style.scss']
      },    
      sass: {
        dev: {
          options: {
            style: 'expanded',
            compass: true
          },
          files: {
            '<%= project.app %>/stylesheets/style.css':'<%= project.css %>'
          }
        }
      },
      watch: {
        sass: {
          files: '<%= project.app %>/stylesheets/{,*/}*.{scss,sass}',
          tasks: ['sass:dev']
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
      'watch'
    ]);

    grunt.registerTask('compile-sass', ['sass'])

};