var axon = require("axon");

var push = axon.socket("push");
push.connect(4001);
push.format("json");

// usage node client.js ID
// e.g. node client.js 1
var id = process.argv[2] || 0;

setInterval(function () {
  push.send({id: id, date: Date.now()});
}, 250);
