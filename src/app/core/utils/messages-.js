import toTitleCase from "titlecase"

export const getTitleFromSlug = (slug = "", options = {}) => {
  let title
  options.trim = options.trim || [0, 0]
  options.titleCase =
    typeof options.titleCase === "undefined" ? true : options.titleCase

  if (options.trim[0] === 0 && options.trim[1] === -1) {
    title = slug.substr(0, slug.lastIndexOf("-"))
  } else title = slug
  title = typeof title === "string" ? title.replace(/-/g, " ") : ""
  if (options.titleCase) title = toTitleCase(title)
  if (options.capitalize) title = title.charAt(0).toUpperCase() + title.slice(1)
  return title
}

export const getHumanDatestamp = (unix, short) => {
  const m = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ]
  let date = new Date(unix * 1000)
  let year = date.getFullYear()
  let month = short ? m[date.getMonth()].slice(0, 3) : m[date.getMonth()]
  let day = date.getDate()
  return month + " " + day + ", " + year
}

export const getLunarDatestamp = unix => {
  let date = new Date(unix * 1000)
  return date.getDate() + "☾" + (date.getMonth() + 1)
}

export const getISODatestamp = unix => {
  let date = new Date(unix * 1000)
  return date.toISOString()
}
