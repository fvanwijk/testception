module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      src: 'src',
      test: 'test',
      dist: 'dist'
    },
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
        src: '<%= paths.src %>/**/*.js'
      },
      test: {
        src: '<%= paths.test %>/spec/*.js'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    jscs: {
      options: {
        config: './.jscsrc'
      },
      src: {
        src: '<%= paths.src %>/**/*.js'
      },
      test: {
        src: '<%= paths.test %>/spec/*.js'
      },
      gruntfile: {
        src: 'Gruntfile.js'
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
          root: '<%= paths.test %>'
        }
      }
    },
    concat: {
      dist: {
        src: '<%= paths.src %>/**/*.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      build: {
        expand: true,
        cwd: 'src/',
        src: '*.js', // dist when using concat
        dest: 'dist',
        ext: '.min.js'
      }
    },
    karma: {
      dist: {
        configFile: 'karma.conf.js'
      }
    },
    watch: {
      karma: {
        files: ['Gruntfile.js', '<%= paths.src %>/**/*.js', '<%= paths.test %>/spec/**/*.js'],
        tasks: ['test']
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        commitFiles: ['package.json', 'bower.json'],
        commitMessage: 'Bump version to v%VERSION%',
        push: false
      }
    }
  });

  grunt.registerTask('build', ['clean', 'test', 'uglify']);
  grunt.registerTask('test', ['jscs', 'jshint', 'karma', 'coverage']);
  grunt.registerTask('default', ['build']);

};
