import * as admin from 'firebase-admin';
import { IWord, IChat } from '../firebase/types';
import { RefKeys } from './types';
import { Configuration } from '../../misc/configuration-manager'
import { objToArray } from '../../misc/common';

let wordRef: admin.database.Reference;
let chatsRef: admin.database.Reference;

export const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(Configuration.firebaseConfig),
    databaseURL: Configuration.firebaseDatabaseURL
  });

  var db = admin.database();
  wordRef = db.ref(RefKeys.WORDS);
  chatsRef = db.ref(RefKeys.CHATS);
}

export const listen = (callback: (words: IWord[]) => void) => {
  if (callback) {
    wordRef.once('value', (wordsSnapshot: any) => {
      const words = (<admin.database.DataSnapshot>wordsSnapshot).val();

      if (words) {
        callback(objToArray(words));
      }
    });
  }
}

export const addWord = (word: IWord) => {
  return wordRef.push(word);
}