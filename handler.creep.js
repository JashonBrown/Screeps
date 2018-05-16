// Export module
module.exports =
{
  /*
  * Perform Creep Actions
  * Perform actions for each creep
  */
  performCreepActions: function()
  {
    // Perform actions for each different creep type
    for (let i in Game.creeps) 
    {
        // Simplify
        let creep = Game.creeps[i];

        // Perform actions
        switch (creep.memory.role)
        {
            case ROLES.harvester:
                let role_harvester = require('role.harvester');
                role_harvester.run(creep);
                break;
            case ROLES.builder:
                let role_builder = require('role.builder');
                role_builder.run(creep);
                break;
            case ROLES.upgrader:
                let role_upgrader = require('role.upgrader');
                role_upgrader.run(creep);
                break;
            case ROLES.transporters:
                let role_transporter = require('roles.transporter');
                role_transporter.run(creep);
                break;
            default:
                break;
        }
    }
  }
}
