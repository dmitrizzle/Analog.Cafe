export const LINK_LABELS = {
  twitter: "Follow on Twitter",
  instagram: "Follow on Instagram",
  facebook: "Visit My Facebook Page",
  flickr: "Visit My Flickr",
  px: "Visit My 500px",
  website: "Visit My Website",
  youtube: "My YouTube Channel",
  email: "Email Me"
}

export const isEmailSimple = email => {
  let re = /\S+@\S+\.\S+/
  return re.test(email)
}
export const linkToLabel = link => {
  if (link.includes("twitter.com/")) return LINK_LABELS.twitter
  else if (link.includes("instagram.com/")) return LINK_LABELS.instagram
  else if (link.includes("youtube.com/")) return LINK_LABELS.youtube
  else if (link.includes("facebook.com/")) return LINK_LABELS.facebook
  else if (link.includes("flickr.com/")) return LINK_LABELS.flickr
  else if (link.includes("500px.com/")) return LINK_LABELS.px
  else if (isEmailSimple(link)) return LINK_LABELS.email
  else if (link === "") return ""
  else return LINK_LABELS.website
}

export const fixLinks = link => {
  if (!link || link === "") return ""
  if (isEmailSimple(link))
    return !link.includes("mailto:") ? "mailto:" + link : link
  return !link.match(/^[a-zA-Z]+:\/\//) ? "http://" + link : link
}

export const getProfileButtons = (id = "unknown", link = "") => {
  let template
  template = [
    {
      to: "/is/" + id,
      text: "View Full Profile",
      branded: true
    },
    {
      to: fixLinks(link),
      text: linkToLabel(link)
    }
  ]
  return template
}
