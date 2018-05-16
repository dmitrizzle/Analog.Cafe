const fs = require("fs")
const replace = require("replace-in-file")

exports.swap = function(target, placeholder, swap, message, callback){
  fs.readFile(swap, "utf8", function(
    err,
    data
  ) {
    if (err) {
      return console.log(err)
    }
    const options = {
      files: target,
      from: new RegExp(placeholder, "g"),
      to: data
    }
    replace(options)
      .then(changes => {
        console.log("----------------------------------------")
        console.log(`${message} ${changes.join(", ")}`)
        console.log("----------------------------------------")
        callback()
      })
      .catch(error => {
        console.error("Error occurred:", error)
      })
  })
}
