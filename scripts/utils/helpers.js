// const http = require("http");

function isEmpty(a) {
  return (
    a === undefined ||
    a === null ||
    (Array.isArray(a) && !a.length) ||
    (typeof a === "object" && Object.keys(a).length === 0) ||
    a === false ||
    a === 0 ||
    a === "" ||
    !a
  );
}

function getBearerToken(token = "") {
  if (token) {
    return `Bearer ${token}`;
  }

  return "";
}

function getAuthToken(authData = {}) {
  if (authData?.token) {
    return { Authorization: getBearerToken(authData?.token) };
  }

  return {};
}

function getNewHeadline(prevHeadline = "") {
  const words = prevHeadline.split(" ").filter((word) => !!word);
  let newWords = [];
  if (words?.length) {
    const lastWord = words[words?.length - 1] || "";
    if (lastWord?.endsWith(".")) {
      if (lastWord.length === 1) {
        const lastPrevWord = words[words.length - 2];

        newWords = [...words.slice(0, words.length - 2), lastPrevWord + "."];
      } else {
        newWords = [
          ...words.slice(0, words.length - 1),
          lastWord.slice(0, lastWord.length - 1),
          ".",
        ];
      }
    } else {
      newWords = [...words.slice(0, words.length - 1), lastWord + "."];
    }
  }

  return newWords.join(" ");
}

function logIP() {
  // http
  //   .get("http://httpbin.org/get", function (res) {
  //     var body = "";
  //     res.on("data", function (chunk) {
  //       body += chunk;
  //     });
  //     res.on("end", function () {
  //       console.info(body);
  //     });
  //   })
  //   .on("error", function (e) {
  //     console.error(e.message);
  //   });
}

export { isEmpty, getBearerToken, getAuthToken, getNewHeadline, logIP };
