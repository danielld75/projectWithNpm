var OSInfo = require("./modules/OSInfo");
var EventEmitter = require("events").EventEmitter;
var emitter = new EventEmitter();

process.stdin.setEncoding("utf-8");

process.stdout.write("Wybierz: \n a wyjście z programu. \n b wypisz wersję Node.\n c wypisz język systemowy.\n d get IOS info\n");
process.stdin.on('readable', function () {
  var input = process.stdin.read();
  if (input != null) {
    var instruction = input.toString().trim();
    emitter.emit('beforeCommand', instruction);
    switch (instruction) {
      case 'a':
        process.stdout.write('Quitting app!\n');
        process.exit();
        break;
      case 'b':
        process.stdout.write("Wersja Node to: " + process.version.toString() + "\n");
        break;
      case 'c':
        process.stdout.write("Jezyk systemowy to: " + process.env.SHELL.toString() + "\n");
        break;
      case 'd':
        OSInfo.print();
        break;
      default:
        process.stderr.write("Wybierz 'a' 'b' 'c' lub 'd'.\n");
    }
    emitter.emit('afterCommand');
  }
});
