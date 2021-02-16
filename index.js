const url = "http://localhost:3000/comics"
const comicBar = document.querySelector('.all-comics')
const comicContainer = document.querySelector(".comic-container")
const genresList = document.querySelector("#genre-list")

const allComics = document.querySelector('#all-button')
const genres = document.querySelector('#genre-button')
const genreUrl = "http://localhost:3000/comedy_genres"

allComics.addEventListener('click', fetchComicItems)

function fetchComicItems(){
    genresList.innerHTML = ""
    fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data))
    // .then(location.reload())
    .then(data => data.forEach(item => displayComic(item)))
}

function displayComic(item){
    const comicImg = document.createElement("img")
    comicImg.src = item.image
    comicImg.dataset.id = item.id
    // console.log(comicImg)

     comicBar.append(comicImg)
}

genres.addEventListener('click', fetchGenres)

function fetchGenres(){
    comicBar.innerHTML = ""
    comicContainer.innerHTML = ""
    fetch(genreUrl)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => data.forEach(genre => displayGenres(genre)))
    // reload()
}

// function removeAll(){
//     comicBar.innerHTML = ""
//     comicContainer.innerHTML = ""
//     allGenres.innerHTML = ""
// }

const genreList = document.querySelector('#genre-list')

function displayGenres(genre){
    // console.log(genre)
    // location.reload()
    const genreLi = document.createElement('li')
    genreLi.dataset.id = genre.id
    genreLi.innerText = genre.genre_name
    genreList.append(genreLi)
}

comicBar.addEventListener('click', itemClick, {passive: true})

function itemClick(event){
    if (event.toElement.localName === 'img'){
    const itemId = event.target.dataset.id
    fetch (`${url}/${itemId}`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => displayOneComic(data))
    }
}

const comicDetail = document.querySelector('.comic-container')
const comicImage = document.querySelector('.comic-image')
const comicName = document.querySelector('.name')
const comicVideo = document.querySelector('.video')
const comicBio = document.querySelector('.bio')
function displayOneComic(data){
    // console.log(data)
    comicDetail.dataset.id = data.id
    comicImage.src = data.image
    comicImage.alt = data.name
    comicName.innerText = data.name
    comicVideo.src = data.video
    comicBio.innerText = data.bio

}

// fetchComicItems()