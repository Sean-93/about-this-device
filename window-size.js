// DETECTS + OUTPUTS SCREEN SIZE

function DisplayWindowSize() {
  document.getElementById("window-size-results").innerHTML =
    "&#x25C6; Screen Resolution: " + "<b>" + screen.width + "x" + screen.height + "</b>";
}

DisplayWindowSize();

// DETECTS SCREEN SIDE CHANGE (DOES NOT WORK FOR DETECTING WINDOW SIZE CHANGE)

window.addEventListener('resize', DisplayWindowSize);
