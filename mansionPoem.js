const client = require('redis').createClient()
    ;

const mansionPoem = {
  get: function (key, callback) {
    client.get(key, (err, val) => {
      if (err) {
        console.log(err);
        return;
      }

      callback(val);
    });
  }
}

module.exports = mansionPoem;