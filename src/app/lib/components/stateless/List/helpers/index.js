// return
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
