const shell = require("./shell")
const commands = require("./commands")

shell.series(
  [
    // images
    commands.uploadImmutableAssets("*.png"),
    commands.uploadImmutableAssets("*.jpg"),
    commands.uploadStaticAssets("*.ico"),
    // analytics file
    commands.uploadImmutableAssets("analytics*.js"),
    // json files
    commands.uploadStaticAssets("*.json"),
    // fonts
    commands.uploadImmutableAssets("fonts/**"),
    // application javascript files
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
