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
  count: function (callback) {
    client.keys('*', function (err, keys) {
      if (err) return console.log(err);

      callback(keys.length);
    });
  },
}

module.exports = mansionPoem;
