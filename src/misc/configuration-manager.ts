import { ITexts } from '../modules/feedback/types';

export interface IConfiguration {
  botToken: string;
  firebaseConfig: any;
  firebaseDatabaseURL: string;
  appURL?: string;
  prod?: string;
  PORT?: number;
  texts?: ITexts;
}

let config: IConfiguration;

if ((<any>process.env).botToken) {
  const { botToken, firebaseConfig, firebaseDatabaseURL, appURL, prod, PORT, texts } = process.env;
  config = { botToken, firebaseConfig: JSON.parse(firebaseConfig), firebaseDatabaseURL, appURL, prod, PORT: parseInt(PORT), texts: JSON.parse(texts) };
} else {
  const conf = require('../../config/config.json');
  const firebaseConfig = require('../../config/serviceAccountKey.json')
  const texts = require('../../config/texts.json');
  const { botToken, firebaseDatabaseURL} = conf;
  config = { botToken, firebaseConfig, firebaseDatabaseURL, texts };
}

export default config;