export interface IConfiguration {
  botToken: string;
  firebaseConfig: any;
  firebaseDatabaseURL: string;
  appURL?: string;
  prod?: string;
  PORT?: string;
}

let config: IConfiguration;

if ((<any>process.env).botToken) {
  const { botToken, firebaseConfig, firebaseDatabaseURL, appURL, prod, PORT } = process.env;
  config = { botToken, firebaseConfig: JSON.parse(firebaseConfig), firebaseDatabaseURL, appURL, prod, PORT };
} else {
  const conf = require('../../.config/config.json');
  const firebaseConfig = require('../../.config/serviceAccountKey.json')
  const { botToken, firebaseDatabaseURL } = conf;
  config = { botToken, firebaseConfig, firebaseDatabaseURL };
}

export let Configuration = config;