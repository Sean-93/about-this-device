function fnBrowserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/FBAN|FBAV/i)) {
    browserName = "Facebook";
  } else {
    browserName = "Unable to detect current browser.";
  }

  document.getElementById("browser-results").innerHTML =
    "&#x25C6; Browser: " + "<b>" + browserName + "</b>";
}

fnBrowserDetect();
