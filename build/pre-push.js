const { exec } = require('child_process');
const fs = require('fs');
var glob = require("glob");

fs.readFile('config/texts.json', 'utf8', function (err, data) { // Read each file
  if (err) {
    console.log("cannot read the file, something goes wrong with the file", err);
  }
  const json = JSON.stringify(JSON.parse(data)).replace(/\"/g, '\\"');

  const command = `heroku config:set texts="${json}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
    } else {
      console.log(stderr);
    }
  });
});