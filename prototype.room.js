'use strict';

/**
 * Gets a list of all construction sites for this room
 * @return array
 */
Room.prototype.getConstructionSites = function()
{
    // Return
    return this.constructionSites;
};

/**
 * Define construction sites property
 */
Object.defineProperty(Room.prototype, 'constructionSites', {
    get: function () {
        if (!this._constructionSites) {
            this._constructionSites = this.find(FIND_CONSTRUCTION_SITES);
        }
        return this._constructionSites;
    },
    enumerable: false,
    configurable: true
});

//--------------------------------------------------------------

/**
 * Get list of queued creeps to spawn
 * @return array
 */
Room.prototype.getQueuedCreeps = function()
{
    // Return
    return this.queuedCreeps;
};

/**
 * Define queued creeps to spawn property
 */
Object.defineProperty(Room.prototype, 'queuedCreeps', {
    get: function () {
        if (!this._queuedCreeps) {
            this._queuedCreeps = [];
        }
        return this._queuedCreeps;
    },
    enumerable: false,
    configurable: true
});

//--------------------------------------------------------------

/**
 * Get list of this rooms creeps
 * @return array
 */
Room.prototype.getCreeps = function()
{
    // Return
    return this.creeps;
};

/**
 * Define creeps property
 */
Object.defineProperty(Room.prototype, 'creeps', {
    get: function () {
        if (!this._creeps) {
            this._creeps = this.find(FIND_MY_CREEPS);;
        }
        return this._creeps;
    },
    enumerable: false,
    configurable: true
});

//--------------------------------------------------------------

/**
 * Sets the amount of creeps of each role that should be in the room
 * @return void
 */
Room.prototype.setCreepAccomodation = function()
{
    // Set creep role tiers for room
    _setCreepRoleTiers(this);

    // Reset accomodation
    this.memory.creep_accomodation = {};

    // Init variables
    let rcl          = this.controller.level;
    let avail_energy = this.energyAvailable;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Add accomodation for harvester role
    this.memory.creep_accomodation[ROLES.harvester] = this.find(FIND_SOURCES).length;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Get construction sites
    let construct_sites = this.getConstructionSites();

    // Energy required to complete all construction sites
    let effort_required = 0;

    // Total effort needed to build all structures
    for (let i in construct_sites) {
        effort_required += (construct_sites[i].progressTotal - construct_sites[i].progress);
    }

    // Get speed at which each builder builds per tick
    let builder_work_ethic = BUILD_POWER * this.memory.tiers[ROLES.builder];

    // Set amount of ticks it should take to construct all buildings
    let ticks_to_build_all = builder_work_ethic * TICKS_TO_BUILD_ALL;

    // Add accomodation for builder role (rounded up)
    this.memory.creep_accomodation[ROLES.builder] = Math.ceil(effort_required / ticks_to_build_all);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // TODO: Set accomodation for upgraders
    this.memory.creep_accomodation[ROLES.upgrader] = 0;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // TODO: Set accomodation for transporters
    this.memory.creep_accomodation[ROLES.transporter] = 0;
}

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
 * Assigns to the rooms memory the tier for each creep role
 * @param {Room} room
 * @return void
 */
var _setCreepRoleTiers = function(room)
{
    // Init tiers
    let tiers = {};

    // Room controller level
    let rcl = room.controller.level;

    // Init tier
    let tier = 1;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Set harvester tier
    switch (rcl)
    {
      case 1:
        tier = 1;
        break;
      case 2:
        tier = 3;
        break;
      default:
        tier = 5;
        break;
    }

    // Assign to memory
    tiers[ROLES.harvester] = tier;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Set builder tier
    tier = rcl;

    // Assign to memory
    tiers[ROLES.builder] = tier;

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    tiers[ROLES.upgrader] = tier; // TODO: Only temp assignment of tier

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    tiers[ROLES.transporter] = tier; // TODO: Only temp assignment of tier


    // Assign to room memory
    room.memory.tiers = tiers;
}