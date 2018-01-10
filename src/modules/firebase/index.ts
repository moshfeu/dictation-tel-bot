import * as admin from 'firebase-admin';
import { IWord, IChat } from '../firebase/types';
import { RefKeys } from "./types";

const serviceAccount = require('../../../config/serviceAccountKey.json');
const config = require('../../../config/config.json');
let wordRef: admin.database.Reference;
let chatsRef: admin.database.Reference;

export const init = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseDatabase
  });

  var db = admin.database();
  wordRef = db.ref(RefKeys.WORDS);
  chatsRef = db.ref(RefKeys.CHATS);
}

const objToArray = (obj: any) => {
  return Object.keys(obj).map((key: string) => obj[key]);
}

const objToArrayWithKeys = (obj: any): IChat[] => {
  return Object.keys(obj).map((key: string) => ({
    name: key,
    chatId: obj[key]
  }));
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