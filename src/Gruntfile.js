module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            target: {
            files: [{
                  expand: true,
                  cwd: '../dist/_/js/',
                  src: '**/*.js',
                  dest: '../dist/_/js/'
              }]
            }
        },
        compass: {                  // Task
        dev: {                    // Another target
                options: {
                    sassDir: 'sass',
                    cssDir: '../dist/_/css',
                    environment: 'development'
                }
            },
            dist: {                    // Another target
                options: {
                    sassDir: 'sass',
                    cssDir: '../dist/_/css',
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },
        csslint: {
          lax: {
            options: {
              import: 2,
              "box-sizing": false,
              "ids": false,
              "star-property-hack": false,
              "universal-selector": false,
              "adjoining-classes": false
            },
            src: ['../dist/_/css/styles.css']
          }
        },
        concat: {
            dist: {
                src: ['js/vendor/*.js', 'js/includes/*.js','js/*.js'],
                    dest: '../dist/_/js/main.js'
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'img/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: '../dist/_/img/'                  // Destination path prefix
              }]
            }
          },
          copy: {
              main: {
                files: [

                  // includes files within path and its sub-directories
                  {expand: true, src: ['fonts/**'], dest: '../dist/_/'},
                  {expand: true, cwd: 'templates/', src: ['**'], dest: '../dist/'},
                  {expand: true, cwd: 'behaviors/', src: ['**'], dest: '../dist/'},
                  {expand: true, cwd: 'js/vendor-exclude', src: ['**'], dest: '../dist/_/js/vendor'},

                ]
              }
            },
        watch: {
            dev: {
                files: ['sass/*.scss','sass/*/*.scss','sass/**/*.scss','sass/**/**/*.scss','js/*/*.js','js/*.js', 'Gruntfile.js'],
                tasks: 'default'
            },
            builder: {
                files: ['sass/**', 'js/**', 'img/**', 'fonts/**', 'templates/**'],
                tasks: 'all'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-csslint');

    // Default task(s).
    grunt.registerTask('default', ['compass:dev','concat','csslint'])
    grunt.registerTask('all', ['compass:dist','concat','imagemin','copy','uglify'])
};