Create a dictation game on Telegram using Telegram Bot and firebase on node.js

<img width="508" alt="screen shot 2018-01-11 at 6 00 55 pm" src="https://user-images.githubusercontent.com/3723951/34834126-d4594666-f6f9-11e7-98ec-eabcba871a87.png">


**Credits**

[node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

**Installation**

```
typings install --global dt~es6-shim
```

1. create `config` folder (at root)
2. put `serviceAccountKey.json` from [firebase](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app).
3. create `config.json`. it should contains this props:

```
{
  "botToken": "bot api from BotFather",
  "firebaseDatabaseUrl": "https://{database_name}.firebaseio.com"
}
```
- `botToken` - from [`botFather`](https://core.telegram.org/bots#6-botfather)
- `firebaseDatabaseURL` - from [`firebase` dashboard](https://firebase.google.com/docs/database/web/start)

**Usage**

Bot [commands](https://core.telegram.org/bots#global-commands):

1. `/start` start the game.
2. `/add` add words to the game.

*TODO*

1. Add more commands (`/view`, `/delete` etc.).
2. Add tests