// import * as TeleBot from 'telebot';
import * as TelegramBot from 'node-telegram-bot-api';
import { IWord, IChat } from '../firebase/types';
import { getRoute, setRoute, Routes, Route } from '../../misc/router';
import { Listener, ListenerCallback } from './types';
import { Configuration } from '../../misc/configuration-manager';
import * as net from 'net';

let bot: TelegramBot;
let currentWord: number = 0;
let words: IWord[];

const events: {cmd: string | RegExp, callback: (message: TelegramBot.Message) => void}[] = [
  {
    cmd: /\/add/,
    callback: (message: TelegramBot.Message) => onAdd(message)
  },
  {
    cmd: /\/start/,
    callback: (message: TelegramBot.Message) => onStart(message)
  },
  {
    cmd: 'message',
    callback: (message: TelegramBot.Message) => onText(message)
  }
];

const listeners: Listener = {};

const shuffle = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const init = () => {
  const options: any = {};
  if (Configuration.prod) {
    options.webHook = {
      port: Configuration.PORT
    };
  } else {
    options.polling = true;
  }

  bot = new TelegramBot(Configuration.botToken, options);
  console.log('bot started');

  if (Configuration.prod) {
    bot.setWebHook(`${Configuration.appURL}bot${Configuration.botToken}`);
    console.log('setWebHook');
  }

  events.forEach(event => {
    if (event.cmd instanceof RegExp) {
      bot.onText(event.cmd, event.callback);
    } else {
      bot.on(event.cmd, event.callback);
    }
  });


  bot.on('polling_error', (error) => {
    console.log(error);  // => 'EFATAL'
  });
}

export const start = (_words_: IWord[], message: TelegramBot.Message) => {
  setRoute(Routes.WORD);
  currentWord = 0;
  words = shuffle(_words_);
  const { first_name, last_name } = message.chat;
  sendMessage(message, `Hi ${first_name} ${last_name}! New words are coming, lets play 😄`).then(() => {
    ask(1000, message);
  });
}

const ask = (delay: number, message: TelegramBot.Message) => {
  if (currentWord >= words.length) {
    sendMessage(message, 'You finished the test 🎉');
    return;
  }
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      sendMessage(message, `What is "${words[currentWord].key}"?`);
    }, delay);
  });
}

const onText = (message: TelegramBot.Message) => {
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

const checkWord = (message: TelegramBot.Message) => {
  if (message.text == words[currentWord].translate) {
    currentWord++;
    return sendMessage(message, 'Well done 👍');
  } else {
    return sendMessage(message, 'Wrong answer 😓');
  }
}

const onAdd = (message: TelegramBot.Message) => {
  setRoute(Routes.ADD);
  sendMessage(message, 'Please add a word like: word,translate');
}

const onStart = (message: TelegramBot.Message) => {
  setRoute(Routes.START);
  fireListeners(message);
}

const fireListeners = (message: TelegramBot.Message) => {
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

export const sendMessage = (message: TelegramBot.Message, content: string) => {
  return bot.sendMessage(message.chat.id, content);
}