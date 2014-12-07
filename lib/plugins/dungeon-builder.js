ig.module("plugins.dungeon-builder").requires("impact.game",
  "zombotron.prefabs.level1.small-circle",
  "zombotron.prefabs.level1.small-room",
  "zombotron.prefabs.level1.tiny-room",
  "zombotron.prefabs.level1.store-room",
  "zombotron.prefabs.level1.throne-room",
  "zombotron.prefabs.level2.small-room2",
  "zombotron.prefabs.level2.mage-room",
  "zombotron.prefabs.level2.ritual-room",
  "zombotron.prefabs.level2.office",
  "zombotron.prefabs.level2.library",
  "zombotron.prefabs.level3.small-room3",
  "zombotron.prefabs.level3.circle-room",
  "zombotron.prefabs.level3.mess-hall",
  "zombotron.prefabs.level3.toilet",
  "zombotron.prefabs.level3.storage-room2",
  "zombotron.prefabs.level3.hay-room",
  "zombotron.prefabs.level4.small-room4",
  "zombotron.prefabs.level4.spider-cave",
  "zombotron.prefabs.level4.pit",
  "zombotron.prefabs.level4.barracks").defines(function () {
    ig.Game.inject({
      startRooms      : [{
        name             : "level1Start",
        map              : LevelSmallRoom.layer[0].data,
        decalMap         : LevelSmallRoom.layer[1].data,
        collisionMap     : LevelSmallRoom.layer[2].data,
        lightCollisionMap: LevelSmallRoom.layer[3].data,
        maxOccurs        : 5,
        occurs           : 0,
        xOffset          : 2,
        yOffset          : 2,
        exitPos          : {x: 2, y: 2},
        entities         : [],
        entityCount      : 0,
        spawnChance      : 0.1
      },
        {
          name             : "level2Start",
          map              : LevelSmallRoom2.layer[0].data,
          decalMap         : LevelSmallRoom2.layer[1].data,
          collisionMap     : LevelSmallRoom2.layer[2].data,
          lightCollisionMap: LevelSmallRoom2.layer[3].data,
          xOffset          : 2,
          yOffset          : 2,
          exitPos          : {x: 2, y: 2},
          entities         : [],
          entityCount      : 0,
          spawnChance      : 0.1
        },
        {
          name             : "level3Start",
          map              : LevelSmallRoom3.layer[0].data,
          decalMap         : LevelSmallRoom3.layer[1].data,
          collisionMap     : LevelSmallRoom3.layer[2].data,
          lightCollisionMap: LevelSmallRoom3.layer[3].data,
          xOffset          : 2,
          yOffset          : 2,
          exitPos          : {x: 2, y: 2},
          entities         : [],
          entityCount      : 0,
          spawnChance      : 0.1
        },
        {
          name             : "level4Start",
          map              : LevelSmallRoom4.layer[0].data,
          decalMap         : LevelSmallRoom4.layer[1].data,
          collisionMap     : LevelSmallRoom4.layer[2].data,
          lightCollisionMap: LevelSmallRoom4.layer[3].data,
          xOffset          : 2,
          yOffset          : 2,
          exitPos          : {x: 2, y: 2},
          entities         : [],
          entityCount      : 0,
          spawnChance      : 0.1
        }],
      dungeonFeatures : [[{
        name             : "smallRoom",
        map              : LevelSmallRoom.layer[0].data,
        decalMap         : LevelSmallRoom.layer[1].data,
        collisionMap     : LevelSmallRoom.layer[2].data,
        lightCollisionMap: LevelSmallRoom.layer[3].data,
        maxOccurs        : 4,
        occurs           : 0,
        exitPos          : {x: 2, y: 2},
        entities         : ["EntityZombie",
          "EntitySkeleton",
          "EntityBat",
          "EntitySlime"],
        entityCount      : 1,
        spawnChance      : 0.5,
        levelEntities    : LevelSmallRoom.entities
      },
        {
          name             : "tinyRoom",
          map              : LevelTinyRoom.layer[0].data,
          decalMap         : LevelTinyRoom.layer[1].data,
          collisionMap     : LevelTinyRoom.layer[2].data,
          lightCollisionMap: LevelTinyRoom.layer[3].data,
          maxOccurs        : 4,
          occurs           : 0,
          exitPos          : {x: 2, y: 2},
          entities         : ["EntityZombie"
          ],
          entityCount      : 1,
          spawnChance      : 1.0,
          levelEntities    : LevelTinyRoom.entities
        },
        {
          name             : "storeRoom",
          map              : LevelStoreRoom.layer[0].data,
          decalMap         : LevelStoreRoom.layer[1].data,
          collisionMap     : LevelStoreRoom.layer[2].data,
          lightCollisionMap: LevelStoreRoom.layer[3].data,
          maxOccurs        : 2,
          occurs           : 0,
          xOffset          : 3,
          yOffset          : 3,
          exitPos          : {x: 5, y: 5},
          entities         : ["EntityRandomItemPickup",
            "EntityHealingPotionPickup",
            "EntitySlime"],
          entityCount      : 2,
          spawnChance      : 0.5,
          levelEntities    : LevelStoreRoom.entities
        },
        {
          name                         : "throneRoom",
          map                          : LevelThroneRoom.layer[0].data,
          decalMap                     : LevelThroneRoom.layer[1].data,
          collisionMap                 : LevelThroneRoom.layer[2].data,
          lightCollisionMap            : LevelThroneRoom.layer[3].data,
          maxOccurs                    : 1,
          occurs                       : 0, xOffset: 4, yOffset: 4,
          exitPos                      : {x: 1, y: 1},
          entities                     : ["EntityZombie",
            "EntitySkeleton",
            "EntityBat",
            "EntitySkeletonArcher",
            "EntitySlime",
            "EntityRandomItemPickup",
            "EntityChest"], entityCount: 5, spawnChance: 0.1,
          levelEntities                : LevelThroneRoom.entities
        },
        {
          name             : "roomWithHole",
          map              : LevelSmallCircle.layer[0].data,
          decalMap         : LevelSmallCircle.layer[1].data,
          collisionMap     : LevelSmallCircle.layer[2].data,
          lightCollisionMap: LevelSmallCircle.layer[3].data,
          maxOccurs        : 1,
          occurs           : 0,
          exitPos          : {x: 1, y: 1},
          entities         : ["EntityHealingPotionPickup",
            "EntitySkeleton",
            "EntityZombie",
            "EntityBat",
            "EntitySkeletonArcher",
            "EntitySlime"],
          entityCount      : 2,
          spawnChance      : 0.5,
          levelEntities    : LevelSmallCircle.entities
        }],
        [{
          name             : "smallRoom2",
          map              : LevelSmallRoom2.layer[0].data,
          decalMap         : LevelSmallRoom2.layer[1].data,
          collisionMap     : LevelSmallRoom2.layer[2].data,
          lightCollisionMap: LevelSmallRoom2.layer[3].data,
          maxOccurs        : 3,
          occurs           : 0,
          exitPos          : {x: 2, y: 2},
          entities         : ["EntitySkeletonWarrior",
            "EntitySkeleton",
            "EntityRedBat",
            "EntityNecromancer"],
          entityCount      : 1,
          spawnChance      : 0.25,
          levelEntities    : LevelSmallRoom2.entities
        },
          {
            name             : "mageRoom",
            map              : LevelMageRoom.layer[0].data,
            decalMap         : LevelMageRoom.layer[1].data,
            collisionMap     : LevelMageRoom.layer[2].data,
            lightCollisionMap: LevelMageRoom.layer[3].data,
            maxOccurs        : 2,
            occurs           : 0,
            createXOffset    : 1,
            exitPos          : {x: 2, y: 3},
            entities         : ["EntitySkeletonWarrior",
              "EntityMage",
              "EntitySkeleton",
              "EntityRedBat",
              "EntityChest"],
            entityCount      : 2,
            spawnChance      : 0.25,
            levelEntities    : LevelMageRoom.entities
          },
          {
            name             : "ritualRoom",
            map              : LevelRitualRoom.layer[0].data,
            decalMap         : LevelRitualRoom.layer[1].data,
            collisionMap     : LevelRitualRoom.layer[2].data,
            lightCollisionMap: LevelRitualRoom.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            exitPos          : {x: 4, y: 3},
            entities         : ["EntityRedBat",
              "EntitySkeletonWarrior",
              "EntitySkeleton"],
            entityCount      : 3,
            spawnChance      : 0.25,
            levelEntities    : LevelRitualRoom.entities
          },
          {
            name             : "office",
            map              : LevelOffice.layer[0].data,
            decalMap         : LevelOffice.layer[1].data,
            collisionMap     : LevelOffice.layer[2].data,
            lightCollisionMap: LevelOffice.layer[3].data,
            maxOccurs        : 2,
            occurs           : 0,
            exitPos          : {x: 1, y: 5},
            entities         : ["EntityMage",
              "EntityRedBat",
              "EntitySkeleton",
              "EntitySkeletonWarrior"],
            entityCount      : 2,
            spawnChance      : 0.25,
            levelEntities    : LevelOffice.entities
          },
          {
            name             : "library",
            map              : LevelLibrary.layer[0].data,
            decalMap         : LevelLibrary.layer[1].data,
            collisionMap     : LevelLibrary.layer[2].data,
            lightCollisionMap: LevelLibrary.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            createXOffset    : 1,
            exitPos          : {x: 7, y: 4},
            entities         : ["EntitySkeletonWarrior",
              "EntityHealingPotionPickup",
              "EntityRedBat",
              "EntityChest"],
            entityCount      : 2,
            spawnChance      : 0.25,
            levelEntities    : LevelLibrary.entities
          }],
        [{
          name             : "smallRoom3",
          map              : LevelSmallRoom3.layer[0].data,
          decalMap         : LevelSmallRoom3.layer[1].data,
          collisionMap     : LevelSmallRoom3.layer[2].data,
          lightCollisionMap: LevelSmallRoom3.layer[3].data,
          maxOccurs        : 6,
          occurs           : 0,
          exitPos          : {x: 2, y: 2},
          entities         : ["EntityDajal",
            "EntityUshatar"],
          entityCount      : 1,
          spawnChance      : 0.5,
          levelEntities    : LevelSmallRoom3.entities
        },
          {
            name             : "circleRoom",
            map              : LevelCircleRoom.layer[0].data,
            decalMap         : LevelCircleRoom.layer[1].data,
            collisionMap     : LevelCircleRoom.layer[2].data,
            lightCollisionMap: LevelCircleRoom.layer[3].data,
            maxOccurs        : 4,
            occurs           : 0,
            exitPos          : {x: 5, y: 1},
            entities         : ["EntityAshdurbuk",
              "EntityHealingPotionPickup",
              "EntityRandomItemPickup",
              "EntityChest"],
            entityCount      : 1,
            spawnChance      : 0.25,
            levelEntities    : LevelCircleRoom.entities
          },
          {
            name             : "messHall",
            map              : LevelMessHall.layer[0].data,
            decalMap         : LevelMessHall.layer[1].data,
            collisionMap     : LevelMessHall.layer[2].data,
            lightCollisionMap: LevelMessHall.layer[3].data,
            maxOccurs        : 2,
            xOffset          : 5,
            occurs           : 0,
            exitPos          : {x: 13, y: 1},
            entities         : ["EntityDajal",
              "EntityOrcMage"],
            entityCount      : 3,
            spawnChance      : 0.25,
            levelEntities    : LevelMessHall.entities
          },
          {
            name             : "toilet",
            map              : LevelToilet.layer[0].data,
            decalMap         : LevelToilet.layer[1].data,
            collisionMap     : LevelToilet.layer[2].data,
            lightCollisionMap: LevelToilet.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            exitPos          : {x: 5, y: 1},
            entities         : ["EntityDajal",
              "EntityUshatar"],
            entityCount      : 2,
            spawnChance      : 0.25,
            levelEntities    : LevelToilet.entities
          },
          {
            name             : "storageRoom2",
            map              : LevelStorageRoom2.layer[0].data,
            decalMap         : LevelStorageRoom2.layer[1].data,
            collisionMap     : LevelStorageRoom2.layer[2].data,
            lightCollisionMap: LevelStorageRoom2.layer[3].data,
            maxOccurs        : 2,
            createXOffset    : 2,
            xOffset          : 2,
            yOffset          : 4,
            createYOffset    : 1,
            occurs           : 0,
            exitPos          : {x: 3, y: 1},
            entities         : ["EntityUshatar",
              "EntityRandomItemPickup",
              "EntityHealingPotionPickup",
              "EntityRandomItemPickup",
              "EntityRandomItemPickup",
              "EntityChest"],
            entityCount      : 2,
            spawnChance      : 0.5,
            levelEntities    : LevelStorageRoom2.entities
          },
          {
            name             : "hayRoom",
            map              : LevelHayRoom.layer[0].data,
            decalMap         : LevelHayRoom.layer[1].data,
            collisionMap     : LevelHayRoom.layer[2].data,
            lightCollisionMap: LevelHayRoom.layer[3].data,
            maxOccurs        : 3,
            occurs           : 0,
            exitPos          : {x: 8, y: 5},
            entities         : ["EntityDajal"],
            entityCount      : 6,
            spawnChance      : 0.5,
            levelEntities    : LevelHayRoom.entities
          }],
        [{
          name             : "smallRoom4",
          map              : LevelSmallRoom4.layer[0].data,
          decalMap         : LevelSmallRoom4.layer[1].data,
          collisionMap     : LevelSmallRoom4.layer[2].data,
          lightCollisionMap: LevelSmallRoom4.layer[3].data,
          maxOccurs        : 3,
          occurs           : 0,
          exitPos          : {x: 2, y: 2},
          entities         : ["EntityTroll",
            "EntityOgre",
            "EntityWolf"],
          entityCount      : 3,
          spawnChance      : 0.5,
          levelEntities    : LevelSmallRoom4.entities
        },
          {
            name             : "spiderCave",
            map              : LevelSpiderCave.layer[0].data,
            decalMap         : LevelSpiderCave.layer[1].data,
            collisionMap     : LevelSpiderCave.layer[2].data,
            lightCollisionMap: LevelSpiderCave.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            exitPos          : {x: 2, y: 2},
            entities         : ["EntitySpider",
              "EntitySpider",
              "EntitySpider",
              "EntityTroll"],
            entityCount      : 4,
            spawnChance      : 0.5,
            levelEntities    : LevelSpiderCave.entities
          },
          {
            name             : "pit",
            map              : LevelPit.layer[0].data,
            decalMap         : LevelPit.layer[1].data,
            collisionMap     : LevelPit.layer[2].data,
            lightCollisionMap: LevelPit.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            createYOffset    : 5,
            yOffset          : 5,
            exitPos          : {x: 1, y: 1},
            entities         : ["EntitySpider",
              "EntitySpider",
              "EntitySpider",
              "EntityTroll"],
            entityCount      : 1,
            spawnChance      : 0.5,
            levelEntities    : LevelPit.entities
          },
          {
            name             : "barracks",
            map              : LevelBarracks.layer[0].data,
            decalMap         : LevelBarracks.layer[1].data,
            collisionMap     : LevelBarracks.layer[2].data,
            lightCollisionMap: LevelBarracks.layer[3].data,
            maxOccurs        : 1,
            occurs           : 0,
            exitPos          : {x: 10, y: 8},
            entities         : [],
            entityCount      : 0,
            spawnChance      : 0.5,
            levelEntities    : LevelBarracks.entities
          }]],
      decals          : [4,
        5,
        6,
        7,
        8,
        9],
      setCoridoorTiles: function (depth) {
        console.log(depth);
        if (depth ===
          0)
        {
          this.ENTRANCE = 37;
          this.EXIT = 38;
          this.FLOOR = 33;
          this.FLOOR_2 = 35;
          this.TOP_LEFT_CORNER = 74;
          this.TOP_RIGHT_CORNER = 75;
          this.WALL_Y_1 = 44;
          this.WALL_Y_2 = 71;
          this.WALL_Y_3 = 1;
          this.WALL_Y_4 = 1;

          this.WALL_X_1 = 72;
          this.WALL_X_2 = 41;
          this.WALL_X_3 = 72;
          this.WALL_X_4 = 41;

          this.BOTTOM_LEFT_CORNER = 39;
          this.BOTTOM_RIGHT_CORNER = 77;
        }
        else {
          if (depth ===
            1)
          {
            this.ENTRANCE = 93;
            this.EXIT = 94;
            this.FLOOR = 89;
            this.FLOOR_2 = 91;
            this.TOP_LEFT_CORNER = 102;
            this.TOP_RIGHT_CORNER = 103;
            this.WALL_Y_1 = 71;
            this.WALL_Y_2 = 71;
            this.WALL_Y_3 = 71;
            this.WALL_Y_4 = 71;

            this.WALL_X_1 = 321;
            this.WALL_X_2 = 321;
            this.BOTTOM_LEFT_CORNER = 104;
            this.BOTTOM_RIGHT_CORNER = 105;
          }
          else {
            if (depth ===
              2)
            {
              this.ENTRANCE = 177;
              this.EXIT = 178;
              this.FLOOR = 175;
              this.FLOOR_2 = 176;
              this.TOP_LEFT_CORNER = 186;
              this.TOP_RIGHT_CORNER = 187;
              this.WALL_Y_1 = 71;
              this.WALL_Y_2 = 71;
              this.WALL_Y_3 = 71;
              this.WALL_Y_4 = 71;
              this.WALL_X_1 = 321;
              this.WALL_X_2 = 321;
              this.BOTTOM_LEFT_CORNER = 188;
              this.BOTTOM_RIGHT_CORNER = 189;
            }
            else {
              if (depth ===
                3)
              {
                this.ENTRANCE = 317;
                this.EXIT = 318;
                this.FLOOR = 313;
                this.FLOOR_2 = 315;
                this.TOP_LEFT_CORNER = 326;
                this.TOP_RIGHT_CORNER = 327;
                this.WALL_Y_1 = 71;
                this.WALL_Y_2 = 71;
                this.WALL_Y_3 = 71;
                this.WALL_Y_4 = 71;
                this.WALL_X_1 = 321;
                this.WALL_X_2 = 321;
                this.BOTTOM_LEFT_CORNER = 328;
                this.BOTTOM_RIGHT_CORNER = 329;
              }
            }
          }
        }
      },
      initTileMaps    : function (tileMap,
                                  collisionMap,
                                  decalMap,
                                  baseDecalMap,
                                  lightMap,
                                  lightCollisionMap,
                                  tileWidth,
                                  tileHeight) {
        for (var i = 0; i <
        tileHeight; i++)
        {
          tileMap.push([]);
          collisionMap.push([]);
          decalMap.push([]);
          baseDecalMap.push([]);
          lightCollisionMap.push([]);
          for (var j = 0; j <
          tileWidth; j++)
          {
            tileMap[i][j] = 0;
            collisionMap[i][j] = 1;
            lightCollisionMap[i][j] = 1;
            decalMap[i][j] = 0;
            baseDecalMap[i][j] = 0;
          }
        }
        for (i = 0; i <
        tileHeight; i++)
        {
          lightMap.push([]);
          for (var j = 0; j <
          tileWidth; j++)
          {
            if (zombotron.config.LIGHTMAP_ENABLED ===
              true)
            {
              lightMap[i][j] = 2;
            }
            else {
              lightMap[i][j] = 0;
            }
          }
        }
      },
      digRoom         : function (room,
                                  tileMap,
                                  decalMap,
                                  collisionMap,
                                  lightCollisionMap,
                                  addEntities) {
        var x, y;
        for (i = room.pos.y, y = 0; i <
        room.pos.y +
        room.roomDef.map.length; i++, y++)
        {
          for (j = room.pos.x, x = 0; j <
          room.pos.x +
          room.roomDef.map[0].length; j++, x++)
          {
            tileMap[i][j] = room.roomDef.map[y][x];
            decalMap[i][j] =
              room.roomDef.decalMap[y][x];
            collisionMap[i][j] = room.roomDef.collisionMap[y][x];
            lightCollisionMap[i][j] = room.roomDef.lightCollisionMap[y][x];
            if (room.roomDef.map[y][x] ===
              this.FLOOR &&
              decalMap[i][j] ===
              0)
            {
              var r = Math.random();
              if (r >
                0.90)
              {
                tileMap[i][j] = this.FLOOR_2;
              }
              r = Math.random();
              if (r >
                0.85)
              {
                decalMap[i][j] = this.decals[Math.floor(Math.random() *
                this.decals.length)];
              }
              if (addEntities ===
                true &&
                room.entities.length <
                room.roomDef.entityCount &&
                Math.random() >
                1 -
                room.roomDef.spawnChance)
              {
                room.entities.push({
                  type    : room.roomDef.entities[Math.floor(Math.random() *
                  room.roomDef.entities.length)],
                  x       : j *
                  zombotron.config.GRID_SIZE,
                  y       : i *
                  zombotron.config.GRID_SIZE,
                  settings: {}
                });
              }
            }
          }
        }
        if (room.roomDef.levelEntities) {
          for (var i = 0; i <
          room.roomDef.levelEntities.length; i++)
          {
            var posX = room.roomDef.levelEntities[i].x +
              room.pos.x *
              zombotron.config.GRID_SIZE, posY = room.roomDef.levelEntities[i].y +
              room.pos.y *
              zombotron.config.GRID_SIZE, added = false;
            for (var j = 0; j <
            room.entities.length; j++)
            {
              if (room.entities[j].x ===
                posX &&
                room.entities[j].y ===
                posY)
              {
                room.entities[j] = {
                  type    : room.roomDef.levelEntities[i].type, x: posX,
                  y       : posY,
                  settings: room.roomDef.levelEntities[i].settings
                };
                added = true;
              }
            }
            if (added ===
              false)
            {
              room.entities.push({
                type    : room.roomDef.levelEntities[i].type, x: posX, y: posY,
                settings: room.roomDef.levelEntities[i].settings
              });
            }
          }
        }
      },
      digCorridor     : function (wallX,
                                  wallY,
                                  coridoorLen,
                                  tileMap,
                                  collisionMap,
                                  lightCollisionMap,
                                  doorPosList,
                                  direction) {
        tileMap[wallY][wallX] = this.FLOOR;
        collisionMap[wallY][wallX] = 0;
        if (direction ===
          "+y")
        {
          tileMap[wallY -
          1][wallX -
          1] = this.TOP_RIGHT_CORNER;
          tileMap[wallY -
          1][wallX +
          1] = this.TOP_LEFT_CORNER;
          tileMap[wallY -
          1][wallX] = this.FLOOR;
          collisionMap[wallY -
          1][wallX] = 0;
          lightCollisionMap[wallY -
          1][wallX] = 0;
          for (var n = 0; n <=
          coridoorLen; n++)
          {
            if ((tileMap[wallY +
              n][wallX -
              1] ===
              this.FLOOR ||
              tileMap[wallY +
              n][wallX -
              1] ===
              this.FLOOR_2) ===
              false)
            {
              tileMap[wallY +
              n][wallX -
              1] = this.WALL_Y_1;
            }
            if ((tileMap[wallY +
              n][wallX +
              1] ===
              this.FLOOR ||
              tileMap[wallY +
              n][wallX +
              1] ===
              this.FLOOR_2) ===
              false)
            {
              tileMap[wallY +
              n][wallX +
              1] = this.WALL_Y_2;
            }
            tileMap[wallY +
            n][wallX] = this.FLOOR;
            collisionMap[wallY +
            n][wallX] = 0;
            lightCollisionMap[wallY +
            n][wallX] = 0;
          }
          if (tileMap[wallY +
            n][wallX -
            1] ===
            this.FLOOR ||
            tileMap[wallY +
            n][wallX -
            1] ===
            this.FLOOR_2)
          {
            tileMap[wallY +
            n -
            1][wallX -
            1] = this.BOTTOM_RIGHT_CORNER;
          }
          if (tileMap[wallY +
            n][wallX +
            1] ===
            this.FLOOR ||
            tileMap[wallY +
            n][wallX +
            1] ===
            this.FLOOR_2)
          {
            tileMap[wallY +
            n -
            1][wallX +
            1] = this.BOTTOM_LEFT_CORNER;
          }
          if (coridoorLen >=
            3)
          {
            doorPosList.push({
              x: wallX *
              zombotron.config.GRID_SIZE,
              y: (wallY -
              1) *
              zombotron.config.GRID_SIZE
            });
            doorPosList.push({
              x: wallX *
              zombotron.config.GRID_SIZE,
              y: (wallY +
              n -
              1) *
              zombotron.config.GRID_SIZE
            });
          }
          else {
            if (coridoorLen >
              1)
            {
              doorPosList.push({
                x: wallX *
                zombotron.config.GRID_SIZE,
                y: (wallY +
                n -
                1) *
                zombotron.config.GRID_SIZE
              });
            }
          }
        }
        else {
          if (direction ===
            "-y")
          {
            tileMap[wallY +
            1][wallX -
            1] = this.BOTTOM_RIGHT_CORNER;
            tileMap[wallY +
            1][wallX +
            1] = this.BOTTOM_LEFT_CORNER;
            tileMap[wallY +
            1][wallX] = this.FLOOR;
            collisionMap[wallY +
            1][wallX] = 0;
            lightCollisionMap[wallY +
            1][wallX] = 0;
            for (var n = 0; n <=
            coridoorLen +
            1; n++)
            {
              if ((tileMap[wallY -
                n][wallX -
                1] ===
                this.FLOOR ||
                tileMap[wallY -
                n][wallX -
                1] ===
                this.FLOOR_2) ===
                false)
              {
                tileMap[wallY -
                n][wallX -
                1] = this.WALL_Y_3;
              }
              if ((tileMap[wallY -
                n][wallX +
                1] ===
                this.FLOOR ||
                tileMap[wallY -
                n][wallX +
                1] ===
                this.FLOOR_2) ===
                false)
              {
                tileMap[wallY -
                n][wallX +
                1] = this.WALL_Y_4;
              }
              tileMap[wallY -
              n][wallX] = this.FLOOR;
              collisionMap[wallY -
              n][wallX] = 0;
              lightCollisionMap[wallY -
              n][wallX] = 0;
            }
            if (tileMap[wallY -
              n][wallX -
              1] ===
              this.FLOOR ||
              tileMap[wallY -
              n][wallX -
              1] ===
              this.FLOOR_2)
            {
              tileMap[wallY -
              n +
              1][wallX -
              1] = this.TOP_RIGHT_CORNER;
            }
            if (tileMap[wallY -
              n][wallX +
              1] ===
              this.FLOOR ||
              tileMap[wallY -
              n][wallX +
              1] ===
              this.FLOOR_2)
            {
              tileMap[wallY -
              n +
              1][wallX +
              1] = this.TOP_LEFT_CORNER;
            }
            if (coridoorLen >=
              3)
            {
              doorPosList.push({
                x: wallX *
                zombotron.config.GRID_SIZE,
                y: (wallY +
                1) *
                zombotron.config.GRID_SIZE
              });
              doorPosList.push({
                x: wallX *
                zombotron.config.GRID_SIZE,
                y: (wallY -
                (n -
                1)) *
                zombotron.config.GRID_SIZE
              });
            }
            else {
              if (coridoorLen >
                1)
              {
                doorPosList.push({
                  x: wallX *
                  zombotron.config.GRID_SIZE,
                  y: (wallY +
                  1) *
                  zombotron.config.GRID_SIZE
                });
              }
            }
          }
          else {
            if (direction ===
              "+x")
            {
              tileMap[wallY +
              1][wallX -
              1] = this.TOP_LEFT_CORNER;
              tileMap[wallY -
              1][wallX -
              1] = this.BOTTOM_LEFT_CORNER;
              tileMap[wallY][wallX -
              1] = this.FLOOR;
              collisionMap[wallY][wallX -
              1] = 0;
              lightCollisionMap[wallY][wallX -
              1] = 0;
              for (var n = 0; n <=
              coridoorLen; n++)
              {
                if ((tileMap[wallY +
                  1][wallX +
                  n] ===
                  this.FLOOR ||
                  tileMap[wallY +
                  1][wallX +
                  n] ===
                  this.FLOOR_2) ===
                  false)
                {
                  tileMap[wallY +
                  1][wallX +
                  n] = this.WALL_X_1;
                }
                if ((tileMap[wallY -
                  1][wallX +
                  n] ===
                  this.FLOOR ||
                  tileMap[wallY -
                  1][wallX +
                  n] ===
                  this.FLOOR_2) ===
                  false)
                {
                  tileMap[wallY -
                  1][wallX +
                  n] = this.WALL_X_2;
                }
                tileMap[wallY][wallX +
                n] = this.FLOOR;
                collisionMap[wallY][wallX +
                n] = 0;
                lightCollisionMap[wallY][wallX +
                n] = 0;
              }
              if (tileMap[wallY +
                1][wallX +
                n] ===
                this.FLOOR ||
                tileMap[wallY +
                1][wallX +
                n] ===
                this.FLOOR_2)
              {
                tileMap[wallY +
                1][wallX +
                n -
                1] = this.TOP_RIGHT_CORNER;
              }
              if (tileMap[wallY -
                1][wallX +
                n] ===
                this.FLOOR ||
                tileMap[wallY -
                1][wallX +
                n] ===
                this.FLOOR_2)
              {
                tileMap[wallY -
                1][wallX +
                n -
                1] = this.BOTTOM_RIGHT_CORNER;
              }
              if (coridoorLen >=
                3)
              {
                doorPosList.push({
                  x: (wallX -
                  1) *
                  zombotron.config.GRID_SIZE,
                  y: wallY *
                  zombotron.config.GRID_SIZE
                });
                doorPosList.push({
                  x: (wallX +
                  n -
                  1) *
                  zombotron.config.GRID_SIZE,
                  y: wallY *
                  zombotron.config.GRID_SIZE
                });
              }
              else {
                if (coridoorLen >
                  1)
                {
                  doorPosList.push({
                    x: (wallX -
                    1) *
                    zombotron.config.GRID_SIZE,
                    y: wallY *
                    zombotron.config.GRID_SIZE
                  });
                }
              }
            }
            else {
              if (direction ===
                "-x")
              {
                tileMap[wallY +
                1][wallX +
                1] = this.TOP_RIGHT_CORNER;
                tileMap[wallY -
                1][wallX +
                1] = this.BOTTOM_RIGHT_CORNER;
                tileMap[wallY][wallX +
                1] = this.FLOOR;
                collisionMap[wallY][wallX +
                1] = 0;
                lightCollisionMap[wallY][wallX +
                1] = 0;
                for (var n = 0; n <=
                coridoorLen +
                1; n++)
                {
                  if ((tileMap[wallY +
                    1][wallX -
                    n] ===
                    this.FLOOR ||
                    tileMap[wallY +
                    1][wallX -
                    n] ===
                    this.FLOOR_2) ===
                    false)
                  {
                    tileMap[wallY +
                    1][wallX -
                    n] = this.WALL_X_3;
                  }
                  if ((tileMap[wallY -
                    1][wallX -
                    n] ===
                    this.FLOOR ||
                    tileMap[wallY -
                    1][wallX -
                    n] ===
                    this.FLOOR_2) ===
                    false)
                  {
                    tileMap[wallY -
                    1][wallX -
                    n] = this.WALL_X_4;
                  }
                  tileMap[wallY][wallX -
                  n] = this.FLOOR;
                  collisionMap[wallY][wallX -
                  n] = 0;
                  lightCollisionMap[wallY][wallX -
                  n] = 0;
                }
                if (tileMap[wallY +
                  1][wallX -
                  n] ===
                  this.FLOOR ||
                  tileMap[wallY +
                  1][wallX -
                  n] ===
                  this.FLOOR_2)
                {
                  tileMap[wallY +
                  1][wallX -
                  n +
                  1] = this.TOP_LEFT_CORNER;
                }
                if (tileMap[wallY -
                  1][wallX -
                  n] ===
                  this.FLOOR ||
                  tileMap[wallY -
                  1][wallX -
                  n] ===
                  this.FLOOR_2)
                {
                  tileMap[wallY -
                  1][wallX -
                  n +
                  1] = this.BOTTOM_LEFT_CORNER;
                }
                if (coridoorLen >=
                  3)
                {
                  doorPosList.push({
                    x: (wallX +
                    1) *
                    zombotron.config.GRID_SIZE,
                    y: wallY *
                    zombotron.config.GRID_SIZE
                  });
                  doorPosList.push({
                    x: (wallX -
                    (n -
                    1)) *
                    zombotron.config.GRID_SIZE,
                    y: wallY *
                    zombotron.config.GRID_SIZE
                  });
                }
                else {
                  if (coridoorLen >
                    1)
                  {
                    doorPosList.push({
                      x: (wallX +
                      1) *
                      zombotron.config.GRID_SIZE,
                      y: wallY *
                      zombotron.config.GRID_SIZE
                    });
                  }
                }
              }
            }
          }
        }
      },
      scanArea        : function (room,
                                  tileMap) {
        var clear = true;
        for (i = room.pos.y; i <
        room.pos.y +
        room.roomDef.map.length; i++)
        {
          for (j = room.pos.x; j <
          room.pos.x +
          room.roomDef.map[0].length; j++)
          {
            if (tileMap[i] ===
              undefined ||
              tileMap[i][j] ===
              undefined)
            {
              clear = undefined
            }
            else {
              if (tileMap[i][j] !==
                0)
              {
                clear = false;
              }
            }
          }
        }
        return clear;
      },
      generateLevel   : function (depth) {
        this.setCoridoorTiles(depth);
        var tileWidth = 250, tileHeight = 250, lastRoom = 0, roomCount = 0, maxRooms = 5, rooms = [], tileMap = [], collisionMap = [], decalMap = [], baseDecalMap = [], doorPosList = [], lightMap = [], lightCollisionMap = [];
        this.initTileMaps(tileMap,
          collisionMap,
          decalMap,
          baseDecalMap,
          lightMap,
          lightCollisionMap,
          tileWidth,
          tileHeight);
        rooms.push({
          roomDef : this.startRooms[depth],
          roomDef : this.startRooms[depth],
          pos     : {x: 30, y: 30},
          entities: []
        });
        this.digRoom(rooms[0],
          tileMap,
          decalMap,
          collisionMap,
          lightCollisionMap,
          false);
        while (roomCount <
        maxRooms &&
        this.dungeonFeatures[depth].length >
        0)
        {
          var randomPos, wallX, wallY, direction, fromX, fromY, nextRoom, coridoorLen;
          lastRoom = Math.floor(Math.random() *
          rooms.length);
          nextRoom = {
            roomDef: this.dungeonFeatures[depth][Math.floor(Math.random() *
            this.dungeonFeatures[depth].length)],
            pos    : {}, entities: []
          };
          coridoorLen = Math.ceil(Math.random() *
          Math.min(4,
            nextRoom.roomDef.collisionMap[0].length -
            2));
          randomPos = Math.random();
          if (randomPos <
            0.25)
          {
            wallX = Math.floor(rooms[lastRoom].roomDef.map[0].length /
            2) +
            rooms[lastRoom].pos.x;
            if (rooms[lastRoom].roomDef.createXOffset) {
              wallX = wallX -
              rooms[lastRoom].roomDef.createXOffset;
            }
            wallY = rooms[lastRoom].roomDef.map.length +
            rooms[lastRoom].pos.y;
            if (nextRoom.roomDef.xOffset) {
              fromX = wallX -
              nextRoom.roomDef.xOffset;
            }
            else {
              fromX = wallX -
              3;
            }
            fromY = wallY +
            coridoorLen;
            direction = "+y";
          }
          else {
            if (randomPos <
              0.50)
            {
              wallX = Math.floor(rooms[lastRoom].roomDef.map[0].length /
              2) +
              rooms[lastRoom].pos.x;
              if (rooms[lastRoom].roomDef.createXOffset) {
                wallX = wallX -
                rooms[lastRoom].roomDef.createXOffset;
              }
              wallY = rooms[lastRoom].pos.y -
              1;
              if (nextRoom.roomDef.xOffset) {
                fromX = wallX -
                nextRoom.roomDef.xOffset;
              }
              else {
                fromX = wallX -
                3;
              }
              fromY = wallY -
              nextRoom.roomDef.map.length -
              coridoorLen;
              direction = "-y"
            }
            else {
              if (randomPos <
                0.75)
              {
                wallX = rooms[lastRoom].roomDef.map[0].length +
                rooms[lastRoom].pos.x;
                wallY = Math.floor(rooms[lastRoom].roomDef.map.length /
                2) +
                rooms[lastRoom].pos.y;
                fromX = wallX +
                coridoorLen;
                if (nextRoom.roomDef.yOffset) {
                  fromY = wallY -
                  nextRoom.roomDef.yOffset;
                }
                else {
                  fromY = wallY -
                  3;
                }
                direction = "+x";
              }
              else {
                wallX = rooms[lastRoom].pos.x -
                1;
                wallY = Math.floor(rooms[lastRoom].roomDef.map.length /
                2) +
                rooms[lastRoom].pos.y;
                fromX = wallX -
                nextRoom.roomDef.map[0].length -
                coridoorLen;
                if (nextRoom.roomDef.yOffset) {
                  fromY = wallY -
                  nextRoom.roomDef.yOffset;
                }
                else {
                  fromY = wallY -
                  3;
                }
                direction = "-x";
              }
            }
          }
          nextRoom.pos.x = fromX;
          nextRoom.pos.y = fromY;
          var areaClear = this.scanArea(nextRoom,
            tileMap);
          if (areaClear ===
            undefined)
          {
            roomCount++;
            continue;
          }
          else {
            if (areaClear ===
              true)
            {
              if (nextRoom.roomDef.maxOccurs &&
                nextRoom.roomDef.occurs >=
                nextRoom.roomDef.maxOccurs)
              {
                this.dungeonFeatures[depth].splice(this.dungeonFeatures[depth].indexOf(nextRoom.roomDef),
                  1);
                if (this.dungeonFeatures[depth].length ===
                  0)
                {
                  break;
                }
                else {
                  continue;
                }
              }
              else {
                if (nextRoom.roomDef.maxOccurs) {
                  nextRoom.roomDef.occurs++;
                }
              }
              this.digRoom(nextRoom,
                tileMap,
                decalMap,
                collisionMap,
                lightCollisionMap,
                true);
              rooms.push(nextRoom);
              lastRoom++;
              roomCount++;
              this.digCorridor(wallX,
                wallY,
                coridoorLen,
                tileMap,
                collisionMap,
                lightCollisionMap,
                doorPosList,
                direction);
            }
            else {
              continue;
            }
          }
        }
        baseDecalMap[(rooms[0].pos.y +
        1)][(rooms[0].pos.x +
        rooms[0].roomDef.map[0].length -
        2)] = this.ENTRANCE;
        baseDecalMap[rooms[rooms.length -
        1].roomDef.exitPos.y +
        rooms[rooms.length -
        1].pos.y][rooms[rooms.length -
        1].roomDef.exitPos.x +
        rooms[rooms.length -
        1].pos.x] =
          this.EXIT;
        decalMap[(rooms[0].pos.y +
        1)][(rooms[0].pos.x +
        rooms[0].roomDef.map[0].length -
        2)] = 0;
        decalMap[rooms[rooms.length -
        1].roomDef.exitPos.y +
        rooms[rooms.length -
        1].pos.y][rooms[rooms.length -
        1].roomDef.exitPos.x +
        rooms[rooms.length -
        1].pos.x] =
          0;
        var level = {
          lightCollisionMap: {
            tilesize: 24,
            data    : lightCollisionMap,
            name    : "lightcollisionmap"
          }, entities      : [{
            type                              : "EntityPlayerStart",
            x                                 : (rooms[0].pos.x +
            rooms[0].roomDef.map[0].length -
            2) *
            zombotron.config.GRID_SIZE,
            y                                 : (rooms[0].pos.y +
            1) *
            zombotron.config.GRID_SIZE, settings: {}
          },
            {
              type    : "EntityExit",
              x       : (rooms[rooms.length -
              1].roomDef.exitPos.x +
              rooms[rooms.length -
              1].pos.x) *
              zombotron.config.GRID_SIZE,
              y       : (rooms[rooms.length -
              1].roomDef.exitPos.y +
              rooms[rooms.length -
              1].pos.y) *
              zombotron.config.GRID_SIZE,
              settings: {}
            }], layer      : [{
            name       : "main",
            visible    : 1,
            tilesetName: "assets/tilesheets/wall-floor.png",
            tilesize   : 24,
            foreground : false,
            repeat     : false,
            distance   : 1,
            data       : tileMap
          },
            {
              name       : "baseDecals",
              visible    : 1,
              tilesetName: "assets/tilesheets/wall-floor.png",
              tilesize   : 24,
              foreground : false,
              repeat     : false,
              distance   : 1,
              data       : baseDecalMap
            },
            {
              name       : "decals",
              visible    : 1,
              tilesetName: "media/decals.png",
              tilesize   : 24,
              foreground : false,
              repeat     : false,
              distance   : 1,
              data       : decalMap
            },
            {name: "collision", tilesize: 24, data: collisionMap},
            {
              name       : "lightMap",
              isLightMap : true,
              visible    : 1,
              tilesetName: "media/darkness-tiles.png",
              tilesize   : 24,
              foreground : true,
              repeat     : false,
              distance   : 1,
              data       : lightMap
            }]
        };
        for (var p = 0; p <
        rooms.length; p++)
        {
          for (var t = 0; t <
          rooms[p].entities.length; t++)
          {
            level.entities.push(rooms[p].entities[t]);
          }
        }
        for (var l = 0; l <
        doorPosList.length; l++)
        {
          level.entities.push({
            type    : "EntityDoor",
            x       : doorPosList[l].x,
            y       : doorPosList[l].y,
            settings: {}
          });
        }
        return level;
      }
    });
  });

