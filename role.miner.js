// Export module
module.exports =
{
    /**
    * Run
    * Action miner performs every tick
    * @param {Creep} creep
    **/
    run: function(creep)
    {
      if (!creep.memory.container)
      {
        // Get list of already occupied containers being mined
        var occupiedContainers = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner' && creep.memory.container)
        .map(function(creep) {
          return creep.memory.container.id;
        });


        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (container) => {
                return (container.structureType == STRUCTURE_CONTAINER && !occupiedContainers.includes(container.id));
            }
        });

          if(containers.length > 0) {
              creep.memory.container = containers[0];
          }
          else {
            creep.say('No unoccupied containers');
          }

        console.log(containers);
      }

      // Mine or move?
      if (creep.pos.getRangeTo(Game.getObjectById(creep.memory.container.id)) == 0)
      {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        creep.harvest(source);
      }
      else {
        creep.moveTo(Game.getObjectById(creep.memory.container.id));
      }

    }
};
