module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , jshint: {
      files: ['Gruntfile.js', '*.js', 'test/*.js', 'lib/*.js']
    , options: {
        laxcomma: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};