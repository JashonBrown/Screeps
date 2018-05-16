// Export module
module.exports =
{
  /**
  * Create creep
  * Generalized creep creation method
  * @param Spawn  spawn
  * @param string role
  * @param array  bodyparts
  */
  createCreep: function(spawn, role, bodyparts)
  {
    var newName = role + Game.time;
    console.log('Spawning new ' + role + ': ' + newName);
    spawn.spawnCreep(bodyparts, newName,{memory: {role: role}});
  }
};
