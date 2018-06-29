export const LINK_LABELS = {
  twitter: "Follow on Twitter",
  instagram: "Follow on Instagram",
  facebook: "Author’s Facebook Page",
  flickr: "Visit Author’s Flickr",
  px: "Visit Author’s 500px",
  gplus: "Author’s Google+ Page",
  website: "Visit Author’s Website"
}

export const linkToLabel = link => {
  if (link.includes("twitter.com/")) return LINK_LABELS.twitter
  else if (link.includes("instagram.com/")) return LINK_LABELS.instagram
  else if (link.includes("facebook.com/")) return LINK_LABELS.facebook
  else if (link.includes("flickr.com/")) return LINK_LABELS.flickr
  else if (link.includes("500px.com/")) return LINK_LABELS.px
  else if (link.includes("plus.google.com/")) return LINK_LABELS.gplus
  else if (link === "") return ""
  else return LINK_LABELS.website
}

export const fixLinks = link => {
  if (!link || link === "") return ""
  return !link.match(/^[a-zA-Z]+:\/\//) ? "http://" + link : link
}

export const getProfileButtons = (id = "unknown", link = "") => {
  let template
  template = [
    {
      to: "/author/" + id,
      text: "More on Analog.Cafe",
      branded: true
    },
    {
      to: fixLinks(link),
      text: linkToLabel(link)
    }
  ]
  return template
}
