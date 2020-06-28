import axios from "axios";

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
    if (text.length > 100) return text.substring(0, 97) + "...";
    else {
      text = text + " " + "\xa0".repeat(100 - text.length);
      return text;
    }
  },

  checkImageExists(imgURL) {
    return axios
      .head(imgURL)
      .then((res) => res.status !== 404)
      .catch((err) => false);
  },
};

export default AppUtils;
