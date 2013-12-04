(->

  # Load the bootable configuration
  boot = require "./config/boot"

  # Load the application paths
  paths = require "./config/paths"

  # Load ExpressJS
  express = require "express"

  # Load FileSystem
  fs = require "fs"

  # Create a new Express app
  app = express()

  # Load Middlewares
  middleWares = require "./inc/middlewares"

  # Set the port as the environment's port or fallback to local port
  port = parseInt process.env.PORT or boot.local.port, 10

  ###
  # Loads the routes from the routes.json config file
  #
  # @access private
  # @return void
  ###
  _loadRoutes = ->

    # Load the middle wares
    middleWares app

    # Load the routes
    req = false
    routes = require "./config/routes.json"
    totalRoutes = routes.length
    for req of routes

      # Split the method and URI
      routeParts = req.split " "

      # Down-case the method
      method = routeParts[0].toLowerCase()

      # Set the request URI
      uri = routeParts[1].replace /\/?$/, "/" or "/"

      # Retrieve the route file for the request
      file = _getRouteFile routes[req]

      # The route function
      routeCb = false

      # If the file doesn't exist, fallback to index router
      file = _getRouteFile "index" unless fs.existsSync file

      # Define the route callback function
      routeCb = require file

      # Define the route based on the method
      switch method
        when "get"
          app.get uri, routeCb
        when "post"
          app.post uri, routeCb
        when "put"
          app.put uri, routeCb
        when "head"
          app.head uri, routeCb
        when "delete"
          app.delete uri, routeCb
        when "options"
          app.options uri, routeCb

    # Catch everything else
    app.all "*", routeCb


  ###
  # Sets up the application directories
  #
  # @access private
  # @return void
  ###
  _setupDirectories = ->
    app.set "routes", __dirname + "/" + paths.app + "/" + paths.routes
    app.set "models", __dirname + "/" + paths.app + "/" + paths.models
    app.set "views", __dirname + "/" + paths.app + "/" + paths.views

    # Set the static directory
    app.use express.static __dirname + "/public"

  ###
  # Retrieve the route file without a trailing slash
  #
  # @access private
  # @param string file       The filename of the routes
  # @return string
  ###
  _getRouteFile = (file) ->
    app.get("routes") + "/" + file + '.coffee'

  # !----- Bootstrap

  # Log every request
  app.use express.logger()

  # Sets up the directories
  _setupDirectories()

  # Load all routes
  _loadRoutes()

  # Listen for the server
  app.listen port, ->
    console.log "Listening on " + port

)()