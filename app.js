'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , mansionPoem = require('./mansionPoem')
    , fetchChatworkMessagesCmd = 'curl -X GET -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" "https://api.chatwork.com/v1/rooms/' +  process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages"'
    ;

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
  const msg = '[info][title]'+ poemInfo.name + '\n' + poemInfo.url + '[/title]' + poemInfo.poem + '[/info]'
      , cmdPostChatWork = 'curl -X POST -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" -d "body=' + msg + '" "https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_MANSION_POEM_ROOM_ID + '/messages"'
      ;

  exec(cmdPostChatWork,
    function (err, stdout, stderr) {
      if (err){
        writeLog('err.log', err);
        return;
      }

      writeLog('stdout.log', stdout);
      writeLog('stderr.log', stderr);
    }
  );
};

function writeLog(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
