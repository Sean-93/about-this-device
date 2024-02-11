// FOR SOME REASON, ASCII ART GETS MESSED UP WHEN VIEWING A SITE THROUGH A META/FB/INSTA BROWSER WHEN USING AN ANDROID- IT MAKES THE ASCII ART WAAAAY TOO BIG, SO THIS IS HERE TO CORRECT THAT

const metaBrowserFix = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Consolidated condition
  if (/android/i.test(userAgent) && (userAgent.includes('FBAN') || userAgent.includes('FBAV') || userAgent.includes('Instagram'))) {
    const screenContainer = document.getElementById("screenContainer");

    screenContainer.style.transform = "scale(0.35)";
    screenContainer.style.marginTop = "-52.5%";
    screenContainer.style.marginBottom = "-52.5%";
    screenContainer.style.marginLeft = "-82.5%";
  }
};

// Running the detection function
metaBrowserFix();
