// Export module
module.exports =
{
    /**
     * Determines what rooms need creeps and then creates and spawns them
     * @return void
     */
   employRequiredCreeps: function()
   {
    // Populate rooms with required creeps
    _populateQueuedCreeps();

    // Get rooms that have creeps that need to be spawned
    let {rooms_requiring_creeps, spawns_requiring_creeps} = _getRoomsRequiringCreeps();

    // Prioritize queued creeps
    _prioritizeQueuedCreeps(rooms_requiring_creeps);

    // Spawn required creeps
    _spawnCreeps(rooms_requiring_creeps);
   } 
}

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
 * Populates rooms with the creeps that they need 
 * @return void
 */
var _populateQueuedCreeps = function ()
{
    // Check if creeps need spawning in each room
    for(let i in Game.rooms)
    {
        // Simplify
        let room = Game.rooms[i];

        // Set creep accomodation for each room
        room.setCreepAccomodation();

        // Get list of all current creeps seperated into roles
        let harvesters = [], builders = [], upgraders = [], transporters = [];

        // Populate creep lists
        for (let i in room.getCreeps())
        {
            // Simplify
            let creep = room.getCreeps()[i];

            // Assign to appropriate list
            switch (creep.memory.role)
            {
              case ROLES.harvester:
                harvesters.push(creep);
                break;
              case ROLES.builder:
                builders.push(creep);
                break;
              case ROLES.upgrader:
                upgraders.push(creep);
                break;
              case ROLES.transporter:
                transporters.push(creep);
                break;
              default:
                break;
            }
        }

        // Number of different creeps to spawn
        let harvesters_to_spawn   = room.memory.creep_accomodation[ROLES.harvester] - harvesters.length;
        let builders_to_spawn     = room.memory.creep_accomodation[ROLES.builder] - builders.length;
        let upgraders_to_spawn    = room.memory.creep_accomodation[ROLES.upgrader] - upgraders.length;
        let transporters_to_spawn = room.memory.creep_accomodation[ROLES.transporter] - transporters.length;

        // Require lib if going to be spawning a creep
        if (harvesters_to_spawn > 0 || builders_to_spawn > 0 || upgraders_to_spawn > 0 || transporters_to_spawn > 0) var creep_generator = require('handler.creep_generator');

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // Need to spawn harvester?
        if (harvesters_to_spawn > 0)
        { 
            // Add difference in creep population to queue
            for (let i = harvesters_to_spawn; i > 0; i--)
            {
                // Create creep
                let creep = creep_generator.generateCreep(ROLES.harvester, room.memory.tiers[ROLES.harvester]);

                // Add creep to queue
                room.getQueuedCreeps().push(creep);
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // Need to spawn builder?
        if (builders_to_spawn > 0)
        { 
            // Add difference in creep population to queue
            for (let i = builders_to_spawn; i > 0; i--)
            {
                // Create creep
                let creep = creep_generator.generateCreep(ROLES.builder, room.memory.tiers[ROLES.builder]);

                // Add creep to queue
                room.getQueuedCreeps().push(creep);
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // Need to spawn upgrader?
        if (upgraders_to_spawn > 0)
        { 
            // Add difference in creep population to queue
            for (let i = upgraders_to_spawn; i > 0; i--)
            {
                // Create creep
                let creep = creep_generator.generateCreep(ROLES.upgrader, room.memory.tiers[ROLES.upgrader]);

                // Add creep to queue
                room.getQueuedCreeps().push(creep);
            }
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // Need to spawn transporter?
        if (transporters_to_spawn > 0)
        { 
            // Add difference in creep population to queue
            for (let i = transporters_to_spawn; i > 0; i--)
            {
                // Create creep
                let creep = creep_generator.generateCreep(ROLES.transporter, room.memory.tiers[ROLES.transporter]);

                // Add creep to queue
                room.getQueuedCreeps().push(creep);
            }
        }
    }
}

//--------------------------------------------------------------

/**
 * Returns a list of rooms that have creeps queued to be spawned
 * @return {array} rooms, spawns
 */
var _getRoomsRequiringCreeps = function()
{
      // Get rooms with spawns
      let rooms = [], spawns = [];

      // Get rooms for all spawners
      for(let i in Game.spawns) 
      {
        let room = Game.spawns[i].room;
        if (room.queuedCreeps && room.queuedCreeps.length > 0) 
        {
            rooms.push(Game.spawns[i].room);
            spawns.push(Game.spawns[i]);
        }
      }

      // Return
      return {rooms_requiring_creeps: rooms, spawns_requiring_creeps: spawns};
}

//--------------------------------------------------------------

/**
 * Prioritze the order at which creeps will be spawned
 * @param {array} rooms
 * @return void
 */
var _prioritizeQueuedCreeps = function(rooms)
{
    // TODO: Set priorities and stoof

}

//--------------------------------------------------------------

/**
 * Spawns any required creeps
 * @return void
 */
var _spawnCreeps = function (rooms) 
{
    // Spawn creeps for each spawns room if there is any
    for(let i in rooms)
    {
        // Get room
        let room = rooms[i];

        // Room has spawn in it?
        let spawns_in_room = _.filter(Game.spawns, (spawn) => spawn.room == room);

        // Use this rooms spawner or find closest other room with spawner?
        if (spawns_in_room.length > 0)
        {
            // Wait until spawner has finished creating its current creep
            if (spawns_in_room[0].spawning) continue; 

            // Get creep
            let creep = room.getQueuedCreeps()[0];

            // Spawn creep if one needs spawning
            if (creep) {
                _spawnCreep(spawns_in_room[0], creep);
            }
        }
        else
        {
            // TODO: Currently doesn't handle rooms without a spawn that require creeps
        }      
    }
}

//--------------------------------------------------------------

/**
 * Attempts to spawn the creep and prints status to console
 * @param {Spawn} spawn
 * @param {Creep} creep 
 * @return void
 */
var _spawnCreep = function (spawn, creep)
{
    // Check if creep can be spawned
    let status = spawn.spawnCreep(creep.body, creep.name, {dryRun: true});

    // Spawn or print error
    if (status == OK) {
        spawn.spawnCreep(creep.body, creep.name, {memory: {role: creep.role, tier: creep.tier}});
    }
    else {
        logger.error(status);
    }
}
