import * as TeleBot from 'telebot';
import { IWord, IChat } from '../firebase/types';
import { IMessage } from './types';
import { getRoute, setRoute, Routes, Route } from '../../misc/router';
import { Listener, ListenerCallback } from './types';
import { Configuration } from '../../misc/configuration-manager';

let bot: TeleBot;
let currentWord: number = 0;
let words: IWord[];

const events = [
  {
    cmd: ['/add'],
    callback: (message: IMessage) => onAdd(message)
  },
  {
    cmd: ['/start'],
    callback: (message: IMessage) => onStart(message)
  },
  {
    cmd: 'text',
    callback: (message: IMessage) => onText(message)
  }
];

const listeners: Listener = {};

export const init = () => {
  let polling, webhook;
  if (Configuration.prod) {
    webhook = {
      url: `${Configuration.appURL}bot/${Configuration.botToken}`,
      port: Configuration.PORT
    };
  } else {
    polling = { // Optional. Use polling.
      interval: 1000, // Optional. How often check updates (in ms).
      timeout: 0, // Optional. Update polling timeout (0 - short polling).
      limit: 100, // Optional. Limits the number of updates to be retrieved.
      retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
    };
  }

  const options: TeleBot.config = {
    token: Configuration.botToken, // Required. Telegram Bot API token.
    polling,
    webhook
  };

  console.log('---configuration', JSON.stringify(Configuration))
  console.log('---initBotWith', JSON.stringify(options))

  bot = new TeleBot(options);

  events.forEach(event => {
    bot.on(event.cmd, event.callback);
  });

  if (!Configuration.prod) {
    bot.start();
  } else {
    bot.on('message', function onMessage(msg) {
      bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
    });
  }

  return bot;
}

export const start = (_words_: IWord[], message: IMessage) => {
  setRoute(Routes.WORD);
  words = _words_;
  const { first_name, last_name } = message.chat;
  message.reply.text(`Hi ${first_name} ${last_name}! New words are coming, lets play 😄`).then(() => {
    ask(1000, message);
  });
}

const ask = (delay: number, message: IMessage) => {
  if (currentWord >= words.length) {
    message.reply.text('You finished the test 🎉');
    return;
  }
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve(message.reply.text(`What is "${words[currentWord].key}"?`));
    }, delay);
  });
}

const onText = (message: IMessage) => {
  // if it's command
  if(/\//.exec(message.text)) {
    return;
  }
  switch (getRoute()) {
    case Routes.ADD:
      fireListeners(message);
      break;
    case Routes.WORD:
      checkWord(message).then(() => {
        ask(1000, message);
      });
      break;
  }
}

const checkWord = (message: IMessage) => {
  if (message.text == words[currentWord].translate) {
    currentWord++;
    return message.reply.text('Well done 👍');
  } else {
    return message.reply.text('Wrong answer 😓');
  }
}

const onAdd = (message: IMessage) => {
  setRoute(Routes.ADD);
  message.reply.text('Please add a word like: word,translate');
}

const onStart = (message: IMessage) => {
  setRoute(Routes.START);
  fireListeners(message);
}

const fireListeners = (message: IMessage) => {
  const routeListeners = listeners[getRoute()];
  if (routeListeners) {
    routeListeners.forEach(l => l(message));
  }
}

export const register = (route: Route, callback: ListenerCallback) => {
  if (!listeners[route]) {
    listeners[route] = [];
  }

  (<ListenerCallback[]>listeners[route]).push(callback);
}