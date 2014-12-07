ig.module("plugins.simple-rant")
  .requires("impact.game").defines(function () {
    ig.simpleRant = ig.Game.extend({
      init     : function () {
      },
      sentence: function(){
        return "first sentence";
      }
  });
});
