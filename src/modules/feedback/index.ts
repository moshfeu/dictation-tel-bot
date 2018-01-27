import * as TelegramBot from 'node-telegram-bot-api';
import { sendMessage } from '../telegram';
import { rand } from '../../misc/common';
import { ITexts } from './types';
import config from '../../misc/configuration-manager';

const { texts } = config;
export const ok = (message: TelegramBot.Message) => {
  return sendMessage(message, rand(texts.compliments));
}

export const correction = (message: TelegramBot.Message) => {
  return sendMessage(message, rand(texts.corrections));
}