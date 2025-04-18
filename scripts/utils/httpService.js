// const { URL } = require("url");
import {
  DEFAULT_HEADERS,
  HTTP_METHODS,
  NAUKRI_BASE_URL,
  END_POINTS,
} from "../constants/apiConstants";
import { isEmpty, getAuthToken } from "./helpers";

const { LOGIN } = END_POINTS;

const httpService = function () {
  const authData = { token: "" };

  function handleResponse({ res = {}, logTag = "" }) {
    const { response = {}, error, ok = false } = res;
    console.log(logTag, JSON.stringify(res), "\n");
    if (!isEmpty(response) && isEmpty(error) && ok) {
      return res;
    } else if (!isEmpty(error)) {
      console.log(logTag, "ERROR RESPONSE", JSON.stringify(error));
    } else if (isEmpty(response)) {
      console.log(logTag, "EMPTY RESPONSE");
    } else if (!ok) {
      console.log(logTag, "NOT OK");
    } else {
      console.log(logTag, "FINAL ELSE ");
    }

    return res;
  }

  async function fetchRequest({ request }) {
    console.log("entered fetchRequest");
    try {
      console.log("in try block :: before fetch");
      const res = await fetch(request);
      // console.log("response:: ", res);
      try {
        let response = await res.json();
        // console.log("json response", response);
        if (!isEmpty(response)) {
          return { response, error: {}, ok: true };
        }

        return { response: {}, error: {}, ok: true };
      } catch (e) {
        console.log("error jsoning data", e);
        try {
          response = await res.text();
          // console.log("text reponse", response);
          if (!isEmpty(response)) {
            return { response, error: {}, ok: true };
          }
        } catch (er) {
          console.log("error texting data", er);

          return { response: {}, error: er, ok: false };
        }
        return { response: {}, error: e, ok: false };
      }
    } catch (err) {
      console.log("error trying request:: ", JSON.stringify(err), err);

      return { response: {}, error: err, ok: false };
    }
  }

  async function request({
    baseUrl,
    path,
    headers,
    method = "",
    body = {},
    shouldAddToken = false,
  }) {
    const url = new URL(path, baseUrl);
    const stringfiedBody = JSON.stringify(body);

    const headersObj = {
      ...DEFAULT_HEADERS,
      ...headers,
      ...(shouldAddToken ? getAuthToken(authData) : {}),
    };

    const reqHeaders = new Headers();
    for (const key of Object.keys(headersObj)) {
      if (key && headersObj[key]) {
        reqHeaders.append(key, headersObj[key]);
      }
    }

    const reqObj = new Request(url.toString(), {
      method,
      headers: reqHeaders,
      ...(!isEmpty(body) ? { body: stringfiedBody } : {}),
    });
    // const jsonReq = await reqObj.json();
    console.log("headers", Array.from(reqObj.headers.entries()));
    // console.log("request:: ", reqObj);
    // console.log("request data::", reqObj.headers);
    try {
      const res = await fetchRequest({ request: reqObj });
      handleResponse({ res, logTag: url.toString() });

      return res;
    } catch (err) {
      console.log("error calling api", JSON.stringify(err));
    }

    return { response: {}, ok: false };
  }

  async function getRequest({ baseUrl, path, headers, shouldAddToken }) {
    return await request({
      baseUrl,
      path,
      headers,
      method: HTTP_METHODS.GET,
      shouldAddToken,
    });
  }

  async function postRequest({ baseUrl, path, headers, body, shouldAddToken }) {
    return await request({
      baseUrl,
      path,
      headers,
      method: HTTP_METHODS.POST,
      body,
      shouldAddToken,
    });
  }

  async function login({ username, password }) {
    if (username && password) {
      const body = { username, password };
      const { response = {} } = await postRequest({
        baseUrl: NAUKRI_BASE_URL,
        path: LOGIN,
        body,
      });

      if (!isEmpty(response)) {
        const { cookies = [] } = response;
        const { value = "" } = cookies?.find(
          (cookie) => cookie.name === "nauk_at"
        );

        if (value) {
          authData.token = value;
          console.log("LOGIN: SET TOKEN", value);
        } else {
          console.log("LOGIN: EMPTY TOKEN");
        }

        return response;
      }
    } else {
      console.log("LOGIN: INVALID username and password", username, password);
    }
  }

  return {
    login,
    getRequest,
    postRequest,
    authData,
  };
};

export { httpService };
