var http = require('http');
var redis = require("redis").createClient();
var fa = require("fixed-array");
var axon = require("axon");

// Receive work log
var worklog = fa.newFixedValueHistory(10);
var pull = axon.socket("pull");
pull.bind(4002);
pull.format("json");

pull.on("message", function (msg) {
  worklog.push(JSON.stringify(msg));
});


http.createServer(function (req, res) {
  if (req.url == "/favicon.ico") return send(res, 404, "NOT FOUND");

  redis.hgetall("PerSec", function (err, reply) {
      if (err) return send(res, 500, "Error talking to Redis.");

      var workers = Object.keys(reply).map(function (w) { return w + ": " + reply[w]; });
      console.log(reply);
      console.log(worklog.values());
      var output = [
        "Workers:",
        workers.join("\n"),
        "\nLast 10 jobs:",
        worklog.values().join("\n"),
      ];
      send(res, 200, output.join("\n"));
    });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

function send(res, code, message) {
  res.writeHead(code, {"Content-Type": "text/plain"});
  res.end(message);
}
