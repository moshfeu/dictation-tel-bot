export const RefKeys = {
  WORDS: 'words' as 'words',
  CHATS: 'chats' as 'chats'
}

export interface IWord {
  key: string;
  translate: string;
}

export interface IChat {
  chatId: string;
  name: string;
}