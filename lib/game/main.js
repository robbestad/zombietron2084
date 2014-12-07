// starting with Impact++ is simple!
// setup a main game file, such as 'game/main.js'
// that you load right after ImpactJS
// and inside this file...
// setup the main module
ig.module(
    'game.main'
)
// now require the appropriate files
.requires(

    // the following are the only files required to use Impact++

    'plusplus.core.plusplus',

    // the remaining files are all specific to this demo

    'game.entities.player',
    'game.entities.spike',

    'game.ui.ui-toggle-gfx-min',
    'game.ui.ui-toggle-gfx-max',

    'plusplus.ui.ui-toggle-pause',
  'plusplus.ui.ui-overlay',

    'game.levels.side-scrolling',
    'game.levels.title',
    'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'game.levels.level4',
    'game.levels.transition'
    ,'plusplus.entities.levelchange'


// debug while developing
    // remove before release!

    //,'plusplus.debug.debug'

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
        gameWillRestart:false,
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
                ignoreClimbable: true,
                discardBoundaryInner: true
            }
        },

        // override the loadlevel function
        reloadLevel: function( data ) {

          ig.game.transitionTimer.set(10000000);

        // this.parent( data );
        //this.backgroundMaps.erase( this.backgroundMap );

        //ig.system.clear(this.clearcolor);
        var bgmapdata=[];

          bgmapdata = [
            [0,0,0,5,0,5,0,0,5,0,5,0,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,0,0],
            [0,7,5,5,6,5,5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,0],
            [0,7,1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0],
            [5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
            [0,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5],
            [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
            [0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,5,5],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,5,0],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,5,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,7,5],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
            [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7],
            [5,5,1,0,0,0,0,0,0,0,0,1,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
            [5,5,1,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5],
            [5,0,0,0,0,0,0,0,0,8,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,5],
            [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,6,5],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,0,5,5],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5],
            [5,7,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,7,0],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,5],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,5],
            [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0],
            [0,5,5,5,8,5,7,5,5,5,5,5,5,5,8,7,5,5,5,5,5,5,5,5,5,5,5,5,8,5,5,5,5,5,5,5,5,7,8,8,5,5,5,0],
            [0,0,0,5,0,0,0,5,0,5,5,5,0,5,5,5,5,5,5,0,0,0,5,0,0,0,0,0,0,0,5,0,0,0,5,5,5,5,5,0,0,0,0,0]
          ];
          var bg = new ig.BackgroundMap( 8, bgmapdata, this.tiles );
          // Move
          bg.setScreenPos( 0, 0 );
          ig.game.backgroundMaps[0]=bg;
          // Draw
          //bg.draw();
          //ig.game.backgroundMaps[0] = bg;
          //this.backgroundMap = this.backgroundMaps[0];


        },


        // override the game init function
        init: function() {

            this.parent();

            // so we can load the first level
            // which of course you didn't forget to require above

          this.loadLevel(ig.global.LevelTitle);

        },

        // wasd
        // arrows / arrows to shoot
        inputStart: function() {

            this.parent();

            ig.input.bind(ig.KEY.UP_ARROW, 'shoot-up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'shoot-down');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'shoot-left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'shoot-right');
            ig.input.bind(ig.KEY.R, 'restart');

        },



      uibutton:function(){
        var restartButton = ig.game.spawnEntity(ig.UIElement, 0, 0, {
          margin: {
            x: 0.02,
            y: 0.02
          }
        });
        restartButton.onActivated.add( ig.game.loadLevel(LevelTitle));
        //
        //
        //var _c = ig.CONFIG;
        //var score = ig.game.spawnEntity(ig.UIText, 0, 0, {
        //  font: new ig.Font( _c.PATH_TO_MEDIA + 'font_04b03_white_16.png' ),
        //  text: 'Score: 9000'
        //});

      },

      update:function(){
        this.parent();
        if (ig.input.pressed('restart')) {
          this.playerDead=false;
          ig.game.loadLevel(LevelTitle);
        }

        //if(this.gameWillRestart) {
        //  if(this.restartTimer.delta()>0) {
        //    this.gameWillRestart=false;
        //    this.playerDead=false;
        //    this.restartTimer.set(1000000);
        //    ig.game.loadLevel(LevelTitle);
        //    }
        //  }

        var startNewGame=false;
        if("undefined"==typeof ig.game.getPlayer()) {
          this.playerDead = true;
        } else {
          this.playerDead = false;

        }
        if(!this.playerDead){

        if("undefined"==typeof ig.game.getPlayer()){
          this.playerDead=true;
          var dimmer = ig.game.spawnEntity(ig.UIOverlay, 0, 0, {
              // set its layer to ui so it doesn't get paused
              layerName: 'ui',
              fillStyle: '#000000',
              // start its alpha at 0
              alpha: 0
              // ui elements have a default position of top left
            });
          var overlay=new ig.UIOverlay();
// then we fade it in to 75% alpha
          dimmer.fadeTo(0.75);
// the above methods can be mixed and matched as needed
// overlays can also create text
// it just requires the text settings to be set
          overlay.textSettings = {
            text: "Final score: " +Zombotron.gameData.points
          };
          var font= new ig.Font( _c.PATH_TO_MEDIA + 'fonts/kenpixel.blocks.8px.png' );
          overlay.textSettings.font = font;

//          return;
        }


        if(ig.game.startTimer.delta()>0){
        for (var i=0;i<ig.game.entities.length;i++) {
          if(ig.game.entities[i].name=="zombie"){
            ig.game.transitionTimer.set(0.2);
            return;
          }
          startNewGame=true;

        }

          if(startNewGame) {
            if(ig.game.transitionTimer.delta()>0) {
              var player = ig.game.getPlayer();
              Zombotron.gameData.level=Zombotron.gameData.level+1;
              ig.game.transitionTimer.set(2000);
              console.log( "LevelLevel"+Zombotron.gameData.level);
              ig.game.spawnEntity(EntityLevelchange, player.pos.x, player.pos.y,
                {   "size": {
                      "x": 16,
                      "y": 32
                    },
                    "levelName": "LevelLevel"+Zombotron.gameData.level,
                    "playerSpawnerName": "roderick"
              });
            }
          }

        }
}
      },


      draw:function(){
        this.parent();
        this.scorefont.draw("ZOMBIETRON 2084 - SCORE: "+ig.game.gameData.points, ig.system.width/2, 10, ig.Font.ALIGN.CENTER);

        if(this.playerDead){
          this.scorefont.draw("Game Over", ig.system.width/2, ig.system.height/2-10, ig.Font.ALIGN.CENTER);
          this.scorefont.draw("Press R to restart", ig.system.width/2, ig.system.height/2+10, ig.Font.ALIGN.CENTER);
        }

      },

        inputEnd: function() {
            this.parent();
            ig.input.unbind(ig.KEY.UP_ARROW, 'shoot-up');
            ig.input.unbind(ig.KEY.DOWN_ARROW, 'shoot-down');
            ig.input.unbind(ig.KEY.LEFT_ARROW, 'shoot-left');
            ig.input.unbind(ig.KEY.RIGHT_ARROW, 'shoot-right');
            ig.input.unbind(ig.KEY.R, 'restart');

        }
    });

    // now lets boot up impact with
    // our game and config settings
    // we've modified Impact++'s 'config-user.js' file
    // to override some of the default settings
    ig.main(
        '#canvas',
        game,
        60,
        _c.GAME_WIDTH,
        _c.GAME_HEIGHT,
        _c.SCALE,
        ig.LoaderExtended
    );

});
