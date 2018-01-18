var OSInfo = require("./modules/OSInfo");
var EventEmitter = require("events").EventEmitter;
var StatMode = require('stat-mode');
var http = require('http');

var server = http.createServer();
server.on('request', function(request, response){
  response.setHeader("Content-type", "text/html; charset=utf-8; lang=en");
  if (request.method === 'GET' && request.url === '/hello') {
    response.write('<h1>Hello world!</h1>');
    response.end();
  } else {
    response.status = 404;
    response.write('<h1>404: Zła ścieżka!</h1>');
    response.end();
  }
});
server.listen(8080);

var emitter = new EventEmitter();
var fs = require('fs');


function readDir(path) {
  fs.readdir(path, 'utf-8', function (err, files){
    if (err) throw err;
    fs.writeFile('./tekst.txt', files, 'utf-8', function () {
      fs.readFile('./tekst.txt', 'utf-8', function (err, data) {
        if (err) throw err;
        console.log(data);
      });
    });
  });
}

fs.stat("./cat.jpg", function (err, stats) {
  var statMode = new StatMode(stats);
  console.log(statMode.toString());
});

fs.readFile('./tekst.txt', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log("Dane przed zapisem!".blue);
  console.log(data);
  fs.appendFile('./tekst.txt', '\nA tak wygląda po zapisie! ', function (err) {
    if (err) throw err;
    console.log("Zapisano!".red);
    fs.readFile('./tekst.txt', 'utf-8', function (err, data) {
      if (err) throw err;
      console.log("Dane po zapisie".blue);
      console.log(data);
    });
  });
});
emitter.on("beforeCommand", function (instruction) {
  console.log("You wrote: " + instruction + ", trying to run command");
});
emitter.on("afterCommand", function () {
  console.log("Finished command");
});

process.stdin.setEncoding("utf-8");

process.stdout.write("Wybierz: \n a wyjście z programu. \n b wypisz wersję Node.\n c wypisz język systemowy.\n d get IOS info\n r czytaj katalog \n");
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
      case 'r':
        readDir('./');
        break;
      default:
        process.stderr.write("Wybierz 'a' 'b' 'c' 'd' lub 'r'.\n");
    }
    emitter.emit('afterCommand');
  }
});
