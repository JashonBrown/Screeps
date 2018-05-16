// setup globals and prototypes
require('require');

// Imports
var handler_creep     = require('handler.creep');
var handler_structure = require('handler.structure');
var human_resources   = require('handler.human_resources');
var clean_up          = require('handler.clean_up');
var reporter          = require('handler.reporter');
var hud               = require('handler.hud');

// Export module
module.exports.loop = function ()
{
  // Report statuses
  try {
    reporter.statusReport();
  }
  catch (err) {
    logger.error('Failed status report: ' + err);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Display room HUD
  try {
    hud.displayRoomHUD();
  }
  catch (err) {
    logger.error('Failed displaying room HUD: ' + err);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Spawn required creeps
  try {
    human_resources.employRequiredCreeps();
  }
  catch (err) {
    logger.error('Failed employing creeps: ' + err);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Perform all creep actions
  try {
    handler_creep.performCreepActions();
  }
  catch (err) {
    logger.error('Failed performing creep actions: ' + err);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Clean up
  try {
    clean_up.cleanUp();
  }
  catch (err) {
    logger.error('Failed clean up: ' + err);
  }
}
