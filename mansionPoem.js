const client = require('redis').createClient()
    ;

const mansionPoem = {
  get: function (key, callback) {
    client.get(key, (err, val) => {
      if (err) {
        console.log(err);
        return;
      }

      callback(JSON.parse(val));
    });
  },
  randKey: function (callback) {
    client.randomkey((err, key) => {
      if (err) return console.log(err);

      callback(key);
    });
  },
}

module.exports = mansionPoem;
