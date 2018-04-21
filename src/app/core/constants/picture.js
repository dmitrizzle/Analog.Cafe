// related constants

// api endpoint
import { ROUTE_API_DOMAIN } from "../../constants"

export const ROUTE_IMAGE_API = ROUTE_API_DOMAIN + "/images"

// data structure for Picture object in Slate <Editor/>
export const PICTURE_DATA_OBJECT = previousDataImmutable => {
  if (!previousDataImmutable) return undefined
  const previousData = {
    feature: previousDataImmutable.get("feature"),
    file: previousDataImmutable.get("file"),
    src: previousDataImmutable.get("src"),
    key: previousDataImmutable.get("key"),
    caption: previousDataImmutable.get("caption")
  }
  return previousData
}

// accepted upload file types
export const PICTURE_ACCEPTED_UPLOAD_MIME = ["image/png", "image/jpeg"]
// write the above in human language for warnign boxes
export const PICTURE_ACCEPTED_UPLOAD_MIME_HUMAN = "PNG or JPEG"
