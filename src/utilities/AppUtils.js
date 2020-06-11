const AppUtils = {
  getQueryParamValue(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase();
    name = name.toLowerCase().replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  getShortText(text) {
    return text.length > 100 ? text.substring(0, 97) + "..." : text;
  },
};

export default AppUtils;
