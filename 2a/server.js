var http = require('http');
var redis = require("redis").createClient();

http.createServer(function (req, res) {
  if (req.url == "/favicon.ico") return send(res, 404, "NOT FOUND");

  // See http://redis.io/commands/multi
  redis.multi()
    .hincrby("user_agents", req.headers["user-agent"], 1)
    .hgetall("user_agents")
    .exec(function (err, replies) {
      if (err) return send(res, 500, "Error talking to Redis.");

      // replies[0] will be the result of the incr command
      var agentCounts = replies[1];
      var uas = Object.keys(agentCounts)
        .map(function (ua) {
        return agentCounts[ua] + ": '" + ua + "'";
      });
      send(res, 200, uas.join("\n"));
    });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

function send(res, code, message) {
  res.writeHead(code, {"Content-Type": "text/plain"});
  res.end(message);
}
