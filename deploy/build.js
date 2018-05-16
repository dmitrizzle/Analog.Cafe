const shell = require("./shell")

shell.exec("yarn build", function(err) {
  if (!err) {
    console.log("----------------------------------------")
    console.log("☝️  Built static app assets.")
    console.log("----------------------------------------")
  }
  else throw err
})
