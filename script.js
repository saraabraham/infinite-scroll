// Unsplash API
const imageContainer = document.getElementById('image-container');
const loader1 = document.getElementById('load');
// Photos array to store the photos
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const ImageLoadedCount = 5;
const apiKey = 'MxzAk5O7oBiCvClMN7R7OICnuaIiyxTatIDRo4yzSjM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${ImageLoadedCount}`;


function imageLoaded(){
imagesLoaded++;
if (imagesLoaded === totalImages){
    ready = true;
    loader1.hidden = true;
    ImageLoadedCount = 30;
    
}
}

// Helper function to set the attributes of elements in DOM.

function setAttributes(element,attributes){
for(const key in attributes)
{
 element.setAttribute(key,attributes[key]);
}
}

// Displays photos by adding links and other attributes to DOM.
function displayPhoto(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run function for each element in photoarray.
    
      photosArray.forEach(photo => {
        //create an <a> tag for each photo.
        const item = document.createElement('a');
        
        setAttributes(item,
        {href:photo.links.html,
        target:'_blank'});
        // Create img tag for photos.
        const image = document.createElement('img');
       
        setAttributes(image,
            {src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description});
        //Event Listener checks whether each image has finished laoding
        image.addEventListener('load',imageLoaded)    
        // Adding the <img> tag inside <a> and <a> inside the image container.
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}



// Get photos from Unsplash
async function getPhotos(){
    try{
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhoto();
    }
    catch{
        // Catch error
    }
}

// Checks if we have scrolled and reached cloase to the bottom of the page, ifso to load more images.
window.addEventListener('scroll', () =>{
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{
    ready = false;
    getPhotos();
}
});

//On load
getPhotos();