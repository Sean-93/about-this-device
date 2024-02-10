// FOR SOME REASON, ASCII ART GETS MESSED UP WHEN VIEWING A SITE THROUGH A META/FB/INSTA BROWSER WHEN USING AN ANDROID- IT MAKES THE ASCII ART WAAAAY TOO BIG, SO THIS IS HERE TO CORRECT THAT

const metaBrowserFix = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Consolidated condition
  if (/android/i.test(userAgent) && (userAgent.includes('FBAN') || userAgent.includes('FBAV') || userAgent.includes('Instagram'))) {
    const screenContainer = document.getElementById("screenContainer");

    screenContainer.style.transform = "scale(0.25)";
    screenContainer.style.marginTop = "-95%";
    screenContainer.style.marginBottom = "-85%";
  }
};

// Running the detection function
metaBrowserFix();
