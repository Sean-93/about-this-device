// DEVICE INFO CONSTRUCTOR
function DeviceInfo() {
  this.userAgent = navigator.userAgent;
  this.vendor = navigator.vendor;
  this.platform = navigator.platform;
  this.language = navigator.language;
  this.deviceMemory = navigator.deviceMemory || 'Not available'; // Requires HTTPS
  this.hardwareConcurrency = navigator.hardwareConcurrency || 'Not available';
  this.colorDepth = screen.colorDepth;
  this.isOnline = navigator.onLine;
  this.screenResolution = `${screen.width} x ${screen.height}`;
  this.browser = this.detectBrowser();
  this.os = this.detectOS();
  this.deviceType = this.detectDeviceType();
  this.connectionSpeed = "Checking..."; // Initially set to checking
}

// THIS DETECTS THE CURRENT BROWSER BEING USED
DeviceInfo.prototype.detectBrowser = function () {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/FBAN|FBAV/i)) {
    browserName = "Facebook";
  } else if (userAgent.match(/Instagram/i)) {
    browserName = "Instagram";
  } else if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i) || userAgent.match(/opera/i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else if (userAgent.match(/samsungbrowser/i)) {
    browserName = "Samsung Internet";
  } else if (userAgent.match(/ucbrowser/i)) {
    browserName = "UC Browser";
  } else if (userAgent.match(/Silk\//i)) {
    browserName = "Amazon Silk";
  } else if (userAgent.match(/Vivaldi/i)) {
    browserName = "Vivaldi";
  } else if (userAgent.match(/Brave/i)) {
    browserName = "Brave";
  } else if (userAgent.match(/Yandex/i)) {
    browserName = "Yandex";
  } else {
    browserName = "Unknown Browser";
  }

  return browserName;
};

// DETECTS OS TYPE 
DeviceInfo.prototype.detectOS = function () {
  let userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("Windows NT 10.0") != -1 || userAgent.indexOf("Windows NT 6.4") != -1) {
    return "Windows 10+";
  } else if (userAgent.indexOf("Windows NT 6.3") != -1) {
    return "Windows 8.1";
  } else if (userAgent.indexOf("Windows NT 6.2") != -1) {
    return "Windows 8";
  } else if (userAgent.indexOf("Windows NT 6.1") != -1) {
    return "Windows 7";
  } else if (userAgent.indexOf("Windows NT 6.0") != -1) {
    return "Windows Vista";
  } else if (userAgent.indexOf("Windows NT 5.1") != -1) {
    return "Windows XP";
  } else if (userAgent.indexOf("Windows NT 5.0") != -1) {
    return "Windows 2000";
  } else if (userAgent.indexOf("Macintosh") != -1 || userAgent.indexOf("MacIntel") != -1) {
    return "macOS";
  } else if (userAgent.indexOf("Mac OS X") != -1) {
    return "Mac OS X";
  } else if (userAgent.indexOf("Mac_PowerPC") != -1) {
    return "Mac OS (PPC)";
  } else if (userAgent.indexOf("Android") != -1) {
    return "Android";
  } else if (userAgent.indexOf("iPhone") != -1) {
    return "iOS (iPhone)";
  } else if (userAgent.indexOf("iPad") != -1) {
    return "iOS (iPad)";
  } else if (userAgent.indexOf("iPod") != -1) {
    return "iOS (iPod)";
  } else if (userAgent.indexOf("Linux") != -1) {
    return "Linux";
  } else if (userAgent.indexOf("X11") != -1) {
    return "UNIX";
  } else if (userAgent.indexOf("BlackBerry") != -1) {
    return "BlackBerry OS";
  } else if (userAgent.indexOf("Chrome OS") != -1) {
    return "Chrome OS";
  } else {
    return "OS Not Detected";
  }
};

// DETECTS DEVICE TYPE
DeviceInfo.prototype.detectDeviceType = function () {
  const ua = navigator.userAgent;

  if (/iPad/.test(ua) || (ua.includes("Android") && !ua.includes("Mobile"))) {
    return "Tablet";
  } else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  } else if (/Mobile|iPhone|iPod|Android|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "Mobile";
  }
  return "Desktop";
};

