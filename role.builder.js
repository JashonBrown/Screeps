// Export module
module.exports =
{
    /**
    * Run
    * Action builder performs every tick
    * @param {Creep} creep
    **/
    run: function(creep)
    {
	    if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 collect');
	    }
	    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if (creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
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
