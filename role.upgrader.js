// Export module
module.exports =
{
    /**
    * Run
    * Action performed by upgrader every tick
    * @param {Creep} creep
    */
    run: function(creep)
    {
      // Finished upgrading?
      if (creep.memory.upgrading && creep.carry.energy == 0)
      {
          creep.memory.upgrading = false;
          creep.say('🔄 collecting');
      }

      // Finished collecting?
	    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity)
      {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

      // Move or upgrade?
	    if (creep.memory.upgrading)
      {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
      // Move and collect from closest container
      else
      {
        // Get list of containers with energy
        var containers = creep.room.find(FIND_STRUCTURES, {

            filter: (container) => {
                  return (container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > 300);
            }
        });

        // Get closest container to upgrader
        var closestContainer = creep.pos.findClosestByPath(containers);

        // Move or withdraw?
        if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
	}
};
