'use strict'
const fs = require('fs')
    , mansionPoem = require('./mansionPoem')
    , chatwork = require('./chatwork/chatwork')
    ;

chatwork.init({
  chatworkToken: process.env.CHATWORK_TOKEN,
  roomId: process.env.CHATWORK_MANSION_POEM_ROOM_ID,
  msg: Date()
});

chatwork.getRoomMessages(successedGetMessage);

function successedGetMessage(messages) {
  if (!hasMansionPoemCmd(messages)) {
    return;
  }

  mansionPoem.randKey((key) => {
    getMansionPoem(key, (poemInfo) => {
      chatwork.init({
        chatworkToken: process.env.CHATWORK_TOKEN,
        roomId: process.env.CHATWORK_MANSION_POEM_ROOM_ID,
        msg: '[info][title]'+ poemInfo.name + '[/title]' + poemInfo.poem + '\n' + poemInfo.url + '[/info]'
      });

      chatwork.postRoomMessages();
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

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
