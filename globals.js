// Require libs
let Logger = require('logger');

// Export module
let gloabls = function()
{
  // Settings
  global.SETTINGS =
  {
    // Report settings
    report_on_structures: false,
    report_on_creeps:     false,

    // HUD settings
    show_current_energy:   true,
    show_energy_capacity:  true,
    show_population:       true,
    show_rcl:              true,
    show_dist_to_next_rcl: true
  }

  // Number of ticks in which all construction sites should be complete in a room
  global.TICKS_TO_BUILD_ALL = 200;

  // Roles
  global.ROLES = 
  {
    harvester:   'harvester',
    builder:     'builder',
    upgrader:    'upgrader',
    transporter: 'transporter'
  };

  // Priorities
  global.PRIORITIES = 
  {
    important:   0,
    harvester:   1,
    transporter: 2,
    builder:     3,
    upgrader:    4
  };

  // Reporter
  global.logger = new Logger();

  // Max room controller energy capacity
  global.MAX_RCL_ENERGY =
  {
    RCL_1_ENERGY: 300,
    RCL_2_ENERGY: 550,
    RCL_3_ENERGY: 800,
    RCL_4_ENERGY: 1300,
    RCL_5_ENERGY: 1800,
    RCL_6_ENERGY: 2300,
    RCL_7_ENERGY: 5600,
    RCL_8_ENERGY: 12900
  };

  // Max number of extensions per room control level
  global.MAX_RCL_EXT = 
  {
    RCL_1_EXTENSIONS: 0,
    RCL_2_EXTENSIONS: 5,
    RCL_3_EXTENSIONS: 10,
    RCL_4_EXTENSIONS: 20,
    RCL_5_EXTENSIONS: 30,
    RCL_6_EXTENSIONS: 40,
    RCL_7_EXTENSIONS: 50,
    RCL_8_EXTENSIONS: 60
  }; 

  // Shortcut to stringify an object
  global.toStr = (obj) => JSON.stringify(obj, null, 2);

  // Names
  global.NAMES_1 = ["Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Jayden", "Ethan", "Jacob", "Jack", "Caden", "Logan", "Benjamin", "Michael", "Caleb", "Ryan", "Alexander", "Elijah", "James", "William", "Oliver", "Connor", "Matthew", "Daniel", "Luke", "Brayden", "Jayce", "Henry", "Carter", "Dylan", "Gabriel", "Joshua", "Nicholas", "Isaac", "Owen", "Nathan", "Grayson", "Eli", "Landon", "Andrew", "Max", "Samuel", "Gavin", "Wyatt", "Christian", "Hunter", "Cameron", "Evan", "Charlie", "David", "Sebastian", "Joseph", "Dominic", "Anthony", "Colton", "John", "Tyler", "Zachary", "Thomas", "Julian", "Levi", "Adam", "Isaiah", "Alex", "Aaron", "Parker", "Cooper", "Miles", "Chase", "Muhammad", "Christopher", "Blake", "Austin", "Jordan", "Leo", "Jonathan", "Adrian", "Colin", "Hudson", "Ian", "Xavier", "Camden", "Tristan", "Carson", "Jason", "Nolan", "Riley", "Lincoln", "Brody", "Bentley", "Nathaniel", "Josiah", "Declan", "Jake", "Asher", "Jeremiah", "Cole", "Mateo", "Micah", "Elliot"]
  global.NAMES_2 = ["Sophia", "Emma", "Olivia", "Isabella", "Mia", "Ava", "Lily", "Zoe", "Emily", "Chloe", "Layla", "Madison", "Madelyn", "Abigail", "Aubrey", "Charlotte", "Amelia", "Ella", "Kaylee", "Avery", "Aaliyah", "Hailey", "Hannah", "Addison", "Riley", "Harper", "Aria", "Arianna", "Mackenzie", "Lila", "Evelyn", "Adalyn", "Grace", "Brooklyn", "Ellie", "Anna", "Kaitlyn", "Isabelle", "Sophie", "Scarlett", "Natalie", "Leah", "Sarah", "Nora", "Mila", "Elizabeth", "Lillian", "Kylie", "Audrey", "Lucy", "Maya", "Annabelle", "Makayla", "Gabriella", "Elena", "Victoria", "Claire", "Savannah", "Peyton", "Maria", "Alaina", "Kennedy", "Stella", "Liliana", "Allison", "Samantha", "Keira", "Alyssa", "Reagan", "Molly", "Alexandra", "Violet", "Charlie", "Julia", "Sadie", "Ruby", "Eva", "Alice", "Eliana", "Taylor", "Callie", "Penelope", "Camilla", "Bailey", "Kaelyn", "Alexis", "Kayla", "Katherine", "Sydney", "Lauren", "Jasmine", "London", "Bella", "Adeline", "Caroline", "Vivian", "Juliana", "Gianna", "Skyler", "Jordyn"]

  // Icons
  global.ICONS =
  {
    [STRUCTURE_CONTROLLER]: "\uD83C\uDFF0"
        , [STRUCTURE_SPAWN]: "\uD83C\uDFE5"
        , [STRUCTURE_EXTENSION]: "\uD83C\uDFEA"
        , [STRUCTURE_CONTAINER]: "\uD83D\uDCE4"
        , [STRUCTURE_STORAGE]: "\uD83C\uDFE6"
        , [STRUCTURE_RAMPART]: "\uD83D\uDEA7"
        , [STRUCTURE_WALL]: "\u26F0"
        , [STRUCTURE_TOWER]: "\uD83D\uDD2B"
        , [STRUCTURE_ROAD]: "\uD83D\uDEE3"
        , [STRUCTURE_LINK]: "\uD83D\uDCEE"
        , [STRUCTURE_EXTRACTOR]: "\uD83C\uDFED"
        , [STRUCTURE_LAB]: "\u2697"
        , [STRUCTURE_TERMINAL]: "\uD83C\uDFEC"
        , [STRUCTURE_OBSERVER]: "\uD83D\uDCE1"
        , [STRUCTURE_POWER_SPAWN]: "\uD83C\uDFDB"
        , [STRUCTURE_NUKER]: "\u2622"
        , constructionSite: "\uD83C\uDFD7"
        , resource: "\uD83D\uDEE2"
        , moveTo: "\u27A1"
        , attack: "\uD83D\uDDE1" // NOTE: Same as attackController
        , build: "\uD83D\uDD28"
        , repair: "\uD83D\uDD27"
        , dismantle: "\u2692"
        , harvest: "\u26CF"
        , pickup: "\u2B07" // NOTE: Same as withdraw
        , withdraw: "\u2B07" // NOTE: Same as pickup
        , transfer: "\u2B06" // NOTE: Same as upgradeController
        , upgradeController: "\u2B06" // NOTE: Same as transfer
        , claimController: "\uD83D\uDDDD"
        , reserveController: "\uD83D\uDD12"
        , attackController: "\uD83D\uDDE1" // NOTE: Same as attack
        , recycle: "\u267B"
        , tired: "\uD83D\uDCA6"
        , stuck0: "\uD83D\uDCA5"
        , stuck1: "\uD83D\uDCAB"
        , stuck2: "\uD83D\uDCA2"
        , wait0: "\uD83D\uDD5B" // 12:00
        , wait1: "\uD83D\uDD67" // 12:30
        , wait2: "\uD83D\uDD50" // 01:00
        , wait3: "\uD83D\uDD5C" // 01:30
        , wait4: "\uD83D\uDD51" // 02:00
        , wait5: "\uD83D\uDD5D" // 02:30
        , wait6: "\uD83D\uDD52" // 03:00
        , wait7: "\uD83D\uDD5E" // 03:30
        , wait8: "\uD83D\uDD53" // 04:00
        , wait9: "\uD83D\uDD5F" // 04:30
        , wait10: "\uD83D\uDD54" // 05:00
        , wait11: "\uD83D\uDD60" // 05:30
        , wait12: "\uD83D\uDD55" // 06:00
        , wait13: "\uD83D\uDD61" // 06:30
        , wait14: "\uD83D\uDD56" // 07:00
        , wait15: "\uD83D\uDD62" // 07:30
        , wait16: "\uD83D\uDD57" // 08:00
        , wait17: "\uD83D\uDD63" // 08:30
        , wait18: "\uD83D\uDD58" // 09:00
        , wait19: "\uD83D\uDD64" // 09:30
        , wait20: "\uD83D\uDD59" // 10:00
        , wait21: "\uD83D\uDD65" // 10:30
        , wait22: "\uD83D\uDD5A" // 11:00
        , wait23: "\uD83D\uDD66" // 11:30
        , sleep: "\uD83D\uDCA4" // for when script is terminated early to refill bucket
        , testPassed: "\uD83C\uDF89" // for when scout reaches its goal location
        , testFinished: "\uD83C\uDFC1" // for when scout has finished its test run
        , reaction: "\ud83d\udd2c"
        , haul: "\ud83d\ude9a"
        , respond: "\ud83d\ude93"
        , boost: "\ud83c\udccf"
        , nuke: "\u2622"
        , noEntry: "\u26d4"
        , renew: "\u26fd"
        , greenCheck: "\u2705"
        , crossedSword: "\u2694"
  };
};

// Export
module.exports = gloabls;
