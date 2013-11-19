###
Handles the loading of middlewares

@param object app        The app instance
@return void
###
module.exports = (app) ->
  
  ###
  If there is no trialing slash, the app will redirect to the same URI with a trailing slash
  
  @access private
  @return void
  ###
  _checkTrailingSlash = (req, res, next) ->
    
    # If there's a trailing slash and not the homepage, redirect to same URL without trailing slash
    if req.url.substr(-1) isnt "/" and req.url.length > 1
      
      #res.redirect(301, req.url.slice(0, -1));
      res.redirect 301, req.url + "/"
    else
      next()

  
  # Check for trailing slash
  app.use _checkTrailingSlash
  
  # Sets up engine
  app.set "view engine", "ejs"