// lib/plugins/astar-for-entities.js
ig.baked = true;
ig.module('plugins.astar-for-entities').requires('impact.entity').defines(function () {
  ig.Entity.inject({
    path:                              null, _preferManyWaypoints: false, headingDirection: 0, maxMovementActive: false,
    maxMovement:                       200, directionChangeMalus45degree: 0, directionChangeMalus90degree: 0,
    ready:                             function () {
      this.directionChangeMalus45degree = ig.game.collisionMap.tilesize / 4;
      this.directionChangeMalus90degree = ig.game.collisionMap.tilesize * 5 / 8;
    }, getPath:                        function (destinationX, destinationY, diagonalMovement, entityTypesArray,
                                                 ignoreEntityArray) {
      if (typeof diagonalMovement === 'undefined')diagonalMovement = true;
      if (typeof entityTypesArray === 'undefined')entityTypesArray = [];
      if (typeof ignoreEntityArray === 'undefined')ignoreEntityArray = [];
      var mapWidth = ig.game.collisionMap.width, mapHeight = ig.game.collisionMap.height, mapTilesize = ig.game.collisionMap.tilesize, map = ig.game.collisionMap.data, diagonalMovementCosts = Math.sqrt(2);
      this._addEraseEntities(true, entityTypesArray, ignoreEntityArray);
      var startNode = new asfeNode((this.pos.x / mapTilesize).floor(), (this.pos.y / mapTilesize).floor(), -1, 0), destinationNode = new asfeNode((destinationX / mapTilesize).floor(), (destinationY / mapTilesize).floor(), -1, 0);
      if (destinationNode.x === startNode.x && destinationNode.y === startNode.y) {
        this.path = null;
        this._addEraseEntities(false, entityTypesArray, ignoreEntityArray);
        return;
      }
      if (map[destinationNode.y][destinationNode.x] !== 0) {
        this.path = null;
        this._addEraseEntities(false, entityTypesArray, ignoreEntityArray);
        return;
      }
      var open = [], closed = [];
      var nodes = {};
      var bestCost, bestNode, currentNode, newX, newY, tempG, newNode, lastDirection, direction;
      open.push(startNode);
      nodes[startNode.x + ',' + startNode.y] = startNode;
      while (open.length > 0) {
        bestCost = open[0].f;
        bestNode = 0;
        for (var i = 1; i < open.length; i++) {
          if (open[i].f < bestCost) {
            bestCost = open[i].f;
            bestNode = i;
          }
        }
        currentNode = open[bestNode];
        if (currentNode.x === destinationNode.x && currentNode.y === destinationNode.y) {
          this.path = [{x: destinationNode.x * mapTilesize, y: destinationNode.y * mapTilesize}];
          if (currentNode.x !== closed[currentNode.p].x && currentNode.y !== closed[currentNode.p].y)lastDirection =
            0; else if (currentNode.x !== closed[currentNode.p].x && currentNode.y === closed[currentNode.p].y)lastDirection =
            1; else if (currentNode.x === closed[currentNode.p].x && currentNode.y !== closed[currentNode.p].y)lastDirection =
            2;
          while (true) {
            currentNode = closed[currentNode.p];
            if (currentNode.p === -1) {
              this._addEraseEntities(false, entityTypesArray, ignoreEntityArray);
              if (this.maxMovement > 0 && this._getPathLength() > this.maxMovement && this.maxMovementActive) {
                this._createNewLimitedPath();
              }
              return;
            }
            if (currentNode.x !== closed[currentNode.p].x && currentNode.y !== closed[currentNode.p].y)direction =
              0; else if (currentNode.x !== closed[currentNode.p].x && currentNode.y === closed[currentNode.p].y)direction =
              1; else if (currentNode.x === closed[currentNode.p].x && currentNode.y !== closed[currentNode.p].y)direction =
              2;
            if (this._preferManyWaypoints || direction !== lastDirection) {
              this.path.unshift({x: currentNode.x * mapTilesize, y: currentNode.y * mapTilesize});
            }
            lastDirection = direction;
          }
        }
        open.splice(bestNode, 1);
        closed.push(currentNode);
        currentNode.closed = true;
        direction = 0;
        for (var dx = -1; dx <= 1; dx++) {
          for (var dy = -1; dy <= 1; dy++) {
            if (!diagonalMovement) {
              if (Math.abs(dx) === Math.abs(dy)) {
                continue;
              }
            }
            if (dx === 0 && dy === 0)continue;
            direction++;
            newX = currentNode.x + dx;
            newY = currentNode.y + dy;
            if (newX < 0 || newX >= mapWidth || newY < 0 || newY >= mapHeight) {
              continue;
            }
            if (map[newY][newX] !== 0)continue;
            if (dx === -1 && dy === -1 && (map[currentNode.y - 1][currentNode.x] !== 0 || map[currentNode.y][currentNode.x - 1] !== 0))continue;
            if (dx === 1 && dy === -1 && (map[currentNode.y - 1][currentNode.x] !== 0 || map[currentNode.y][currentNode.x + 1] !== 0))continue;
            if (dx === -1 && dy === 1 && (map[currentNode.y][currentNode.x - 1] !== 0 || map[currentNode.y + 1][currentNode.x] !== 0))continue;
            if (dx === 1 && dy === 1 && (map[currentNode.y][currentNode.x + 1] !== 0 || map[currentNode.y + 1][currentNode.x] !== 0))continue;
            if (nodes[newX + ',' + newY]) {
              if (nodes[newX + ',' + newY].closed) {
                continue;
              }
              tempG = currentNode.g + Math.sqrt(Math.pow(newX - currentNode.x, 2) + Math.pow(newY - currentNode.y, 2));
              if (currentNode.d !== direction) {
                if (currentNode.d === 1 && (direction === 2 || direction === 4))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 2 && (direction === 1 || direction === 3))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 3 && (direction === 2 || direction === 5))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 4 && (direction === 1 || direction === 6))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 5 && (direction === 3 || direction === 8))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 6 && (direction === 4 || direction === 7))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 7 && (direction === 6 || direction === 8))tempG +=
                  this.directionChangeMalus45degree; else if (currentNode.d === 8 && (direction === 5 || direction === 7))tempG +=
                  this.directionChangeMalus45degree; else tempG += this.directionChangeMalus90degree;
              }
              if (tempG < nodes[newX + ',' + newY].g) {
                nodes[newX + ',' + newY].g = tempG;
                nodes[newX + ',' + newY].f = tempG + nodes[newX + ',' + newY].h;
                nodes[newX + ',' + newY].p = closed.length - 1;
                nodes[newX + ',' + newY].d = direction;
              }
              continue;
            }
            newNode = new asfeNode(newX, newY, closed.length - 1, direction);
            nodes[newNode.x + ',' + newNode.y] = newNode;
            newNode.g =
              currentNode.g + Math.sqrt(Math.pow(newNode.x - currentNode.x, 2) + Math.pow(newNode.y - currentNode.y, 2));
            if (currentNode.d !== newNode.d && currentNode.d !== 0) {
              if (currentNode.d === 1 && (newNode.d === 2 || newNode.d === 4))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 2 && (newNode.d === 1 || newNode.d === 3))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 3 && (newNode.d === 2 || newNode.d === 5))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 4 && (newNode.d === 1 || newNode.d === 6))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 5 && (newNode.d === 3 || newNode.d === 8))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 6 && (newNode.d === 4 || newNode.d === 7))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 7 && (newNode.d === 6 || newNode.d === 8))newNode.g +=
                this.directionChangeMalus45degree; else if (currentNode.d === 8 && (newNode.d === 5 || newNode.d === 7))newNode.g +=
                this.directionChangeMalus45degree; else newNode.g += this.directionChangeMalus90degree;
            }
            if (diagonalMovement) {
              var h_diagonal = Math.min(Math.abs(newNode.x - destinationNode.x), Math.abs(newNode.y - destinationNode.y));
              var h_straight = Math.abs(newNode.x - destinationNode.x) + Math.abs(newNode.y - destinationNode.y);
              newNode.h = (diagonalMovementCosts * h_diagonal) + (h_straight - (2 * h_diagonal));
            } else {
              newNode.h = Math.abs(newNode.x - destinationNode.x) + Math.abs(newNode.y - destinationNode.y);
            }
            newNode.f = newNode.g + newNode.h;
            open.push(newNode);
          }
        }
      }
      this.path = null;
      this._addEraseEntities(false, entityTypesArray, ignoreEntityArray);
      return;
    }, _addEraseEntities:              function (addErase, entityTypesArray, ignoreEntityArray) {
      var ignoreThisEntity;
      for (i = 0; i < entityTypesArray.length; i++) {
        var entities = ig.game.getEntitiesByType(entityTypesArray[i]);
        for (j = 0; j < entities.length; j++) {
          ignoreThisEntity = false;
          for (k = 0; k < ignoreEntityArray.length; k++) {
            if (ignoreEntityArray[k].id === entities[j].id) {
              ignoreThisEntity = true;
            }
          }
          if (!ignoreThisEntity) {
            var sizeX = (entities[j].size.x / ig.game.collisionMap.tilesize).floor();
            var sizeY = (entities[j].size.y / ig.game.collisionMap.tilesize).floor();
            for (k = 0; k < sizeX; k++) {
              for (l = 0; l < sizeY; l++) {
                var changeTileX = (entities[j].pos.x / ig.game.collisionMap.tilesize).floor() + k, changeTileY = (entities[j].pos.y / ig.game.collisionMap.tilesize).floor() + l;
                if (changeTileX >= 0 && changeTileX < ig.game.collisionMap.width && changeTileY >= 0 && changeTileY < ig.game.collisionMap.height) {
                  if (addErase && ig.game.collisionMap.data[changeTileY][changeTileX] === 0) {
                    ig.game.collisionMap.data[changeTileY][changeTileX] = 9999;
                  } else if (!addErase && ig.game.collisionMap.data[changeTileY][changeTileX] === 9999) {
                    ig.game.collisionMap.data[changeTileY][changeTileX] = 0;
                  }
                }
              }
            }
          }
        }
      }
    }, _getPathLength:                 function () {
      var distance = 0;
      if (this.path) {
        var prevWaypoint = this.pos;
        for (var i = 0; i < this.path.length; i++) {
          if (this.path[i]) {
            var currentWaypoint = this.path[i];
            distance += this._distanceTo(prevWaypoint, currentWaypoint);
            prevWaypoint = currentWaypoint;
          }
        }
      }
      return distance;
    }, _createNewLimitedPath:          function () {
      var newPath = [];
      var distance = 0;
      if (this.path) {
        var prevWaypoint = this.pos;
        for (var i = 0; i < this.path.length; i++) {
          if (this.path[i]) {
            var currentWaypoint = this.path[i];
            var newDistance = distance + this._distanceTo(prevWaypoint, currentWaypoint);
            if (newDistance > this.maxMovement) {
              var newWayPointLength = this.maxMovement - distance;
              var newMaxMovementLastWaypoint = this._getPointSomeDistanceFromStart(prevWaypoint, currentWaypoint, newWayPointLength);
              newPath.push(newMaxMovementLastWaypoint);
              break;
            } else {
              distance += this._distanceTo(prevWaypoint, currentWaypoint);
              newPath.push(currentWaypoint);
            }
            prevWaypoint = currentWaypoint;
          }
        }
      }
      this.path = newPath;
      return;
    }, _distanceTo:                    function (p1, p2) {
      var distSquared = Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
      return distSquared;
    }, _getPointSomeDistanceFromStart: function (startPos, endPos, distanceFromStart) {
      var totalDistance = this._distanceTo(startPos, endPos);
      var totalDelta = {x: endPos.x - startPos.x, y: endPos.y - startPos.y};
      var percent = distanceFromStart / totalDistance;
      var delta = {x: totalDelta.x * percent, y: totalDelta.y * percent};
      return {x: startPos.x + delta.x, y: startPos.y + delta.y};
    }, followPath:                     function (speed, alignOnNearestTile) {
      if (typeof alignOnNearestTile === 'undefined')alignOnNearestTile = false;
      if (!this.path && alignOnNearestTile) {
        var cx = (this.pos.x / ig.game.collisionMap.tilesize).floor() * ig.game.collisionMap.tilesize, cy = (this.pos.y / ig.game.collisionMap.tilesize).floor() * ig.game.collisionMap.tilesize;
        if (cx !== this.pos.x || cy !== this.pos.y) {
          var dx = this.pos.x - cx, dy = this.pos.y - cy;
          var dxp = cx + ig.game.collisionMap.tilesize - this.pos.x, dyp = cy + ig.game.collisionMap.tilesize - this.pos.y;
          var tx;
          if (dx < dxp)tx = cx; else tx = cx + ig.game.collisionMap.tilesize;
          var ty;
          if (dy < dyp)ty = cy; else ty = cy + ig.game.collisionMap.tilesize;
          this.path = [{x: tx, y: ty}];
        }
      }
      if (this.path) {
        if (((this.pos.x >= this.path[0].x && this.last.x < this.path[0].x) || (this.pos.x <= this.path[0].x && this.last.x > this.path[0].x) || this.pos.x === this.path[0].x) && ((this.pos.y >= this.path[0].y && this.last.y < this.path[0].y) || (this.pos.y <= this.path[0].y && this.last.y > this.path[0].y) || this.pos.y === this.path[0].y)) {
          if (this.path.length === 1) {
            this.vel.x = 0;
            this.pos.x = this.path[0].x;
            this.vel.y = 0;
            this.pos.y = this.path[0].y;
            this.path = null;
            return;
          }
          this.path.splice(0, 1);
        }
        if (this.pos.x !== this.path[0].x && this.pos.y !== this.path[0].y) {
          speed = Math.sqrt(Math.pow(speed, 2) / 2);
        }
        if ((this.pos.x >= this.path[0].x && this.last.x < this.path[0].x) || (this.pos.x <= this.path[0].x && this.last.x > this.path[0].x)) {
          this.vel.x = 0;
          this.pos.x = this.path[0].x;
        } else if (this.pos.x < this.path[0].x) {
          this.vel.x = speed;
        } else if (this.pos.x > this.path[0].x) {
          this.vel.x = -speed;
        }
        if ((this.pos.y >= this.path[0].y && this.last.y < this.path[0].y) || (this.pos.y <= this.path[0].y && this.last.y > this.path[0].y)) {
          this.vel.y = 0;
          this.pos.y = this.path[0].y;
        } else if (this.pos.y < this.path[0].y) {
          this.vel.y = speed;
        } else if (this.pos.y > this.path[0].y) {
          this.vel.y = -speed;
        }
        if (this.vel.x < 0 && this.vel.y < 0)this.headingDirection =
          1; else if (this.vel.x < 0 && this.vel.y > 0)this.headingDirection =
          3; else if (this.vel.x > 0 && this.vel.y < 0)this.headingDirection =
          6; else if (this.vel.x > 0 && this.vel.y > 0)this.headingDirection =
          8; else if (this.vel.x < 0)this.headingDirection = 2; else if (this.vel.x > 0)this.headingDirection =
          7; else if (this.vel.y < 0)this.headingDirection = 4; else if (this.vel.y > 0)this.headingDirection = 5;
      } else {
        this.vel.x = 0;
        this.vel.y = 0;
        this.headingDirection = 0;
      }
    }, drawPath:                       function (r, g, b, a, lineWidth) {
      if (this.path) {
        var mapTilesize = ig.game.collisionMap.tilesize;
        ig.system.context.strokeStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
        ig.system.context.lineWidth = lineWidth * ig.system.scale;
        ig.system.context.beginPath();
        ig.system.context.moveTo(ig.system.getDrawPos(this.pos.x + this.size.x / 2 - ig.game.screen.x), ig.system.getDrawPos(this.pos.y + this.size.y / 2 - ig.game.screen.y));
        for (var i = 0; i < this.path.length; i++) {
          ig.system.context.lineTo(ig.system.getDrawPos(this.path[i].x + mapTilesize / 2 - ig.game.screen.x), ig.system.getDrawPos(this.path[i].y + mapTilesize / 2 - ig.game.screen.y));
        }
        ig.system.context.stroke();
        ig.system.context.closePath();
      }
    }, init:                           function (x, y, settings) {
      this.parent(x, y, settings);
      this.last = {x: x, y: y};
    }
  });
  asfeNode = function (x, y, p, d) {
    this.x = x;
    this.y = y;
    this.p = p;
    this.d = d;
    this.g = 0;
    this.h = 0;
    this.f = 0;
    this.closed = false;
  };
});

