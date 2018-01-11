```
typings install --global dt~es6-shim
```

1. create `.config` folder
2. put `serviceAccountKey.json` from firebase dashboard.
3. create `config.json`. it should contains this props:

```
{
  "botToken": "bot api from BotFather",
  "firebaseDatabase": "https://{database_name}.firebaseio.com"
}
```
