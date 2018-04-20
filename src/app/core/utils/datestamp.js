export const datestamp = unix => {
  const m = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  let date = new Date(unix * 1000)
  let year = date.getFullYear()
  let month = m[date.getMonth()]
  let day = date.getDate()
  return month + " " + day + ", " + year
}

export const lunar = unix => {
  let date = new Date(unix * 1000)
  return date.getDate() + "☾" + (date.getMonth() + 1)
}

export const percise = unix => {
  let date = new Date(unix * 1000)
  return date.toISOString()
}

// export const timeAgo = unix => {
//   const seconds = Math.floor((new Date() - unix * 1000) / 1000)
//
//   let elapsed = Math.floor(seconds / 31536000)
//
//   if (elapsed > 1) return elapsed + " years"
//
//   elapsed = Math.floor(seconds / 2592000)
//   if (elapsed > 1) return elapsed + " months"
//
//   elapsed = Math.floor(seconds / 604800)
//   if (elapsed > 1) return elapsed + " weeks"
//
//   elapsed = Math.floor(seconds / 604799)
//   if (elapsed > 1) return " last week"
//
//   elapsed = Math.floor(seconds / 86400)
//   if (elapsed > 1) return elapsed + " days"
//
//   elapsed = Math.floor(seconds / 3600)
//   if (elapsed > 1) return elapsed + " hours"
//
//   elapsed = Math.floor(seconds / 60)
//   if (elapsed > 1) return elapsed + " minutes"
//
//   return Math.floor(seconds) + " seconds"
// }
