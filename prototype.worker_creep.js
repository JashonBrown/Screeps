/**
 * Find the closest energy source to the creep
 * @return {Source}
 */
Creep.prototype.closestEnergySource = function() {
    return this.pos.findNearest(this.room.find(FIND_SOURCES));
}