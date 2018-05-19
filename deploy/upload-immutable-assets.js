const shell = require("./shell")
const commands = require("./commands")

shell.series(
  [
    commands.uploadStaticAssets("*.png"),
    commands.uploadStaticAssets("*.ico"),
    commands.uploadImmutableAssets("*.jpg"),
    commands.uploadImmutableAssets("analytics*.js"),
    commands.uploadStaticAssets("*.json"),
    commands.uploadImmutableAssets("fonts/**"),
    commands.uploadImmutableAssets("static/**"),
  ],
  function(err) {
    if (!err) {
      console.log("----------------------------------------")
      console.log("☝️  Uploaded aggressively-cached assets.")
      console.log("----------------------------------------")
    }
    else throw err
  }
)
