// constants
const AWS_REGION = "ca-central-1"
const AWS_BUCKET = "analog.cafe"
//
const COMMAND = "yarn s3-deploy"
const DIR = "./build"
const CACHE_AGGRESSIVELY = "2592000"
const CACHE_MINIMALLY = "180"
const FLAGS_OPTIONS = `gzip --region ${AWS_REGION} --bucket ${AWS_BUCKET}`

// write command strings
exports.uploadMutableAssets = function(glob) {
  return `${COMMAND} ${DIR}/${glob} --cwd ${DIR}/ --cache ${CACHE_MINIMALLY} --${FLAGS_OPTIONS}`
}
exports.uploadStaticAssets = function(glob) {
  return `${COMMAND} ${DIR}/${glob} --cwd ${DIR}/ --cache ${CACHE_AGGRESSIVELY} --${FLAGS_OPTIONS}`
}
exports.uploadImmutableAssets = function(glob) {
  return `${COMMAND} ${DIR}/${glob} --cwd ${DIR}/ --cache ${CACHE_AGGRESSIVELY} --immutable --${FLAGS_OPTIONS}`
}
