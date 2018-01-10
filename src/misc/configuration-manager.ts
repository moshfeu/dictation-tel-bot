export interface IConfiguration {
  botToken: string;
  firebaseConfig: any;
  firebaseDatabaseURL: string;
}

let config: IConfiguration;

if (process.env.botToken) {
  const { botToken, firebaseConfig, firebaseDatabaseURL } = process.env;
  config = { botToken, firebaseConfig, firebaseDatabaseURL };
} else {
  const conf = require('../../.config/config.json');
  const firebaseConfig = require('../../.config/serviceAccountKey.json')
  const { botToken, firebaseDatabaseURL } = conf;
  config = { botToken, firebaseConfig, firebaseDatabaseURL };
}

export let Configuration = config;