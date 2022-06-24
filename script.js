//Selectors
const container = document.getElementById('image-container')
const loader = document.getElementById('loader')

//Globals
const APIKEY = '03kGCovok0Dt55F_7sk8TMb7j-UOD9vDiRY6_fuhPBc'
let ready = false;
const count = 30
let callCount = 0;


//Loader functions

const hideLoader = () => loader.classList.add('hide')
const showLoader = () => loader.classList.remove('hide')
// Fetch images
const getImages = async () => {
    const apiURL = `https://api.unsplash.com/photos/random?client_id=${APIKEY}&count=${count}`
    try {
        showLoader()
        const response = await fetch(apiURL)
        const data = await response.json()
        displayImages(data)
    } catch (e) {
        renderStaticContent()
        alert(e)

    }
}

//Display images in the DOM
const displayImages = (data) => {
    callCount++
    hideLoader()
    let element = document.createElement('div')
    element.setAttribute('id', 'Ajax-Content')
    element.innerHTML = data.map(image => {
        {
            const {links, urls, description} = image
            return `<a href="${links.html}" target="_blank"><img src="${urls.regular}" alt="${description}"></a>`
        }
    }).join('')
    container.appendChild(element)
    imageLoaded()
}


//Check loading

const imageLoaded = () => {


    // imagesCount === renderedImage? ready = true : ready = false

    if (container.childElementCount === callCount) {
        ready = true

    }
}

//Render static content

const renderStaticContent = () => {
    container.innerHTML = `<div class="wave">
   <span style="--i:1">W</span>
   <span style="--i:2">o</span>
   <span style="--i:3">w</span>
   <span style="--i:4">,</span>
   <span style="--i:5">s</span>
   <span style="--i:6">U</span>
   <span style="--i:7">c</span>
   <span style="--i:8">h</span>
   <span style="--i:9"> </span>
   <span style="--i:10">e</span>
   <span style="--i:11">m</span>
      <span style="--i:12">p</span>
            <span style="--i:13">t</span>
   <span style="--i:14">y</span>
   <span style="--i:15">!</span>
  </div>
    <img class="img-dodge" src="./giphy-downsized-large.gif" alt="empty">
`
}


//Check Scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getImages()
    }
})


getImages()