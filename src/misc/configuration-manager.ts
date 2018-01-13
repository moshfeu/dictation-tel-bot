export interface IConfiguration {
  botToken: string;
  firebaseConfig: any;
  firebaseDatabaseURL: string;
  appURL?: string;
  prod?: string;
  port?: string;
}

let config: IConfiguration;

if ((<any>process.env).botToken) {
  const { botToken, firebaseConfig, firebaseDatabaseURL, appURL, prod, port } = process.env;
  config = { botToken, firebaseConfig: JSON.parse(firebaseConfig), firebaseDatabaseURL, appURL, prod, port };
} else {
  const conf = require('../../.config/config.json');
  const firebaseConfig = require('../../.config/serviceAccountKey.json')
  const { botToken, firebaseDatabaseURL } = conf;
  config = { botToken, firebaseConfig, firebaseDatabaseURL };
}

export let Configuration = config;