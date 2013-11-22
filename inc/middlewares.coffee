###
# Handles the loading of middlewares
#
# @param object app        The app instance
# @return void
###
module.exports = (app) ->

  ###
  # If there is no trialing slash, the app will redirect to the same URI with a trailing slash
  #
  # @access private
  # @return void
  ###
  _checkTrailingSlash = (req, res, next) ->
    
    # If there's a trailing slash and not the homepage, redirect to same URL without trailing slash
    if req.url.substr(-1) isnt "/" and req.url.length > 1
      res.redirect 301, req.url + "/"
    else
      next()

  ###
  # Sets up the engine
  #
  # @access private
  # @return void
  ###
  _setupViewRenderers = () ->
    # Loads consolidate
    renderers = require "consolidate"
    # Map the engine template funcitons
    app.engine('ejs', renderers.ejs)
    app.engine('haml', renderers.haml)
    app.engine('jade', renderers.jade)

  ###
  # Retrieve the engines JSON configuration
  #
  # @access private
  # @param string key
  # @return string
  ###
  _getEngine = (key) ->
    engines = require "../config/engines.json"
    return engines[key] ? "ejs"

  # Check for trailing slash
  app.use _checkTrailingSlash

  # Sets up the view engine
  _setupViewRenderers()
  app.set "view engine", _getEngine "html"