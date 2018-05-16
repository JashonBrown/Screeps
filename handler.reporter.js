// Export module
module.exports =
{
  /**
   * Report statuses all structures and creeps
   */
  statusReport: function() 
  {
    // Report on structures
    if (SETTINGS.report_on_structures) {
      _structureReport();
    }

    // Report on creeps
    if (SETTINGS.report_on_creeps) {
      _creepReport();
    }
  }
}

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
 * Report statuses for structures
 * @return void
 */
var _structureReport = function()
{
  // Report on spawns creep creation
  _reportCreepCreationProcess();
}

//--------------------------------------------------------------

/**
 * Report statuses for creeps
 * @return void
 */
var _creepReport = function()
{
  // Population report
  _reportCreepPopulation();
}

//--------------------------------------------------------------

/**
* Report Creep Population
* Prints to console information about the current creep population
*/
var _reportCreepPopulation = function()
{
  // Get all different creep types
  var harvesters   = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.harvester);
  var upgraders    = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.upgrader);
  var builders     = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.builder);
  var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == ROLES.transporter);

  // Construct message
  let msg =
    '<i>Population</i><br>'
  + '      Harvesters:   ' + harvesters.length   + '<br>'
  + '      Upgraders:    ' + upgraders.length    + '<br>'
  + '      Builders:     ' + builders.length     + '<br>'
  + '      Transporters: ' + transporters.length + '<br>'
  ;

  // Print message
  global.logger.inform(msg);
}

//--------------------------------------------------------------

/**
* Display what is being spawned
@return void
*/
var _reportCreepCreationProcess = function ()
{
  // Check all spawns
  for (let i in Game.spawns)
  {
    // Get spawn
    let spawn = Game.spawns[i];

    // Is currently spawning creep?
    if (spawn.spawning)
    {
      // Get creep
      var spawningCreep = Game.creeps[spawn.spawning.name];

      // Display status
      spawn.room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          spawn.pos.x + 1,
          spawn.pos.y,
          {align: 'left', opacity: 0.8});
    }
  }
}