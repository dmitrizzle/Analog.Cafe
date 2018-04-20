export const axiosRequest = request => {
  const requestConstructor = {
    method: request.method || "get",
    data: request.data || {},
    params: request.params || {},
    headers: request.headers || {},
    url: request.url
  }
  return requestConstructor
}
