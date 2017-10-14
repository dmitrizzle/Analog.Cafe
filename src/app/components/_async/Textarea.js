import Loadable from "react-loadable"

export default Loadable({
  loader: () => import("react-textarea-autosize"),
  loading: () => null,
  delay: 100
})
