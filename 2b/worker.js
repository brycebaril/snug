var axon = require("axon");

var pull = axon.socket("pull");
pull.connect(4000);
pull.format("json");

pull.on("message", function (msg) {
  console.log("%s Got: %j", Date.now(), msg);
});
