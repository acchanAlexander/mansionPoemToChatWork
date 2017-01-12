'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , mansionPoem = require('./mansionPoem')
    , fetchChatworkMessagesCmd = 'curl -X GET -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" "https://api.chatwork.com/v1/rooms/' +  process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages"'
    ;
/*
exec(fetchChatworkMessagesCmd,
  (err, stdout, stderr) => {
    if (err) {
      writeLog(__dirname + 'err.log', err);
      return;
    }

    if (stdout === '') {
      console.log('message is empty');
      writeLog(__dirname + 'err.log', 'message is empty');
      return;
    }

    writeLog('stdout.log', stdout);
    writeLog('stderr.log', stderr);

    const messages = JSON.parse(stdout)
        ;

    if (!hasMansionPoemCmd(messages)) {
      return;
    }

    mansionPoem.randKey((key) => {
      getMansionPoem(key, (poemInfo) => {
        postChatWork(poemInfo);
      });
    });

  }
);
*/

const request = require('request');

const headers = {
        'X-ChatWorkToken': process.env.CHATWORK_TOKEN
      }

const options = {
  uri: 'https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages',
  headers: headers,
  json: true
};

request.get(options, function(error, response, body){
  if (!error && response.statusCode == 200) {
    console.log(body);
  } else {
    console.log('error: '+ response.statusCode);
  }
});

// return bool
function hasMansionPoemCmd(messages) {
  const MANSION_POEM_CMD = 'mansion poem'
      ;
  let ret = false
    ;

  messages.forEach((message) => {
    if (message.body === MANSION_POEM_CMD) {
      ret = true;
    }
  });

  return ret;
}

// return string
function getMansionPoem(key, callback) {
  mansionPoem.get(key, (data) => {
    callback(data);
  });
}

// todo edit
function postChatWork(poemInfo) {
  const request = require('request')
      , msg = '[info][title]'+ poemInfo.name + '[/title]' + poemInfo.poem + '\n' + poemInfo.url + '[/info]'
      ;

  const headers = {
          'X-ChatWorkToken': process.env.CHATWORK_TOKEN
        }

  const options = {
    uri: 'https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages',
    form: {
      body: msg
    },
    headers: headers,
    json: true
  };

  request.post(options, function(error, response, body){
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.log('error: '+ response.statusCode);
    }
  });
};

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
