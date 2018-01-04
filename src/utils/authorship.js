// Trim author names to contain only first name, limited to `maxlength` characters
export const trimAuthorName = (name, maxlength = 10) => {
  let firstName = name.split(" ")[0]
  return firstName.length > maxlength
    ? firstName.substr(0, maxlength - 1) + "…"
    : firstName
}

// Compile author list for a post
export const authorNameList = (authors, options = {}) => {
  if (!authors) return ""

  const namesTotal = options.ommitLeadAuthor
    ? authors.length - 1
    : authors.length
  const punctuation = (namesTotal, count) => {
    // if there are more than 2 names & we aren't looking at the last name in list
    if (namesTotal > 2 && count < namesTotal - 1) {
      // if we are just before the last name in the list, add ", and"
      // otherwise, add a comma
      return count === namesTotal - 2 ? ", and " : ", "
    } else if (namesTotal === 2 && count < namesTotal - 1)
      // if there are just two names in the list, simply add "and" between them
      return " and "
    else
      // if there's just one name, nothing needs to be added
      return ""
  }
  const nameFormat = name => {
    // trim author names (or not)
    if (!options.keepFullNames) return trimAuthorName(name, 15)
    else return name
  }

  let names = []
  let leadAuthorName = "" // article author, person who compiled & submitted the work
  let compiledNameList = "" // end result

  // make array of all author names
  authors.forEach(object => {
    if (object.authorship === "article")
      leadAuthorName = nameFormat(object.name)
    else if (!options.onlyLeadAuthor) names.push(nameFormat(object.name))
  })
  if (!options.ommitLeadAuthor)
    // lead author could be omitted
    names.unshift(leadAuthorName) // place lead author at the beginning of the list

  if (!options.trim)
    // if all names are to be displayed:
    for (let count = 0; count < namesTotal; count++) {
      compiledNameList += names[count] // add name
      compiledNameList += punctuation(namesTotal, count) // add punctuation
    } // `trim` means only the first one or two names will be shown +count
  else
    // of remaining names
    compiledNameList +=
      names[0] +
      (namesTotal > 1 ? ` and ${names[1]}` : "") + // names
      (namesTotal > 2 ? ` +${namesTotal - 2}` : "") // remaining names count

  return compiledNameList
}

export const getLeadAuthor = authors => {
  return authors.find(object => object.authorship === "article")
}
