"use strict";

window.addEventListener("load", createLightbox);

function createLightbox() 
{
  // Lightbox Container
  let lightBox = document.getElementById("lightbox");

  // Parts of the lightbox
  let lbTitle = document.createElement("h1");
  let lbCounter = document.createElement("div");
  let lbPrev = document.createElement("div");
  let lbNext = document.createElement("div");
  let lbPlay = document.createElement("div");
  let lbImages = document.createElement("div");

  // Design the lightbox title
  lightBox.appendChild(lbTitle);
  lbTitle.id = "lbTitle";
  lbTitle.textContent = lightboxTitle;

  // Design the lightbox slide counter
  lightBox.appendChild(lbCounter);
  lbCounter.id = "lbCounter";
  let currentImg = 1;
  lbCounter.textContent = currentImg + " / " + imgCount;

  // Design the lightbox previous slide button
  lightBox.appendChild(lbPrev);
  lbPrev.id = "lbPrev";
  lbPrev.innerHTML = "&#9664;";
  lbPrev.onclick = showPrev;

  // Design the lightbox next slide button
  lightBox.appendChild(lbNext);
  lbNext.id = "lbNext";
  lbNext.innerHTML = "&#9654;";
  lbNext.onclick = showNext;

  // Design the lightbox Play-Pause button
  lightBox.appendChild(lbPlay);
  lbPlay.id = "lbPlay";
  lbPlay.innerHTML = "&#x1F501";
  let timeID;
  lbPlay.onclick = function () {
    if (timeID) {
      // Stop the slideshow
      window.clearInterval(timeID);
      timeID = undefined;
    } else {
      // Start the slideshow
      showNext();
      timeID = window.setInterval(showNext, 1500);
    }
  }

  // Design the lightbox images container
  lightBox.appendChild(lbImages);
  lbImages.id = "lbImages";
  // Add images from the imgFiles array to the container
  for (let i = 0; i < imgCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    image.onclick = createOverlay;
    lbImages.appendChild(image);
  }

  // Function to move forward through the image list
  function showNext() {
    lbImages.appendChild(lbImages.firstElementChild);
    (currentImg < imgCount) ? currentImg++ : currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  // Function to move backward through the image list
  function showPrev() {
    lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
    (currentImg > 1) ? currentImg-- : currentImg = imgCount;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  function createOverlay() {
    let overlay = document.createElement("div");
    overlay.id = "lbOverlay";

    // Add the figure box to the overlay
    let figureBox = document.createElement("figure");
    overlay.appendChild(figureBox);

    // Add the image to the figure box
    let overlayImage = this.cloneNode(true);
    figureBox.appendChild(overlayImage);

    // Add the caption to the figure box
    let overlayCaption = document.createElement("figcaption");
    overlayCaption.textContent = this.alt;
    figureBox.appendChild(overlayCaption);

    // Add a close button to the overlay
    let closeButton = document.createElement("div");
    closeButton.id = "lbOverlayClose";
    closeButton.innerHTML = "&#10006;";
    overlay.appendChild(closeButton);
    closeButton.onclick = function () {
      lightBox.removeChild(overlay);
    }

    // Add a favorites button to the overlay
    let favoritesButton = document.createElement("div");
    favoritesButton.id = "lbOverlayFavorites";
    favoritesButton.textContent = "Add to Favorites";
    overlay.appendChild(favoritesButton);
    favoritesButton.onclick = function () {
      addToFavorites(this, overlayImage.cloneNode(true));
    }

    lightBox.appendChild(overlay);
}

function addToFavorites(button, image) {
   // Get the favorites container element
   let favoritesContainer = document.getElementById("favorites");
   // Get the count of favorite images
   let favoritesCount = favoritesContainer.childElementCount;
 
   // Check if the maximum limit of 3 favorites has been reached
   if (favoritesCount >= 3) {
     alert("Only 3 images can be in favorites. Please remove at least one favorite first.");
     return;
   }
 
   let isDuplicate = false;
   // Get all the favorite images
   let favoritesImages = favoritesContainer.getElementsByTagName("img");
   // Check if the clicked image is already in favorites
   for (let i = 0; i < favoritesImages.length; i++) {
     if (favoritesImages[i].src === image.src) {
       isDuplicate = true;
       break;
     }
   }
 
   // If the image is already in favorites, display an alert and return
   if (isDuplicate) {
     alert("Image is already in favorites.");
     return;
   }
 
   // Create elements for the new favorite image and remove button
   let favorite = document.createElement("div");
   favorite.className = "favorite";
   let favoriteImage = document.createElement("img");
   favoriteImage.src = image.src;
   favoriteImage.alt = image.alt;
   favoriteImage.width = 150;
   favoriteImage.height = 150;
   
  // Create the remove button that is initially hidden
  let removeButton = document.createElement("div");
  removeButton.className = "removeButton";
  removeButton.textContent = "Remove";
  removeButton.style.display = "none";
  removeButton.onclick = function () {
    favoritesContainer.removeChild(favorite);
  }

  // Toggle the visibility of the remove button
  favoriteImage.onclick = function () {
   if (removeButton.style.display === "none") {
     removeButton.style.display = "block";
   } else {
     removeButton.style.display = "none";
   }
 }
  // Append the favorite image and remove button to the favorite container
  favorite.appendChild(favoriteImage);
  favorite.appendChild(removeButton);
  // Append the favorite container to the favorites container
  favoritesContainer.appendChild(favorite);

  // Hide the button that was clicked to add the image to favorites
  button.style.display = "none";
}
 
}
