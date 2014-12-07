// lib/plugins/mute.js
ig.baked = true;
ig.module("plugins.mute").requires("impact.game").defines(function () {
  ig.Game.inject({
    update:        function () {
      this.parent();
      if (ig.input.pressed("mute")) {
        this.toggleMute();
      }
    }, toggleMute: function () {
      if (ig.music.volume) {
        ig.music.volume = 0;
      } else {
        ig.music.volume = 0.5;
      }
    }
  });
});

