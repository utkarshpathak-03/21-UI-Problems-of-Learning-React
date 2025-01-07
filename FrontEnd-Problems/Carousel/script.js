let sceneryIndex = 1;
displaySlideShow(sceneryIndex);

function displaySlideShow(slideIndex) {
  let numOfSlides = document.getElementsByClassName("mySlides");
  let numOfDots = document.getElementsByClassName("dots");
  console.log("numOfSlides ", numOfSlides);
  if (slideIndex < 1) {
    sceneryIndex = numOfSlides.length;
  }
  if (slideIndex > numOfSlides.length) {
    sceneryIndex = 1;
  }

  for (let i = 0; i < numOfSlides.length; i++) {
    numOfSlides[i].style.display = "none";
  }
  for (let i = 0; i < numOfDots.length; i++) {
    numOfDots[i].style.background = "gray";
  }
  numOfDots[sceneryIndex - 1].style.background = "black";
  numOfSlides[sceneryIndex - 1].style.display = "block";
}

function goTo(value) {
  console.log("Hey , after click sceneryIndex value", sceneryIndex + value);
  displaySlideShow((sceneryIndex += value));
}

function goToCurrent(index) {
  displaySlideShow((sceneryIndex = index));
}
