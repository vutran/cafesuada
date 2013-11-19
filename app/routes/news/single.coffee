module.exports = (req, res) ->
  res.render "news/single",
    title : "News Permalink Title"
    postid : req.params.postid