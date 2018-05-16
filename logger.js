
/**
 * This class acts as a logger. Used to log commands in the console
 */
class Logger
{
  // Constructor
  constructor()
  {

  }

  //--------------------------------------------------------------
  
  /**
   * Information message
   * @param string msg
   */
  inform(msg) {
    this.cprint('INFO: ' + msg);
  }

  //--------------------------------------------------------------

  /**
   * Warning message
   */
  warn(msg) {
    this.cprint('WARN: ' + msg, '#f43e6d');
  }

  //--------------------------------------------------------------

  /**
   * Alert message
   */
  alert(msg) {
    this.cprint('ALERT: ' + msg, '#00ff07');
  }

  //--------------------------------------------------------------

  /**
   * Error message
   */
  error(msg) {
    this.cprint('ERROR: ' + msg, '#e59821');
  }
  
  //--------------------------------------------------------------

  /**
   * This is the function that actually prints the message
   */
  cprint(msg, color = '#ffffff') {
    console.log('<span style="color: ' + color + '">' + msg + '</span>');
  }
}

// Export
module.exports = Logger;