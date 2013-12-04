# Cafe Sua Da

A CoffeeScript-based MVC framework built on top of the Express framework and Grunt.

# Features

* Assets compilation with Grunt
* Easy to use routing

# Local Environment

## Launch App

`coffee app.coffee`

## Default Local URL

[http://localhost:5000](http://localhost:5000)

# Configurations

## `boot.js`

To be documented...

## `engines.json`

Speciy a compiler to use for your application's assets and view renderer

### Options

#### html

Type: `String` Default: `ejs`

This is used to define the view rendering engine for the application.

***Currently Supports:***

* `ejs`
* `haml`
* `jade`

#### css

Type: `String` Default: `stylus`

This is used to define the CSS framework to use for handling your CSS assets with Grunt.

***Currently Supports:***

* `css`
* `stylus`
* `scss`
* `sass`

#### js

Type: `String` Default: `coffee`

This is used to define the JS framework to use for handling your JS assets with Grunt.

***Currently Supports:***

* `js`
* `coffee`

### Sample `engines.json`

	{
	  "html" : "ejs",
	  "css" : "stylus",
	  "js" : "coffee"
	}

## `paths.js`

You can customize the app folder names here.

99.99% of the time, you will never ever need to change this.

## `routes.json`

Enter custom routes here and route them to a specific routes file in your application directory.

To specify a route, each line should be key value where the key is the combined string of the request method and the request URI and the value is the path of your routes file relative to your application routes directory.

| Method | Request URI | Routes File To Be Loaded |
|:---|:---|:---|
| GET | / | /app/routes/index.js |
| GET | /news | /app/routes/news/archive.js |
| GET | /news/:postid/ | /app/routes/news/single |
| POST | /news/:postid/ | /app/routes/news/post.js |
| DELETE | /news/:postid/ | /app/routes/news/delete.js |

### Sample `routes.json`

	{
		"GET /" : "index",
		"GET /news" : "news/archive",
		"GET /news/:postid/" : "news/single",
		"POST /news/:postid/" : "news/post",
		"DELETE /news/:postid/" : "news/delete"
	}

# Building Assets

Run `grunt` in your project's root directory to compile the assets folder into your public folder.

You should place all files into the assets directory when compiling your public folder.

# CHANGELOG

## 0.0.3
* Added more view engines: `haml`, `jade`
* Added clustering

## 0.0.2
* Fixed `grunt` for JS files
* Added the ability to switch compilers for handling CSS and JS assets
* Cleaned up code/docblocks

## 0.0.1
* Initial development

# TODOS

* Add support for more views engine
* Better documentation
* Convert `Gruntfile` to coffeescript