const Api = {
  login: "http://mjp.waiqin.co/api/v1/authentication"
};
function getHost() {
  let location = window.location;
  let host =
    location.protocol + "//" + location.hostname + ":" + location.port + "/";
  return host;
}

export function getRequestUrl(key) {
  //return getHost() + Api[key];
  return Api[key];
}
