// Export module
module.exports =
{
  /*
  * Perform Creep Actions
  * Perform actions for each creep
  */
  performCreepActions: function()
  {
    // Perform actions for each different creep type
    for (var name in Game.creeps) 
    {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            var role_harvester = require('role.harvester');
            role_harvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            var role_upgrader = require('role.upgrader');
            role_upgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            var role_builder = require('role.builder');
            role_builder.run(creep);
        }
        else if (creep.memory.role == 'miner') {
            var role_miner = require('role.miner');
            role_miner.run(creep);
        }
        else if (creep.memory.role == 'transporter') {
            var role_transporter = require('role.transporter');
            role_transporter.run(creep);
        }
    }
  },

  /*
  * Perform Creep Spawning
  * Perform creep autospawning/creation
  */
  performCreepSpawning: function ()
  {
    // Require
    var creep_creator = require('handler.creep_creator');
    var consts        = require('consts.js');

    // Get all different creep types
    var harvesters   = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders    = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders     = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var miners       = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');

    // Auto spawn harvesters
    if (harvesters.length < 0) {
        creep_creator.createCreep(Game.spawns['Spawn1'], 'harvester', [MOVE,WORK,CARRY,CARRY]);
    }
    // Auto spawn miners
    else if (miners.length < 2) {
        creep_creator.createCreep(Game.spawns['Spawn1'], 'miner', [MOVE,WORK,WORK,WORK,WORK,WORK]);
    }
    // Auto spawn transporters
    else if (transporters.length < 4) {
        creep_creator.createCreep(Game.spawns['Spawn1'], 'transporter', [MOVE,MOVE,CARRY,CARRY,CARRY,CARRY]);
    }
    // Auto spawn upgraders
    else if (upgraders.length < 8) {
        creep_creator.createCreep(Game.spawns['Spawn1'], 'upgrader', [WORK,WORK,CARRY,CARRY,MOVE,MOVE]);
    }
    // Auto spawn builders
    else if (builders.length < 2) {
        creep_creator.createCreep(Game.spawns['Spawn1'], 'builder', [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE]);
    }
  }
};
