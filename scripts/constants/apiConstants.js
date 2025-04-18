const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  // "Content-Length": "<calculated when request is sent>",
  // Host: "<calculated when request is sent>",
  // "User-Agent": "PostmanRuntime/7.37.3",
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  // Connection: "keep-alive",
  Origin: "https://www.naukri.com",
  Appid: "105",
  ClientId: "d3skt0p",
  Systemid: "jobseeker",
  "X-Forwarded-For": "183.83.165.39",
};

const SYSTEM_IDS = {
  JOB_SEEKER: "jobseeker",
  NAUKRI: "Naukri",
};

const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
};

const NAUKRI_BASE_URL = "https://www.naukri.com/";

const END_POINTS = {
  LOGIN: "central-login-services/v1/login",
  UPDATE_PROFILE:
    "cloudgateway-mynaukri/resman-aggregator-services/v1/users/self/fullprofiles",
  GET_PROFILE:
    "cloudgateway-mynaukri/resman-aggregator-services/v2/users/self?expand_level=4",
};

const UPDATE_PROFILE_HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "x-http-method-override": "PUT",
};

export {
  DEFAULT_HEADERS,
  SYSTEM_IDS,
  HTTP_METHODS,
  NAUKRI_BASE_URL,
  END_POINTS,
  UPDATE_PROFILE_HEADERS,
};
