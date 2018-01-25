import { start, init as botInit, register as registerBotEvent, register, sendMessage } from './modules/telegram';
import { listen, init as firebaseInit, addWord } from './modules/firebase';
import { IWord, IChat } from './modules/firebase/types';
import { Routes } from './misc/router';
import * as TelegramBot from 'node-telegram-bot-api';

botInit();
firebaseInit();

registerBotEvent(Routes.ADD, (message: TelegramBot.Message) => {
  sendMessage(message, 'wait..').then(() => {
    const [key, translate] = message.text.split(',');
    if (!key || !translate) {
      sendMessage(message, 'your message is in invalid format, please fix it');
      return;
    }
    addWord({ key, translate}).then(() => sendMessage(message, `'${key}' was added successfully`));
  });
});

registerBotEvent(Routes.START, (message: TelegramBot.Message) => {
  listen((words: IWord[])  => {
    start(words, message);
  });
});