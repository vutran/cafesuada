/*
  Misc. JS module
*/


(function() {
  var misc, site;

  misc = (function() {
    return console.log('misc loaded');
  });

  /*
   The main site object
  */


  site = (function() {
    console.log("hello world");
    return misc();
  });

  site();

}).call(this);
