// Export module
module.exports =
{
  /*
  * Perform Structure Actions
  * Perform actions for each structure
  */
  performStructureActions: function()
  {
    // Towers
    var towers = Game.rooms.E11N58.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_TOWER
    });

    for (let tower of towers)
    {
      var hostileTarget = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      var structsToRepair = Game.spawns['Spawn_1'].room.find(FIND_STRUCTURES, {
        filter: (s) => (s.hits < (s.hitsMax * 0.7)) && (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_STORAGE)
      });
      var wallsToRepair = Game.spawns['Spawn_1'].room.find(FIND_STRUCTURES, {
         filter: (s) => (s.hits < 5000) && (s.structureType == STRUCTURE_WALL)
      });
      var rampartsToRepair = Game.spawns['Spawn_1'].room.find(FIND_STRUCTURES, {
          filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_RAMPART)
      });
      var roadsToRepair = Game.spawns['Spawn_1'].room.find(FIND_STRUCTURES, {
          filter: (s) => (s.hits < 2000) && (s.structureType == STRUCTURE_ROAD)
      });

      // Perform tower actions
      if (hostileTarget) {
        tower.attack(hostileTarget);
      }
      else if (structsToRepair[0]) {
        tower.repair(structsToRepair[0]);
      }
      else if (wallsToRepair[0]) {
          tower.repair(wallsToRepair[0]);
      }
      else if (rampartsToRepair[0]) {
        tower.repair(rampartsToRepair[0]);
      }
      else if (roadsToRepair[0]) {
        tower.repair(roadsToRepair[0]);
      }
    }

    var mainRoom = Game.spawns['Spawn_1'].room;

    // Enemies in room?
    var enemiesInRoom = mainRoom.find(FIND_HOSTILE_CREEPS, {
        filter: (c) => c.body.includes(ATTACK) || c.body.includes(RANGED_ATTACK)
    });

    // Being attacked?
    if (enemiesInRoom[0])
    {
      // Get room controller
      var roomController = mainRoom.find(FIND_STRUCTURES, {
          filter: (s) => s.structureType == STRUCTURE_CONTROLLER
      });

      // Get first element of array
      roomController = roomController[0];

      // Has safemode available?
      if (roomController.safeModeAvailable)
      {
          // Already have safemode active?
          if (roomController.safeMode > 0)
          {
              roomController.activateSafeMode();
          }
      }
    }
  }
};
