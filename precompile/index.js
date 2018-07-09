const async = require("async");
const fs = require("fs");
const del = require("del");
const { swap } = require("./swap");
const { copyFile } = require("./copy-file");
const copyDir = require("copy");
const replace = require("replace-in-file");
const md5 = require("md5.js");

const FONTS = require("../html/fonts").fonts;
const COMPILED_INDEX_HTML = "public/index.html";

var cssFontImports = "";
copyFile("html/index.html", COMPILED_INDEX_HTML, function() {
  async.series([
    function(callback) {
      del(["public/*", "!public/index.html"]).then(paths => {
        console.log("☕️  ☕️  ☕️");
        console.log("Public dir is ready, starting tasks...");
        callback();
      });
    },
    function(callback) {
      swap(
        COMPILED_INDEX_HTML,
        "%RESET_CSS%",
        "./node_modules/sanitize.css/sanitize.css",
        "1/8:  CSS reset 👉",
        callback
      );
    },
    function(callback) {
      swap(
        COMPILED_INDEX_HTML,
        "%CRITICAL_CSS%",
        "./html/critical.css",
        "2/8:  critical CSS 👉",
        callback
      );
    },
    function(callback) {
      swap(
        COMPILED_INDEX_HTML,
        "%CRITICAL_HTML%",
        "./html/critical.html",
        "3/8:  critical HTML 👉",
        callback
      );
    },
    function(callback) {
      swap(
        COMPILED_INDEX_HTML,
        "%META_HTML%",
        "./html/meta.html",
        "4/8:  meta HTML 👉",
        callback
      );
    },
    function(callback) {
      copyDir(`./html/icons/**`, "./public/", function() {
        console.log("----------------------------------------");
        console.log(`5/8:  Copied icon assets.`);
        console.log("----------------------------------------");
        callback();
      });
    },
    function(callback) {
      const hash = new md5().update("42").digest("hex");
      const filename = `poster.${hash}.jpg`;
      copyFile("html/poster.jpg", `public/${filename}`, function() {
        replace({
          files: COMPILED_INDEX_HTML,
          from: new RegExp("%OG_POSTER%", "g"),
          to: filename
        })
          .then(changes => {
            console.log("----------------------------------------");
            console.log(`6/8:  Added poster image.`);
            console.log("----------------------------------------");
            callback();
          })
          .catch(error => {
            console.error("Error occurred:", error);
          });
      });
    },
    function(callback) {
      copyDir(`./html/manifest*.json`, "./public/", function() {
        copyDir(`./html/analytics*.js`, "./public/", function() {
          copyFile(`./html/robots.txt`, "./public/robots.txt", function() {
            console.log("----------------------------------------");
            console.log(`7/8:  manifest, analytics, robots`);
            console.log("----------------------------------------");
            callback();
          });
        });
      });
    },
    function(callback) {
      let cssFontImports = "";
      async.series([
        function(callback) {
          console.log("----------------------------------------");
          console.log(`𝓐     Generating font dependencies...`);
          for (let package = 0; package < FONTS.length; package++) {
            copyDir(
              `./node_modules/${FONTS[package]}/files/**`,
              "./public/fonts/",
              function() {
                fs.readFile(
                  `./node_modules/${FONTS[package]}/index.css`,
                  "utf8",
                  function(err, data) {
                    if (err) throw err;
                    cssFontImports =
                      cssFontImports +
                      data.replace(/\.\/files/g, "%PUBLIC_URL%/fonts");
                    if (package === FONTS.length - 1) callback();
                  }
                );
                console.log(`👍     Copied "${FONTS[package]}" package.`);
              }
            );
          }
        },
        function(callback) {
          replace({
            files: COMPILED_INDEX_HTML,
            from: new RegExp("%FONTS_CSS%", "g"),
            to: cssFontImports
          })
            .then(changes => {
              console.log(`8/8:  Added CSS font imports.`);
              console.log("----------------------------------------");
              // console.log(cssFontImports);
              console.log("----------------------------------------");
              callback();
            })
            .catch(error => {
              console.error("Error occurred:", error);
            });
        }
      ]);
    }
  ]);
});
