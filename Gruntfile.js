module.exports = function(grunt) {

  // Setup configurations
  grunt.initConfig({

    /**
     * Manifest file
     */
    pkg : grunt.file.readJSON('package.json'),

    /**
     * Engine configuration file
     */
    engines : grunt.file.readJSON('config/engines.json'),

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
     * Choose the CSS preprocessor (css, stylus, sass, scss)
     *
     * @var string
     */
    cssPreprocessor : 'stylus',

    /**
     * Choose the CSS preprocessor (js, coffee)
     *
     * @var string
     */
    jsPreprocessor : 'coffee',

    /**
     * Compiles the stylesheets source directory to the stylesheets public directory
     *
     * @task cssmin
     */
    cssmin : {
      build : {
        expand : true,
        cwd : '<%= srcPath %>/stylesheets/',
        src : '**/*.css',
        dest : '<%= publicPath %>/css/',
        ext : '.min.css'
      }
    },

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
     * Copies files from the source directory to the public directory
     *
     * @task copy
     */
    copy : {
      js : {
        expand : true,
        cwd : '<%= srcPath %>/javascripts/',
        src : '**/*.js',
        dest : '<%= publicPath %>/js/',
        ext : '.js'
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
        files : ['<%= srcPath %>/javascripts/**/*.{js,coffee}', '<%= srcPath %>/stylesheets/**/*.{css,styl,sass,scss}'],
        tasks : ['default']
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // An array of tasks to run
  var tasks = ['clean', 'imagemin'];

  // Set the JS preprocessor
  jsPreprocessor = grunt.config.get('engines').js || grunt.config.get('jsPreprocessor');
  switch(jsPreprocessor) {
    case 'js':
      tasks.push('copy:js');
      break;
    case 'coffee':
    default:
      tasks.push('coffee');
      break;
  }
  tasks.push('uglify');

  // Set the CSS preprocessor
  cssPreprocessor = grunt.config.get('engines').css || grunt.config.get('cssPreprocessor');
  switch(cssPreprocessor) {
    case 'sass':
    case 'scss':
      tasks.push('sass');
      break;
    case 'css':
      tasks.push('cssmin');
      break;
    case 'stylus':
    default:
      tasks.push('stylus');
      break;
  }

  // Register the default task
  grunt.registerTask('default', tasks);

};