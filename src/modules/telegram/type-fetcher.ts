import * as TelegramBot from 'node-telegram-bot-api';
import { ContentType } from './types';

export const typeFetcher = {
  fetch: (content: string): ContentType => {
    if (content.endsWith('.gif')) {
      return ContentType.GIF;
    } else if (content.endsWith('.ogg') || content.endsWith('.mp3')) {
      return ContentType.AUDIO;
    }
    return ContentType.TEXT;
  },
  getMethod: (bot: TelegramBot, content: string): Function => {
    const contentType = typeFetcher.fetch(content);
    switch (contentType) {
      case ContentType.AUDIO:
        return bot.sendAudio;
      case ContentType.GIF:
        return bot.sendDocument;
      default:
        return bot.sendMessage;
    }
  }
}