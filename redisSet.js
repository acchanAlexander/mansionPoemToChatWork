const client = require('redis').createClient()
    , fs = require('fs')
    , CSV = require("comma-separated-values")
    , data = fs.readFileSync('Resource/data.csv', 'utf-8') 
    , parseResult = new CSV(data, { header: true }).parse()
    ;

let cnt = 0
  ;

parseResult.forEach((poemInfoRow) => {
  set(cnt, poemInfoRow);
  cnt++;
});

function set(key, val) {
  client.set(key, JSON.stringify(val), (err, reply) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(val.name + ' を' + key + ' に登録しました');
  });
}
