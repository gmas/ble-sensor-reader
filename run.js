var influx = require('influx'),
  client = influx({
    host : 'localhost',
    port : 8086,
    protocol : 'http',
    database : 'sensors'
  })

var spawn = require('child_process').spawn

setInterval(function() { 
  var ls    = spawn('sudo', ['node', './test.js']);

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
    client.writePoint("temperature", 
        jsonData["temp"], { uuid: jsonData["uuid"] }, 
        function(err, res) { console.log("err: ", err)});

  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  ls.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
}, 60000);
