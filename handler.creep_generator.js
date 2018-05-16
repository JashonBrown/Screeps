// Export module
module.exports = 
{
  /**
   * Generate a creep
   * @param {string} role
   * @param {int} tier
   * @return creep
   */
  generateCreep: function(role, tier)
  {
    // Create creep
    let creep = 
    {
      body: _generateBody(role, tier),
      name: _generateName(role, tier),
      role: role,
      tier: tier
    }

    // Return
    return creep;
  }
};

//--------------------------------------------------------------
// Private Functions
//--------------------------------------------------------------

/**
* Calculates and returns a body for a creep
* @param {string} role
* @param {int}    tier
* @return array
*/
var _generateBody = function(role, tier)
{
  // Init variables
  var body = [];
  var attack = 0, carry = 0, claim = 0, heal = 0, move = 0, rangedAttack = 0, tough = 0, work = 0;

  // Calculate body parts
  switch(role) 
  {
    case ROLES.harvester:
      work  = (tier > 5) ? 5 : tier; // Cap work to the speed at which energy sources regenerate
      carry = 1;
      move  = 1;
      break;
    case ROLES.transporter:
      carry = tier;
      move  = tier/2;
      break;
    default:
      work = tier;
      carry = tier;
      move = (work+carry)/2;
      break;
  }

  // Construct body
  for (let i = 0; i < attack; i++) body.push(ATTACK);
  for (let i = 0; i < carry; i++) body.push(CARRY);
  for (let i = 0; i < claim; i++) body.push(CLAIM);
  for (let i = 0; i < heal; i++) body.push(HEAL);
  for (let i = 0; i < move; i++) body.push(MOVE);
  for (let i = 0; i < rangedAttack; i++) body.push(RANGED_ATTACK);
  for (let i = 0; i < tough; i++) body.push(TOUGH);
  for (let i = 0; i < work; i++) body.push(WORK);

  // Return
  return body;
}

//--------------------------------------------------------------

/**
* Generate a name for the creep
* @param {string} role
* @param {string} tier
* @return string
*/
var _generateName = function(role, tier)
{
  // Init name
  let prefix = role[0].toUpperCase() + tier + '-';

  // Append a random name not currently in use
  var name, isNameTaken, tries = 0;
  do 
  {
    // What name list to use?
    var nameArray = Math.random() > .5 ? NAMES_1 : NAMES_2;

    // Pick random name
    name = nameArray[Math.floor(Math.random() * nameArray.length)];

    // Mix up name if continuously getting already used names
    if (tries > 3){
        name += nameArray[Math.floor(Math.random() * nameArray.length)];
    }

    // Finally
    tries++;
    isNameTaken = Game.creeps[name] !== undefined;
  } while (isNameTaken);

  // Return
  return prefix+" "+name;
}