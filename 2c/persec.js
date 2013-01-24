var fa = require("fixed-array");
var r = require("redis").createClient();

function PerSec(name) {
  this.name = name;
  this.start = Date.now();
  this.count = 0;

  this.log = fa.newFixedValueHistory(100);

  var self = this; // or use bind
  setInterval(function () {self.reset()}, 5000);
}
// Either create with `new`
exports.PerSec = PerSec;

// Or use a factory
exports.createPerSec = function (name) {
  return new PerSec(name);
}

PerSec.prototype.incr = function () {
  this.count++;
}

PerSec.prototype.persec = function () {
  var elapsed = Math.round((Date.now() - this.start) / 1000);
  return this.count / ( elapsed + 1 );
}

PerSec.prototype.reset = function () {
  this.log.push(this.persec());
  this.start = Date.now();
  this.count = 0;
  this.save();
}

PerSec.prototype.save = function () {
  var stats = {
    logtime: Date.now(),
    avg_per_sec: this.log.mean(),
    max_per_sec: this.log.max(),
    min_per_sec: this.log.min(),
  };
  r.hset("PerSec", this.name, JSON.stringify(stats));
}

PerSec.prototype.perf = function () {
  return this.log;
}
