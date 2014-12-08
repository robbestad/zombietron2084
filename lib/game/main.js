ig.module(
    'game.main'
)
.requires(
    'plusplus.core.plusplus',
    'game.entities.player',
    'plusplus.ui.ui-overlay',
    'game.levels.title',
    'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.levels.level4',
    'game.levels.level5',
    'game.levels.level6'
    ,'plusplus.entities.levelchange'
)
// define the main module
.defines(function() {
    "use strict";
    var _c = ig.CONFIG;

    // have your game class extend Impact++'s game class
    var game = ig.GameExtended.extend({
        backgroundMap:null,
        clearcolor:'#ffffff',
        scorefont:new ig.Font( _c.PATH_TO_MEDIA + 'fonts/kenpixel.futuresquare.8px.png' ),
        startTimer:new ig.Timer(2),
        transitionTimer:new ig.Timer(2),
        restartTimer:new ig.Timer(4),
        tiles:new ig.Image('media/tiles.png'),
        playerDead:false,
        gameData:{
          gameStarted:false,
          level:0,
          points:0
        },

      // get the collision map shapes for lighting and shadows
      shapesPasses: {
        lighting: {
          ignoreClimbable: true, discardBoundaryInner: true
        }
      },


      // override the game init function
      init        : function () {
        this.parent();
        this.loadLevel(ig.global.LevelTitle);

      },

      // arrows / arrows to shoot
      inputStart  : function () {
        this.parent();
        ig.input.bind(ig.KEY.UP_ARROW, 'shoot-up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'shoot-down');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'shoot-left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'shoot-right');
        ig.input.bind(ig.KEY.R, 'restart');
      },


      update: function () {
        this.parent();
        if (ig.input.pressed('restart')) {
          this.playerDead = false;
          ig.game.loadLevel(LevelLevel1);
        }


        var startNewGame = false;
        this.playerDead = "undefined" == typeof ig.game.getPlayer();
        if (!this.playerDead) {

          if ("undefined" == typeof ig.game.getPlayer()) {
            this.playerDead = true;
            var dimmer = ig.game.spawnEntity(ig.UIOverlay, 0, 0, {
              // set its layer to ui so it doesn't get paused
              layerName: 'ui', fillStyle: '#000000', // start its alpha at 0
              alpha    : 0
              // ui elements have a default position of top left
            });
            var overlay = new ig.UIOverlay();
            dimmer.fadeTo(0.75);

          }


          if (ig.game.startTimer.delta() > 0) {
            for (var i = 0; i < ig.game.entities.length; i++) {
              if (ig.game.entities[i].name == "zombie") {
                ig.game.transitionTimer.set(0.2);
                return;
              }
              startNewGame = true;

            }

            if (startNewGame) {
              if (ig.game.transitionTimer.delta() > 0) {
                var player = ig.game.getPlayer();
                Zombotron.gameData.level = Zombotron.gameData.level + 1;
                if(Zombotron.gameData.level>6) Zombotron.gameData.level=4; // hack
                ig.game.transitionTimer.set(2000);
                console.log("LevelLevel" + Zombotron.gameData.level);
                ig.game.spawnEntity(EntityLevelchange, player.pos.x,
                  player.pos.y, {
                    "size"        : {
                      "x": 16, "y": 32
                    }, "levelName": "LevelLevel" + Zombotron.gameData.level, "playerSpawnerName": "roderick"
                  });
              }
            }

          }
        }
      },


      draw: function () {
        this.parent();
        this.scorefont.draw("ZOMBIETRON 2084 - SCORE: " + ig.game.gameData.points,
          ig.system.width / 2, 10, ig.Font.ALIGN.CENTER);

        if (this.playerDead) {
          this.scorefont.draw("Game Over", ig.system.width / 2,
            ig.system.height / 2 - 10, ig.Font.ALIGN.CENTER);
          this.scorefont.draw("Press R to restart", ig.system.width / 2,
            ig.system.height / 2 + 10, ig.Font.ALIGN.CENTER);
        }

      },

      inputEnd: function () {
        this.parent();
        ig.input.unbind(ig.KEY.UP_ARROW, 'shoot-up');
        ig.input.unbind(ig.KEY.DOWN_ARROW, 'shoot-down');
        ig.input.unbind(ig.KEY.LEFT_ARROW, 'shoot-left');
        ig.input.unbind(ig.KEY.RIGHT_ARROW, 'shoot-right');
        ig.input.unbind(ig.KEY.R, 'restart');

      }
    });

    ig.main('#canvas', game, 60, _c.GAME_WIDTH, _c.GAME_HEIGHT, _c.SCALE,
      ig.LoaderExtended);

  });
