export const getFirstNameFromFull = (name, maxlength = 10) => {
  let firstName = name.split(" ")[0]
  return firstName.length > maxlength
    ? firstName.substr(0, maxlength - 1) + "…"
    : firstName
}

export const getAuthorListStringFromArray = (authors, options = {}) => {
  if (!authors) return ""
  let namesTotal = options.ommitLeadAuthor ? authors.length - 1 : authors.length
  const punctuation = (namesTotal, count) => {
    if (namesTotal > 2 && count < namesTotal - 1) {
      return count === namesTotal - 2 ? ", and " : ", "
    } else if (namesTotal === 2 && count < namesTotal - 1) return " and "
    else return ""
  }
  const nameFormat = name => {
    if (!options.keepFullNames) return getFirstNameFromFull(name, 15)
    else return name
  }

  let names = []
  let leadAuthorName = ""
  let compiledNameList = ""

  authors.forEach(object => {
    const name = nameFormat(object.name)
    if (!name) namesTotal--
    if (object.authorship === "article") leadAuthorName = name
    else if (!options.onlyLeadAuthor && name) names.push(name)
  })
  if (!options.ommitLeadAuthor) names.unshift(leadAuthorName)
  if (options.onlyLeadAuthor) namesTotal = 1

  if (!options.trim)
    for (let count = 0; count < namesTotal; count++) {
      compiledNameList += names[count]
      compiledNameList += punctuation(namesTotal, count)
    }
  else
    compiledNameList +=
      names[0] +
      (namesTotal > 1 ? ` and ${names[1]}` : "") +
      (namesTotal > 2 ? ` +${namesTotal - 2}` : "")

  return compiledNameList
}
export const getLeadAuthorObject = authors => {
  return authors.find(object => object.authorship === "article")
}
