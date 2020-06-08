import { Google } from "../config";

export const googleAuth = async () => {
  const qParams = [
    `redirect_uri=${Google.REDIRECT_URI}`,
    `scope=${Google.SCOPE}`,
    `client_id=${Google.CLIENT_ID}`, //`login_hint=paramsinghvc@gmail.com`,
    `prompt=consent`,
    `state=google`,
  ].join("&");

  try {
    const response = await fetch(
      `https://accounts.google.com/o/oauth2/v2/auth?${qParams}`
    );
    console.log(response.body);
    const url = await response.text();
    window.location.assign(url);
  } catch (e) {
    console.error(e);
  }
};
