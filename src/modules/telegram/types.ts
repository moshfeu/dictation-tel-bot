import { Route } from '../../misc/router';
import * as TelegramBot from 'node-telegram-bot-api';

export type ListenerCallback = (message: TelegramBot.Message) => void;

export type Listener = {
  [r in Route]?: ListenerCallback[];
}