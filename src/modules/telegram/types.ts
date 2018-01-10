import { Route } from '../../misc/router';

export type EntitiyType = 'bot_command';
export type ChatType = 'private';

export interface IMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    language_code: string;
  },
  chat: {
    id: number;
    first_name: string;
    last_name: string;
    type: ChatType;
  },
  date: number,
  text: string,
  entities: {
    offset: number;
    length: number;
    type: EntitiyType;
  }[],
  reply: {
    text: (content: string) => Promise<any>
  }
}

export type ListenerCallback = (message: IMessage) => void;

export type Listener = {
  [r in Route]?: ListenerCallback[];
}