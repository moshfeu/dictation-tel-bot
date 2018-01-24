Create a dictation game on Telegram using Telegram Bot and firebase on node.js

<img width="508" alt="screenshot of the dictation game" src="https://user-images.githubusercontent.com/3723951/34834126-d4594666-f6f9-11e7-98ec-eabcba871a87.png">


**Credits**

[node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

**Installation**

```
typings install --global dt~es6-shim
```

1. create `config` folder (at root)
2. put `serviceAccountKey.json` from [firebase](https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app).
3. add a node in firebase **realtime** called `words`, like this:<br />
   <img width="303" height="165" alt="screen shot of how the 'word' node should looks like in firebase" src="https://user-images.githubusercontent.com/3723951/35352575-140cbe3e-014d-11e8-97f7-c52d1a462cb1.png" />
4. create `config.json`. it should contains this props:

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
