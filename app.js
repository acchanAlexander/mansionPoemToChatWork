'use strict'
const fs = require('fs')
    , mansionPoem = require('./mansionPoem')
    , chatwork = require('chatwork-api-v2')
    ;

let chatworkParams = {
      chatworkToken: process.env.CHATWORK_TOKEN,
      roomId: process.env.CHATWORK_MANSION_POEM_ROOM_ID,
    };

chatwork.init(chatworkParams);

setInterval(() => {
  chatwork.getRoomMessages(successedGetMessage);
}, 2000);

function successedGetMessage(messages) {
  if (!hasMansionPoemCmd(messages)) {
    return;
  }

  execPostPoem();
}

// return bool
function hasMansionPoemCmd(messages) {
  const MANSION_POEM_CMD = 'mansion poem';
  let ret = false;

  messages.forEach((message) => {
    if (message.body === MANSION_POEM_CMD) {
      ret = true;
    }
  });

  return ret;
}

function execPostPoem() {
  mansionPoem.randKey((key) => {
    getMansionPoem(key, (poemInfo) => {
      let msg = '[info][title]'+ poemInfo.name + '[/title]' + poemInfo.poem + '\n' + poemInfo.url + '[/info]';
      chatworkParams.msg = msg;
      chatwork.init(chatworkParams);

      chatwork.postRoomMessages();
    });
  });
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
