// tools
import FontFaceObserver from "fontfaceobserver"

// return
export const fonts = () => {
  const doc = document.documentElement.classList
  if (doc.contains("fonts-loaded")) return
  if (sessionStorage.getItem("fonts-loaded") === "true") {
    doc.add("fonts-loaded-headers")
    doc.add("fonts-loaded")
    return
  }
  new FontFaceObserver("Exo 2", {
    style: "normal",
    weight: 600
  })
    .load(null, 5000)
    .then(
      function() {
        doc.add("fonts-loaded-headers")
        Promise.all([
          new FontFaceObserver("Lora", {
            style: "normal",
            weight: 400
          }).load(null, 5000),
          new FontFaceObserver("Lora", {
            style: "italic",
            weight: 400
          }).load(),
          new FontFaceObserver("Lora", {
            style: "normal",
            weight: 700
          }).load(),
          new FontFaceObserver("Lora", {
            style: "italic",
            weight: 700
          }).load()
        ]).then(
          function() {
            doc.add("fonts-loaded")
            sessionStorage.setItem("fonts-loaded", "true")
          },
          function() {
            console.log("Lora FAILED")
          }
        )
      },
      function() {
        console.log("Exo 2 FAILED")
      }
    )
}
