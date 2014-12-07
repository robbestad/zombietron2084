// lib/plugins/light-map.js
ig.baked = true;
ig.module("plugins.light-map").requires("impact.background-map").defines(function () {
  ig.BackgroundMap.inject({
    VIEW_DISTANCE: 8, OPAQUE: 1, NINTYFIVE: 2, NINTY: 3, EIGHTYFIVE: 4, EIGHTY: 5, SEVENTYFIVE: 6, SEVENTY: 7,
    SIXTYFIVE:     8, SIXTY: 9, GRID_SIZE: 24, update: function (ent, tileSize) {
      if (zombotron.config.LIGHTMAP_ENABLED === false) {
        return;
      }
      var startX, startY, endX, endY, playerGridX, playerGridY, direction;
      var i, j, a, b;
      var xd, yd, distance;
      playerGridX = Math.floor((ent.pos.x + ent.size.x / 2) / this.GRID_SIZE);
      playerGridY = Math.floor((ent.pos.y + ent.size.y / 2) / this.GRID_SIZE);
      startX = Math.max(0, playerGridX - this.VIEW_DISTANCE);
      startY = Math.max(0, playerGridY - this.VIEW_DISTANCE);
      endX = Math.min(this.data[0].length, playerGridX + this.VIEW_DISTANCE);
      endY = Math.min(this.data.length, playerGridY + this.VIEW_DISTANCE);
      for (i = startY; i < endY; i++) {
        for (j = startX; j < endX; j++) {
          direction = "";
          xd = (j * this.GRID_SIZE + 12) - (ent.pos.x + ent.size.x / 2);
          yd = (i * this.GRID_SIZE + 12) - (ent.pos.y + ent.size.y / 2);
          distance = Math.sqrt(xd * xd + yd * yd) / this.GRID_SIZE;
          if (distance <= this.VIEW_DISTANCE) {
            var yPos = i * this.GRID_SIZE, xPos = j * this.GRID_SIZE;
            var entXPos = ent.pos.x;
            var entYPos = ent.pos.y;
            if (yPos < entYPos) {
              direction += "-y";
              yd = yd + this.GRID_SIZE;
            } else if (yPos > entYPos) {
              direction += "+y";
              yd = yd - this.GRID_SIZE;
            }
            if (xPos < entXPos) {
              direction += "-x";
              xd = xd + this.GRID_SIZE;
            } else if (xPos > entXPos) {
              direction += "+x";
              xd = xd - this.GRID_SIZE;
            }
            var res = ig.game.currentLvl.lightCollisionMap.trace(entXPos + ent.size.x / 2, entYPos + ent.size.y / 2, xd, yd, 1, 1);
            if (res.collision.y === true || res.collision.x === true) {
              distance += 5;
            }
            distance = Math.floor(distance);
            switch (distance) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                this.data[i][j] = this.SIXTY;
                break;
              default:
                this.data[i][j] = this.NINTYFIVE;
            }
          } else {
            this.data[i][j] = this.NINTYFIVE;
          }
        }
      }
    }
  });
});

