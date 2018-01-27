Create a dictation game on Telegram using Telegram Bot and firebase on node.js

<img width="508" alt="screenshot of the dictation game" src="https://user-images.githubusercontent.com/3723951/34834126-d4594666-f6f9-11e7-98ec-eabcba871a87.png">


Thanks to [@yagop](https://github.com/yagop) for the great package [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)

# Installation

```
typings install --global dt~es6-shim
```

If your code is public and you care about sensitive data, please read the [`build`](#build) section.

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
5. add texts.json to `config` folder, it should contains:
```
{
  "compliments": [
    "good",
    "http://yoursite.com/audio.mp3",
    "http://yoursite.com/audio.ogg",
    "http://yoursite.com/image.gif",
  ], // array of strings. support texts and url of .gif, .mp3 and .ogg
  "corrections": []
}
```

# Usage

Bot [commands](https://core.telegram.org/bots#global-commands):

1. `/start` start the bot.
2. `/test` start the test.
3. `/add` add words to the game.
4. `/list` review and delete words from the list.

# Build

If your code is not public, just remove the `config` folder from `.gitignore` so it will push all of the files to the server.<br />
Otherwise, make sure that `env` will contains the following variables:

- appURL
- botToken
- firebaseConfig
- firebaseDatabaseURL
- prod -> `true`

And read the next section

*Some facts:*
- I'm using _Heroku_ to host my app.
- The messages about right/wrong answer can be configured in `config/texts.json`.
- We want to allow people to use thier own files (such as `.gif` etc.)
- Therefore:
  - The file contents shouldn't be public
  - We are storing the data in `env` variable.
  - We need to update `env` from the `texts.json` file.

**Conclution**<br />
`build/pre-push.js` push `texts.json` content as `env` param.

*If you are using defferent hosting than _Heroku_, modify this file so it will push the texts to your server*



*TODO*

1. Add more commands (`/delete` etc.).
2. Add tests
