// lib/plugins/font.js
ig.baked = true;
ig.module('plugins.font').requires('impact.impact').defines(function () {
  Font = ig.Class.extend({
    align:       'left', alpha: 1, baseline: 'top', colors: ['#FFFFFF'], current: 0, flicker: 0.15, font: null,
    pos:         {x: 0, y: 0}, size: 0, text: '', vel: {x: 0, y: 0}, init: function (font, x, y, settings) {
      this.flicker = new ig.Timer(this.flicker);
      this.font = font || '20px Garamond';
      this.pos.x = x || 0;
      this.pos.y = y || 0;
      this.size = this.getSize();
      ig.merge(this, settings);
    }, draw:     function (text, x, y, align, color, borderColor) {
      var ctx = ig.system.context;
      if (!ig.game._font || ig.game._font !== this.font) {
        ig.game._font = this.font;
        ctx.font = this.font;
      }
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.textAlign = align || this.align;
      ctx.textBaseline = this.baseline;
      ctx.fillStyle = color || this.colors[this.current];
      ctx.strokeStyle = borderColor || 'black';
      ctx.strokeText(text || this.text, ig.system.getDrawPos((x || this.pos.x)), ig.system.getDrawPos((y || this.pos.y)));
      ctx.fillText(text || this.text, ig.system.getDrawPos((x || this.pos.x)), ig.system.getDrawPos((y || this.pos.y)));
      ctx.restore();
    }, getSize:  function (font) {
      return Number(/\d+/.exec(font || this.font));
    }, getWidth: function (text) {
      return Font.Width(text || this.text, this.font);
    }, update:   function () {
      this.pos.x += this.vel.x * ig.system.tick;
      this.pos.y += this.vel.y * ig.system.tick;
      if (this.flicker.delta() > 0) {
        if (++this.current === this.colors.length) {
          this.current = 0;
        }
        this.flicker.reset();
      }
    }
  });
  Font.Width = function (text, font) {
    var ctx = ig.system.context;
    if (!ig.game._font || font && ig.game._font !== font) {
      ig.game._font = font;
      ctx.font = font;
    }
    return ctx.measureText(text).width / ig.system.scale;
  };
});

