// Export module
module.exports =
{   
    /**
     * Displays a HUD for each room
     * @return void
     */
    displayRoomHUD: function()
    {
        // Initial position
        let y_pos = 49; // Bottom line of screen

        // Show HUD on each room
        for (let i in Game.rooms)
        {
            // Simply variable
            let room = Game.rooms[i];

            // Show population on HUD?
            if (SETTINGS.show_population) {
                _displayPopulation(room, y_pos--);
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            // Show energy capacity on HUD?
            if (SETTINGS.show_energy_capacity) {
                _displayEnergyCapacity(room, y_pos--);
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            // Show current energy on HUD?
            if (SETTINGS.show_current_energy) {           
                _displayCurrentEnergy(room, y_pos--);
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            // Show room controller progress?
            if (SETTINGS.show_dist_to_next_rcl) {
                _displayDistToNextRCL(room, y_pos--);
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            // Show room controller level?
            if (SETTINGS.show_rcl) {
                _displayRoomControlLevel(room, y_pos--);
            }
        }
    }
}  

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
 * Create and display population of the room
 * @param {Room} room
 * @param {int} y_pos
 * @return void
 */
var _displayPopulation = function(room, y_pos)
{
    // Get all different creep types
    let harvesters   = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.harvester);
    let upgraders    = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.upgrader);
    let builders     = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.builder);
    let transporters = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.transporter);

    // Construct population message
    let population_msg =
    'Population:'
    + ' H:' + harvesters.length
    + ' U:' + upgraders.length
    + ' B:' + builders.length
    + ' T:' + transporters.length
    ;

    // Display text    
    room.visual.text(population_msg, 49, y_pos, {align: 'right', color: 'white'});
}

//--------------------------------------------------------------

/**
 * Create and display energy capacity of the room
 * @param {Room} room
 * @param {int} y_pos
 * @return void
 */
var _displayEnergyCapacity = function(room, y_pos)
{
    // Construct energy message
    let energy_capacity_msg =  'Energy Capacity: ' + room.energyCapacityAvailable;

    // Display text
    room.visual.text(energy_capacity_msg, 49, y_pos, {align: 'right', color: 'white'});
}

//--------------------------------------------------------------

/**
* Create and display current energy of the room
* @param {Room} room
 * @param {int} y_pos
* @return void
*/
var _displayCurrentEnergy = function(room, y_pos)
{
    // Construct current energy message
    let current_energy_msg = 'Current Energy: ' + room.energyAvailable;

    // Display text
    room.visual.text(current_energy_msg,  49, y_pos, {align: 'right', color: 'white'});

}

//--------------------------------------------------------------

/**
* Creates and displays room control level
* @param {Room} room
* @param {int} y_pos
*
*/
var _displayRoomControlLevel = function(room, y_pos)
{
    // Construct room controller level message
    let rcl_msg = 'RCL: ' + room.controller.level;

    // Display text
    room.visual.text(rcl_msg, 49, y_pos, {align: 'right', color: 'white'});
}

//--------------------------------------------------------------

/**
* Creates and displays progress to next room control level for the room
* @param {Room} room
* @param {int} y_pos
* @return void
*/
var _displayDistToNextRCL = function(room, y_pos)
{
    // Construct room controller progress message
    let rc_progress_msg = 'Next RCL: ' + room.controller.progressTotal;

    // Display text
    room.visual.text(rc_progress_msg, 49, y_pos, {align: 'right', color: 'white'});
}