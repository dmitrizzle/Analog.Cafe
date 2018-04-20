import Loadable from "react-loadable"

export default Loadable({
  loader: () => import("react-helmet"),
  loading: () => null,
  delay: 100
})