// THIS MEASURES DEVICE CONNECTION SPEED
DeviceInfo.prototype.measureConnectionSpeed = function () {
  const imageAddr = "https://images-assets.nasa.gov/image/PIA00405/PIA00405~medium.jpg";
  const downloadSize = 13055440; // Size in bytes

  const self = this; // Reference to the DeviceInfo instance

  const download = new Image();
  download.onload = function () {
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // Time in seconds
    const bitsLoaded = downloadSize * 8; // Total bits loaded
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);

    let speedStr;
    if (speedMbps > 1) {
      speedStr = speedMbps + " Mbps";
    } else if (speedKbps > 1) {
      speedStr = speedKbps + " kbps";
    } else {
      speedStr = speedBps + " bps";
    }

    self.connectionSpeed = speedStr;
    self.displayInfo(); // Update the displayed info
  };

  download.onerror = function () {
    self.connectionSpeed = "Could not measure connection speed";
    self.displayInfo();
  };

  const startTime = new Date().getTime();
  const cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;
};

// OUTPUTS ALL INFO TO THE DOM
DeviceInfo.prototype.displayInfo = function () {
  const infoData = [
    `&#x25C6; Status: <b>${this.isOnline ? 'Online' : 'Offline'}</b>`,
    `&#x25C6; Connection: <b>${this.connectionSpeed}</b>`,
    `&#x25C6; Browser: <b>${this.browser}</b>`,
    `&#x25C6; Vendor: <b>${this.vendor}</b>`,
    `&#x25C6; Device: <b>${this.deviceType}</b>`,
    `&#x25C6; System: <b>${this.os}</b>`,
    `&#x25C6; Platform: <b>${this.platform}</b>`,
    `&#x25C6; Resolution: <b>${this.screenResolution}</b>`,
    `&#x25C6; Language: <b>${this.language}</b>`,
    `&#x25C6; Color Depth: <b>${this.colorDepth}</b>`,
    `&#x25C6; Device Memory: <b>${this.deviceMemory}gb</b>`,
    `&#x25C6; CPU Cores: <b>${this.hardwareConcurrency}</b>`,
    `&#x25C6; User Agent: <b>${this.userAgent}</b>`
  ];

  // Update marquee content
  const marqueeText = document.querySelector("#marquee");
  if (marqueeText) {
    marqueeText.innerHTML = infoData.map(item => `<span>${item}</span>`).join(' ');
    calculateWidths();
    animateMarquee();
  }

  // Update device info results
  const results = document.getElementById("device-info-results");
  if (results) {
    results.innerHTML = infoData.join('<br/>');

    // CODE TO CONCURRENTLY ANIMATE FADE-IN DATA IN <b> TAGS
    function animateBTags(bTags) {
      bTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.animation = 'fadeIn 1s ease forwards';
        }, 250 * index);
      });
    }

    // FADES IN EACH DATA POINT WITH A .25s DELAY
    setTimeout(() => {
      const deviceInfoResultsBTags = document.querySelectorAll('#device-info-results b');
      const marqueeBTags = document.querySelectorAll('#marquee b');

      // Call animate function for each NodeList
      animateBTags(deviceInfoResultsBTags);
      animateBTags(marqueeBTags);
    }, 0);
  }
};

// MARQUEE CODE
let marqueeWidth;
let containerWidth;
let animationDuration;

// Marquee Animation Functions
function calculateWidths() {
  const marqueeText = document.querySelector("#marquee");
  if (marqueeText) {
    marqueeWidth = marqueeText.offsetWidth;
    const container = document.querySelector(".marquee-container");
    containerWidth = container ? container.offsetWidth : 0;
    animationDuration = marqueeWidth / 50;
  }
}

function animateMarquee() {
  const marqueeText = document.querySelector("#marquee");
  if (marqueeText) {
    marqueeText.style.transform = "translateX(" + containerWidth + "px)";
    marqueeText.animate([
      { transform: "translateX(" + containerWidth + "px)" },
      { transform: "translateX(-" + marqueeWidth + "px)" }
    ], {
      duration: animationDuration * 1000,
      iterations: Infinity
    });
  }
}

// EXECUTION
const deviceInfo = new DeviceInfo();
deviceInfo.measureConnectionSpeed(); // This will update the connection speed when done

// Event listener for window resize
window.addEventListener("resize", () => {
  const newMarqueeWidth = document.querySelector("#marquee").offsetWidth;
  const newContainerWidth = document.querySelector(".marquee-container").offsetWidth;

  if (newMarqueeWidth !== marqueeWidth || newContainerWidth !== containerWidth) {
    calculateWidths();
    animateMarquee();
  }
});