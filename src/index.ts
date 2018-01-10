import { start, init as botInit, register as registerBotEvent, register } from './modules/telegram';
import { listen, init as firebaseInit, addWord } from './modules/firebase';
import { IWord, IChat } from './modules/firebase/types';
import { IMessage } from './modules/telegram/types';
import { Routes } from './misc/router';

botInit();
firebaseInit();

registerBotEvent(Routes.ADD, (message: IMessage) => {
  message.reply.text('wait..').then(() => {
    const [key, translate] = message.text.split(',');
    if (!key || !translate) {
      message.reply.text('your message is in invalid format, please fix it');
      return;
    }
    addWord({ key, translate}).then(() => message.reply.text(`'${key}' added successfully`));
  });
});

registerBotEvent(Routes.START, (message: IMessage) => {
  listen((words: IWord[])  => {
    start(words, message);
  });
});