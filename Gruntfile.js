module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var paths = {
    src: 'src',
    test: 'test',
    dist: 'dist'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'dist',
      coverage: 'test/coverage'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      src: {
        src: paths.src + '/**/*.js'
      },
      test: {
        src: paths.test + '/spec/*.js'
      },
      config: {
        src: '*.js'
      }
    },
    jscs: {
      options: {
        config: './.jscsrc'
      },
      src: {
        src: paths.src + '/**/*.js'
      },
      test: {
        src: paths.test + '/spec/*.js'
      },
      gruntfile: {
        config: '*.js'
      }
    },
    coverage: {
      dist: {
        options: {
          thresholds: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
          },
          dir: 'coverage',
          root: paths.test
        }
      }
    },
    concat: {
      dist: {
        src: paths.src + '/**/*.js',
        dest: paths.dist + '/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        expand: true,
        cwd: paths.src,
        src: '*.js', // dist when using concat
        dest: paths.dist,
        ext: '.min.js'
      }
    },
    karma: {
      dist: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('build', ['clean', 'test', 'uglify']);
  grunt.registerTask('test', ['jscs', 'jshint', 'karma', 'coverage']);
  grunt.registerTask('default', ['build']);

};
