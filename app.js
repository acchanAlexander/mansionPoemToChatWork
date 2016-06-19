'use strict'
const exec = require('child_process').exec
    , fs = require('fs')
    , fetchChatworkMessagesCmd = ""
    ;

exec(fetchChatworkMessagesCmd,
  (err, stdout, stderr) => {
    if (err) {
      writeLog(__dirname + 'err.log', err);
      return;
    }

    writeLog('stdout.log', stdout);
    writeLog('stderr.log', stderr);

    // todo get lastMessage
    const lastMessage = ''
        ;

    if (!isMansionPoemCmd(lastMessage)) {
      return;
    }

    const mansionPoem = getMansionPoem()
        ;

    postChatWork(mansionPoem);
  }
);

// return bool
function isMansionPoemCmd(context) {

}

// return string
function getMansionPoem() {

}

// todo edit
function postChatWork(imageLink) {
  const msg = ''
      , cmdPostChatWork = 'curl -X POST -H "X-ChatWorkToken: ' + process.env.CHATWORK_TOKEN + '" -d "body=' + msg + '" "https://api.chatwork.com/v1/rooms/' + process.env.CHATWORK_CAT_ROOM_ID + '/messages"'
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
