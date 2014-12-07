/**
 * Save'em all
 */
ig.module(
  'game.entities.people'
)
  .requires(
  // note that anything in abstractities
  // is an abstract entity that needs to be extended
  'plusplus.abstractities.creature',
  // a melee ability
  'plusplus.abilities.melee',
  // if you want to use the config
  // don't forget to require it
  'plusplus.core.config',
  // and some utils
  'plusplus.helpers.utils'
)
  .defines(function() {
    "use strict";

    var _c = ig.CONFIG;
    var _ut = ig.utils;

    ig.EntityPeople = ig.global.EntityPeople = ig.Creature.extend({

      size: {
        x: 8,
        y: 16
      },
      offset: {
        x: 0,
        y: 0
      },



      // people collide

      collides: ig.EntityExtended.COLLIDES.FIXED,

      check: function( other ) {
        if(other.name=="player"){ ig.game.gameData.points+=10; this.die();}
        else if(other.name=="zombie") this.die();
        else if(other.name=="enemy") this.die();
        else if(other.name=="people") { }
        else console.log(other.name);

      },

      // animations the Impact++ way

      animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'people.png', 8, 16),

      animInit: "idleX",

    name:"people",
      animSettings: {
        idleX: {
          frameTime: 0.08,
          sequence: [0,1,2]
        },
        idleLeft: {
          frameTime: 0.1,
          sequence: [9,10,11]
        },
        idleRight: {
          frameTime: 0.1,
          sequence: [9,10,11]
        },
        moveX: {
          frameTime: 0.1,
          sequence: [9,10,11]
        },
        moveLeft: {
          frameTime: 0.1,
          sequence: [9,10,11]
        },
        moveRight: {
          frameTime: 0.1,
          sequence: [9,10,11]
        },
        idleY: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        },
        idleUp: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        },
        idleDown: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        },
        moveY: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        },
        moveUp: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        },
        moveDown: {
          frameTime: 0.08,
          sequence: [0, 1, 2]
        }
      },

      // for the ghost we expect specific animations
      // so that we don't have to write every direction
      // into the animSettings

      animsExpected: [
        "idleX",
        "idleLeft",
        "idleRight",
        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown",
        "melee"
      ],

      // don't flip y

      canFlipX: true,
      canFlipY: false,


      // ghost isn't affected by gravity

      gravityFactor: 0,

      // lets slow it downnnnnnn

      maxVelGrounded: {
        x: 25,
        y: 25
      },
      frictionGrounded: {
        x: 800,
        y: 800
      },
      speed: {
        x: 70,
        y: 70
      },

      // stats

      health: 1,

      // explode with a few green particles when killed

      deathSettings: {
        spawnCountMax: 16,
        spawnSettings: {
          animTileOffset: ig.EntityParticleColor.colorOffsets.BLUE
        }
      },

      // people can't jump or climb

      canJump: false,
      canClimb: false,

      // but they can wander!

      canWanderX: true,
      canWanderY: true,

      // instead of switching wander direction
      // when hitting a wall, lets switch at random also

      wanderSwitchChance: 0.005,
      wanderSwitchChanceStopped: 0.015,

      // don't wander too far away from tether

      tetherDistance: 150,

      // don't notice prey too far away

      reactionDistance: 125,

      // but once we've got the scent
      // follow prey beyond reaction distance

      moveToPreySettings: {
        searchDistance: 150
      },

      // use this method to add types for checks
      // since we are using bitwise flags
      // we can take advantage of the fact that they can be added

      initTypes: function() {

        this.parent();


        _ut.addType(ig.EntityExtended, this, 'checkAgainst', "DAMAGEABLE");
        //_ut.addType( ig.EntityExtended, this, "checkAgainst", "PLAYER" );


        // people seeks friend group

        _ut.addType(ig.EntityExtended, this, 'predatorType', "ENEMY", "GROUP");
        //_ut.addType(ig.EntityExtended, this, 'preyGroup', "ENEMY", "GROUP");
        //_ut.addType(ig.EntityExtended, this, 'predatorClass', "ENEMY", "GROUP");


        // people can be damaged

        _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");

        // people are in enemy group and will not collide with or hurt each other

        //_ut.addType(ig.EntityExtended, this, 'group', "FRIEND", "GROUP");

        // people will collide and hurt any character not in their group

        //_ut.addType(ig.EntityExtended, this, 'checkAgainst', "BOTH");

      },

      // use this method to add properties
      // that need to be initialized one time
      // before the entity is added to the game

      initProperties: function() {

        this.parent();

        this.glow = new ig.AbilityGlow(this,{
          alpha:0.07
        });

        this.abilities.addDescendants([
          this.glow
        ]);

      }


    });

  });
