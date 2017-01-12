'use strict'
const fs = require('fs')
    , mansionPoem = require('./mansionPoem')
    ;

const request = require('request');

const headers = {
        'X-ChatWorkToken': process.env.CHATWORK_TOKEN
      }

const options = {
  uri: 'https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages',
  headers: headers,
  json: true
};

request.get(options, function(error, response, messages){
  if (!error && response.statusCode == 200) {
    successedGetMessage(messages);
  } else {
    console.log('error: '+ response.statusCode);
  }
});

function successedGetMessage(messages) {
  if (!hasMansionPoemCmd(messages)) {
    return;
  }

  mansionPoem.randKey((key) => {
    getMansionPoem(key, (poemInfo) => {
      postChatWork(poemInfo);
    });
  });
}

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
