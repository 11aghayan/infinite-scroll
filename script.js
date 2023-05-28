const imgContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API 
const count = 30;
const apiKey = '3tFB8jooWHsgJJVuVZOzsjicZRxYFc_sO4Vo0ul-nIk';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images have been loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(elm, attributes) {
  for (const key in attributes) {
    elm.setAttribute(key, attributes[key]);
  }
}

// Cretae elements for links and photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;


  // Run function for each object in photosArray
  photosArray.forEach( photo => {

    // Create <a> to redirect to unsplash
    const a = document.createElement('a');
    setAttributes(a, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event listener, check when each photo has finished loading
    img.addEventListener('load', imageLoaded);

    // Put the <img> inside <a>, then put both inside image-container 
    a.appendChild(img);
    imgContainer.appendChild(a);

  } )

}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const res = await fetch(apiURL);
    photosArray = await res.json();
    displayPhotos();
  } catch(err) {
    console.log(err)
  }
}

// Check to see if scrolling near bottom of the page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 
    &&
    ready
    ) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos()