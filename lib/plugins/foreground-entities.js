// lib/plugins/foreground-entities.js
ig.baked = true;
ig.module("plugins.foreground-entities").requires("impact.game").defines(function () {
  ig.Game.inject({
    draw:                      function () {
      this.parent();
      this.drawForegroundEntities();
    }, drawForegroundEntities: function () {
      var fes = this.getForegroundEntities();
      for (var i = 0; i < fes.length; i++) {
        fes[i].draw();
      }
    }, getForegroundEntities:  function () {
      var a = [];
      for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if (!ent._killed && ent.foreground === true) {
          a.push(ent);
        }
      }
      return a;
    }
  });
});

