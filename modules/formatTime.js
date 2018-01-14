function formatTime(time) {
  var hour = Math.floor(time / 3600);
  var min = Math.floor(time % 3600 / 60);
  var sec = Math.floor(time % 60);
  return hour + " godzin, " + min + " minut, " + sec + " sekund";
}
exports.formatTime = formatTime;