var axon = require("axon");

// usage node worker.js ID
// e.g. node worker.js 1
var id = process.argv[2] || 0;

var ps = require("./persec").createPerSec("worker_" + id);

var pull = axon.socket("pull");
pull.connect(4000);
pull.format("json");

// Sink the work log to the server
var push = axon.socket("push");
push.connect(4002);
push.format("json");

pull.on("message", function (msg) {
  ps.incr();
  msg.worker = id;
  msg.persec = ps.persec();
  msg.delay = Date.now() - msg.date;
  console.log("%j", msg);
  push.send(msg);
});
