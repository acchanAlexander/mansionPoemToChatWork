const client = require('redis').createClient()
    , fs = require('fs')
    , CSV = require("comma-separated-values")
    , data = fs.readFileSync('Resource/data.csv', 'utf-8') 
    , parseResult = new CSV(data, { header: true }).parse()
    ;

console.log(parseResult);

let dbsize
  ;

getDBSize();

/*
var key = '2';
var value = '{"hoge":"moge","foo":"var"}';
*/

function getDBSize() {
  client.keys('*', function (err, keys) {
    if (err) return console.log(err);
    
    dbsize = keys.length;
    hoge();
  });

}

function hoge() {
  console.log(dbsize);
}

/*
client.set(key, value, function(){
  console.log('set end');
});
*/
