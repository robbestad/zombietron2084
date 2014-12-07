/**
 * Zombie is used to demo complex pathfinding.
 */
ig.module(
  'game.entities.big-zombie'
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

    ig.EntityBigZombie = ig.global.EntityBigZombie = ig.Creature.extend({

      size: {
        x: 8,
        y: 16
      },
      offset: {
        x: 0,
        y: 0
      },

      // zombies collide

      collides: ig.EntityExtended.COLLIDES.FIXED,

      // animations the Impact++ way

      animSheet: new ig.AnimationSheet(_c.PATH_TO_MEDIA + 'bigzombie.png', 8, 16),

      animInit: "idleX",

      name:"zombie",
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
        x: 30,
        y: 30
      },

      // stats

      health: 18,

      // explode with a few green particles when killed

      deathSettings: {
        spawnCountMax: 16,
        spawnSettings: {
          animTileOffset: ig.EntityParticleColor.colorOffsets.GREEN
        }
      },
      //
      //check: function( other ) {
      //  console.log(other.name);
      //  if(other.name=="player"){ ig.game.gameData.points+=10; this.die();}
      //  else if(other.name=="zombie") this.die();
      //  else if(other.name=="enemy") this.die();
      //  else if(other.name=="people") { }
      //  else console.log(other.name);
      //
      //},

      // zombies can't jump or climb

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

      predatorClass: 'ENEMY',

      // use this method to add types for checks
      // since we are using bitwise flags
      // we can take advantage of the fact that they can be added

      initTypes: function() {

        this.parent();

        // zombies seeks friend group

        _ut.addType(ig.EntityExtended, this, 'preyGroup', "FRIEND", "GROUP");
        // zombies can be damaged

        _ut.addType(ig.EntityExtended, this, 'type', "DAMAGEABLE");
        //_ut.addType(ig.EntityExtended, this, 'checkAgainst', "PLAYER");

        // zombies are in enemy group and will not collide with or hurt each other

        _ut.addType(ig.EntityExtended, this, 'group', "ENEMY", "GROUP");

        // zombies will collide and hurt any character not in their group

        _ut.addType(ig.EntityExtended, this, 'checkAgainst', "FRIEND");

      },

      // use this method to add properties
      // that need to be initialized one time
      // before the entity is added to the game

      initProperties: function() {

        this.parent();

        this.glow = new ig.AbilityGlow(this,{
          alpha:0.07
        });


        this.melee = new ig.AbilityMelee(this, {
          // target will be provided by attack method
          canFindTarget: false,
          // one shot kill player
          damage: 6,
          // shorter range than melee default
          // about half of character width
          rangeX: this.size.x * 0.5
        });

        this.abilities.addDescendants([
          this.melee,this.glow
        ]);

      },

      // when creatures are pursuing prey
      // they will try to attack

      attack: function(entity) {

        this.melee.setEntityTarget(entity);

        if (this.melee.entityTarget) {

          var closeEnough = this.melee.closeEnough();

          this.melee.activate();

          return closeEnough;

        } else {

          // the original attack method does a basic distance check

          return this.parent();

        }

      }

    });

  });
