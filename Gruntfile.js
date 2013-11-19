module.exports = function(grunt) {

  // Setup configurations
  grunt.initConfig({
    // manifest file
    pkg : grunt.file.readJSON('package.json'),

    /**
     * The path of the assets source files
     *
     * @var string
     */
    srcPath : 'assets',

    /**
     * The path of the compiled assets
     *
     * @var string
     */
    publicPath : 'public',

    /**
     * Choose the CSS preprocessor (stylus, sass, scss)
     *
     * @var string
     */
    cssPreprocessor : 'stylus',

    /**
     * Clean folders
     *
     * @task clean
     */
    clean : {
      build : {
        src : ['<%= publicPath %>/css/', '<%= publicPath %>/images/', '<%= publicPath %>/js/']
      }
    },

    /**
     * Minifies image files form the source directory to the public directory
     *
     * @task imagemin
     */
    imagemin : {
      dynamic : {
        files : [{
          expand : true,
          cwd : '<%= srcPath %>/images/',
          src : ['**/*.{png,jpg,gif}'],
          dest : '<%= publicPath %>/images/'
        }]
      }
    },

    /**
     * Compiles the stylesheets source directory to the stylesheets public directory
     *
     * @task stylus
     */
    stylus : {
      options : {
        compress : true
      },
      build : {
        expand : true,
        cwd : '<%= srcPath %>/stylesheets/',
        src : '**/*.styl',
        dest : '<%= publicPath %>/css/',
        ext : '.min.css'
      }
    },

    /**
     * Compiles the stylesheets source directory to the stylesheets public directory
     *
     * @task sass
     */
    sass : {
      options : {
        style : 'compressed'
      },
      build : {
        expand : true,
        cwd : '<%= srcPath %>/stylesheets/',
        src : '**/*.{sass,scss}',
        dest : '<%= publicPath %>/css/',
        ext : '.min.css'
      }
    },

    /**
     * Compiles the javascript source directory and outputs the files to javascripts public directory
     *
     * @task coffee
     */
    coffee : {
      options : {
        join : true
      },
       build : {
        src : ['<%= srcPath %>/javascripts/**/*.coffee'],
        dest : '<%= publicPath %>/js/site.js'
      }
    },

    /**
     * Uglifies the javascript source directory and outputs the files to javascripts public directory
     *
     * @task uglify
     */
    uglify : {
      build : {
        expand : true,
        cwd : '<%= publicPath %>/js/',
        src : ['*.js'],
        dest : '<%= publicPath %>/js/compressed/',
        ext : '.min.js'
      }
    },


    /**
     * Watch for files and build
     *
     * @task watch
     */
    watch : {
      src : {
        files : ['<%= srcPath %>/js/**/*.js', '<%= srcPath %>/stylesheets/**/*.{styl,sass,scss}'],
        tasks : ['default']
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Set the CSS preprocessor
  cssPreprocessor = 'stylus';
  switch(grunt.config.get('cssPreprocessor')) {
    case 'sass':
    case 'scss':
      cssPreprocessor = 'sass';
      break;
    case 'stylus':
    default:
      cssPreprocessor = 'stylus';
      break;
  }

  // Register the default task
  grunt.registerTask('default', ['clean', 'imagemin', 'coffee', 'uglify', cssPreprocessor]);

};