module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '../dist/_/js/main.js',
                dest: '../dist/_/js/main.js'
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

    // Default task(s).
    grunt.registerTask('default', ['compass:dev','concat'])
    grunt.registerTask('all', ['compass:dist','concat','imagemin','uglify','copy'])
};