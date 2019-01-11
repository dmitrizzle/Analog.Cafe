const shell = require("./shell");
const commands = require("./commands");

shell.series(
  ["node deploy/upload-immutable-assets", "node deploy/upload-mutable-assets"],
  function(err) {
    if (!err) {
      console.log("🍻🎉  Deployed to production  🎉🍻");
      console.log("----------------------------------------");
    }
  }
);
