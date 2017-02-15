var token = '';
var TelegramBot = require('node-telegram-bot-api');
var bot = new TelegramBot(token, {polling: true});

var hype = "CHECK THIS SONG!!\n";

bot.on('message', function(json) {
  if (json.hasOwnProperty('text')) {
    var chatID = json.chat.id;
    var message = json.text;

    if (message.startsWith('spotify:') || message.startsWith('https://open.spotify.com')) {
      var isURL = message.startsWith('https://open.spotify.com') ? 1 : 0;
      var content;

      if (isURL) {
        content = createURIfromURL(message);
      } else {
        content = createURLfromURI(message);
      }

      var replyMessage = createReply(content);

      bot.sendMessage(chatID, replyMessage);
    }
  }
});

function createURLfromURI(message) {
  string = message.slice(8);
  var type = string.substr(0, string.indexOf(':'));
  var id = string.substr(string.lastIndexOf(':') + 1);

  var url = 'https://open.spotify.com/';
  url += type + '/';
  url += id;

  return message + '\n' + url;
}

function createURIfromURL(message) {
  string = message.slice(25);
  var type = string.substr(0, string.indexOf('/'));
  var id = string.substr(string.lastIndexOf('/') + 1);

  var URI = 'spotify:';
  URI += type + ':';
  URI += id;

  return URI + '\n' + message;  
}

function createReply(content) {
  return hype + content;
}