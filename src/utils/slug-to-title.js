import toTitleCase from "titlecase"

export default (slug = "", options = {}) => {
  let title
  options.trim = options.trim || [0, 0]
  options.titleCase =
    typeof options.titleCase === "undefined" ? true : options.titleCase
  console.log(options)

  if (options.trim[0] === 0 && options.trim[1] === -1) {
    title = slug.substr(0, slug.lastIndexOf("-")) // get rid of slug id
  } else title = slug
  title = title.replace(/-/g, " ")
  if (options.titleCase) title = toTitleCase(title)
  return title
}
