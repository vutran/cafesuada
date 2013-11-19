# Cafe Sua Da

A CoffeeScript-based MVC framework built on top of ExpressJS.

# Features

* Assets compilation with Grunt
* Easy to use routing

# Local Environment

## Launch App

`foreman start` or `node app.js`

## Default Local URL

[http://localhost:5000](http://localhost:5000)

# Configurations

## `boot.js`

To be documented...

## `paths.js`

You can customize the app folder names here otherwise, leave it as is.

## `routes.json`

Enter custom routes here and route them to a specific routes file in your application directory.

To specify a route, each line should be key value where the key is the combined string of the request method and the request URI and the value is the path of your routes file relative to your application routes directory.

### Sample `routes.json`

	{
		"GET /" : "index",
		"GET /news" : "news/archive",
		"GET /news/:postid/" : "news/single",
		"POST /news/:postid/" : "news/post",
		"DELETE /news/:postid/" : "news/delete"
	}

| Method | Request URI | Routes File To Be Loaded |
|:---|:---|:---|
| GET | / | /app/routes/index.js |
| GET | /news | /app/routes/news/archive.js |
| GET | /news/:postid/ | /app/routes/news/single |
| POST | /news/:postid/ | /app/routes/news/post.js |
| DELETE | /news/:postid/ | /app/routes/news/delete.js |

# Building Assets

Run `grunt` in your project's root directory to compile the assets folder into your public folder.

You should place all files into the assets directory when compiling your public folder.

# TODOS

* Add support for more views engine
* Better documentation