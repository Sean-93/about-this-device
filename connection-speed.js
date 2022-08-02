// DEFINING A REFERENCE POINT SO CONNECTION CAN BE MEASURED

const imageAddr =
  "https://images-assets.nasa.gov/image/PIA00405/PIA00405~medium.jpg";
const downloadSize = 13055440;

// PROGRESS MESSAGE

function ShowProgressMessage(msg) {
  document.getElementById("connection-speed-results").innerHTML = msg;
}

// MAIN FUNCTION THAT INITIALIZES THE OTHER FUNCTIONS- IS CALLED AT BOTTOM

function InitiateSpeedDetection() {
  ShowProgressMessage("Checking speed, please wait...");
  window.setTimeout(MeasureConnectionSpeed, 0);
}

// THIS IS THE FUNCTION THAT ACTUALLY MEASURES THE CONNECTION SPEED

function MeasureConnectionSpeed() {
  let startTime, endTime;
  const download = new Image();
  download.onload = function () {
    endTime = new Date().getTime();
    showResults();
  };
  download.onerror = function (err, msg) {
    ShowProgressMessage("Invalid image, or error downloading");
  };
  startTime = new Date().getTime();
  const cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;
  function showResults() {
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = downloadSize * 8;
    const speedBps = (bitsLoaded / duration).toFixed(2);
    const speedKbps = (speedBps / 1024).toFixed(2);
    const speedMbps = (speedKbps / 1024).toFixed(2);

    if (speedMbps > 1) {
      ShowProgressMessage("Your connection speed is " + speedMbps + " Mbps");
    } else if (speedKbps > 1) {
      ShowProgressMessage("Your connection speed is " + speedKbps + " kbps");
    } else {
      ShowProgressMessage("Your connection speed is " + speedBps + " bps");
    }
  }
}

InitiateSpeedDetection();
