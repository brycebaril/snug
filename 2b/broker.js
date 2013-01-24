var axon = require("axon");

// Receive work from clients
var pull = axon.socket("pull");
pull.bind(4001);
pull.format("json");

// Round-robin work to workers
var push = axon.socket("push");
push.bind(4000);
push.format("json");

pull.on("message", function (msg) {
  console.log("%s incoming %j", Date.now(), msg);
  push.send(msg);
});
