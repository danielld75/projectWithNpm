var os = require('os');
var colors = require('colors');
var formatTime = require('../modules/formatTime');
function getOsInfo() {
  var type = os.type();
  var release = os.release();
  var cpu = os.cpus()[0].model;
  var uptime =  os.uptime();
  var userInfo = os.userInfo();

  process.stdout.write(colors.green("System: ") + type + "\n" + colors.red("Release: ") + release + "\n");
  process.stdout.write(colors.blue("CPU: ") + cpu + "\n");
  process.stdout.write(colors.bgMagenta.yellow("Uptime ~ : ") + formatTime.forTime(uptime) + '\n');
  process.stdout.write(colors.grey.bold("USER: ") + userInfo.username + colors.yellow(" homedir: ") + userInfo.homedir + '\n');
}

module.exports = {
  print: getOsInfo
};