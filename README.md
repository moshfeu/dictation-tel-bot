**Based on the great project [telebot](https://github.com/mullwar/telebot)**

**Installation**

```
typings install --global dt~es6-shim
```

1. create `.config` folder
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

