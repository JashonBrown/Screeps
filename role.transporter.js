// Export module
module.exports =
{
    /**
    * Run
    * Action transporter performs each tick
    * @param {Creep} creep
    */
    run: function(creep)
    {
      // Assign container?
      if (!creep.memory.container)
      {
        // Get list of occupied containers
        var occupiedContainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter' && creep.memory.container)
        .map(function(creep) {
          return creep.memory.container.id;
        });

        // Get list of containers
        var containers = creep.room.find(FIND_STRUCTURES, {
          filter: (container) => {
              //return (container.structureType == STRUCTURE_CONTAINER) && (!occupiedContainers.includes(container.id));
              return (container.structureType == STRUCTURE_CONTAINER) && (container.store[RESOURCE_ENERGY] > 300);
          }
        });

        // Assign first container
        if (containers.length > 0) {
            creep.memory.container = containers[0];
        }
        else {
          creep.say('No unoccupied containers');
        }
      }

      // -----------------------------------------------------------

      // Get list of spawns and extensions (drop zones)
      var dropZones = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                      structure.energy < structure.energyCapacity;
              }
      });

      // Needing to collect?
	    if (creep.carry.energy < creep.carryCapacity && !creep.memory.depositing)
      {
        // Get creeps container onject
        var container = Game.getObjectById(creep.memory.container.id);

        // Move or withdraw?
        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}, reusePath: 50});
        }
      }
      else
      {
          if (dropZones.length > 0)
          {
            // Move or deposit?
            if(creep.transfer(dropZones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropZones[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else {
              creep.memory.depositing = true;
            }
            if (creep.memory.depositing) {
              creep.transfer(dropZones[0], RESOURCE_ENERGY);
              if (creep.carry.energy == 0) {
                creep.memory.depositing = false;
              }
            }
          }
      }
	}
};
