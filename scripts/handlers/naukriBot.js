import {
  NAUKRI_BASE_URL,
  END_POINTS,
  SYSTEM_IDS,
  UPDATE_PROFILE_HEADERS,
} from "../constants/apiConstants";
import { isEmpty, getNewHeadline, logIP } from "../utils/helpers";
import { httpService } from "../utils/httpService";

const { GET_PROFILE, UPDATE_PROFILE } = END_POINTS;

const updateProfile = async function (event = {}) {
  console.log("in updateProfile");
  const apiService = httpService();
  const username = event.username || process.env.NAUKRI_USERNAME;
  const password = event.password || process.env.NAUKRI_PASSWORD;
  console.log("\n\n\n\n", new Date(), { username, password }, "\n\n");
  logIP();

  try {
    if (isEmpty(apiService.authData?.token)) {
      const response = await apiService.login({ username, password });

      if (!response) {
        return { statusCode: 500 };
      }
    }
    if (!apiService.authData.token) {
      return { statusCode: 500 };
    }
    const { response = {} } = await apiService.getRequest({
      baseUrl: NAUKRI_BASE_URL,
      path: GET_PROFILE,
      headers: { Systemid: SYSTEM_IDS.NAUKRI },
      shouldAddToken: true,
    });
    const { resumeHeadline = "", profileId = "" } =
      response?.profile?.[0] || {};
    if (resumeHeadline && profileId) {
      console.log("resumeHeadline", resumeHeadline);
      const newHeadline = getNewHeadline(resumeHeadline);
      console.log("newHeadline", newHeadline);

      await apiService.postRequest({
        baseUrl: NAUKRI_BASE_URL,
        path: UPDATE_PROFILE,
        headers: { Systemid: SYSTEM_IDS.NAUKRI, ...UPDATE_PROFILE_HEADERS },
        shouldAddToken: true,
        body: {
          profile: {
            resumeHeadline: newHeadline,
          },
          profileId,
        },
      });
    }
  } catch (error) {
    console.log(
      "Error in updateProfile handler : ",
      error,
      JSON.stringify(error)
    );

    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello 123",
    }),
  };
};

export { updateProfile };
