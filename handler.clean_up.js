// Export
module.exports =
{
    /**
     * Cleans up memory for different aspects of the game eg. creeps/rooms
     */
    cleanUp: function()
    {
        // Clean up dead creeps
        _clearDeadCreepMemory();

        // Clean up room memory
        _clearRoomMemory();
    }
}

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
 * Clears dead creeps from memory
 */
var _clearDeadCreepMemory = function()
{
    for (let i in Memory.creeps)
    {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
}

//--------------------------------------------------------------

/**
 * Clears memory for all rooms
 */
var _clearRoomMemory = function()
{
    for (let i in Memory.rooms) {
        delete Memory.rooms[i].memory;
    }
}
