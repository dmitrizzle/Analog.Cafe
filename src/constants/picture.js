// related constants
import { ROUTE_API_DOMAIN } from "./app"

// api endpoint
export const ROUTE_IMAGE_API = ROUTE_API_DOMAIN + "/images"

// data structure for Picture object in Slate <Editor/>
export const PICTURE_DATA_OBJECT = previousDataImmutable => {
  console.log(previousDataImmutable)
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
