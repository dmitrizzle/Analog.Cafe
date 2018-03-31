const shell = require("./shell")
const commands = require("./commands")

shell.series(
  [
    commands.uploadMutableAssets("index.html"),
    commands.uploadMutableAssets("service-worker.js"),
  ],
  function(err) {
    if (!err) {
      console.log("----------------------------------------")
      console.log("☝️  Uploaded minimally-cached assets.")
      console.log("----------------------------------------")
    }
    else throw err
  }
)
