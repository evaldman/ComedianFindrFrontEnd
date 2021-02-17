const url = "http://localhost:3000/comics"
const comicBar = document.querySelector('.all-comics')
const comicContainer = document.querySelector(".comic-container")
const genresList = document.querySelector("#genre-list")
const allComics = document.querySelector('#all-button')
const genres = document.querySelector('#genre-button')
const genreUrl = "http://localhost:3000/comedy_genres"
const comicDetail = document.querySelector('#one-comic')
const comicImage = document.querySelector('.comic-image')
const comicName = document.querySelector('.name')
const comicVideo = document.querySelector('.video')
const comicBio = document.querySelector('.bio')
const favUrl = "http://localhost:3000/favorites"
const favList = document.querySelector("#fav-list")

allComics.addEventListener('click', fetchComicItems)
genresList.addEventListener('click', fetchOneGenre)
comicDetail.style.display = 'none'

function fetchFavList() {
    fetch(favUrl)
    .then(response => response.json())
    .then(favData => favData.forEach(fav => displayFavComic(fav)))
}

fetchFavList()

function displayFavComic(fav){
    const favLi = document.createElement("li")
    favLi.textContent = fav.comic.name
    favLi.dataset.id = fav.id
    favList.append(favLi)
}

function fetchComicItems(){
    comicDetail.style.display = 'none'
    genresList.innerHTML = ""
    comicImage.src = ""
    comicImage.alt = ""
    comicName.innerHTML = ""
    comicVideo.src = ""
    comicBio.innerHTML = ""
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(item => displayComic(item)))
    Array.from(comicBar.children).forEach(x => {
        x.remove()})
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
    comicDetail.style.display = 'none'
    comicBar.innerHTML = ""
    comicImage.src = ""
    comicImage.alt = ""
    comicName.innerHTML = ""
    comicVideo.src = ""
    comicBio.innerHTML = ""
    fetch(genreUrl)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => data.forEach(genre => displayGenres(genre)))
    Array.from(genresList.children).forEach(x => {
            x.remove()})
}

const genreList = document.querySelector('#genre-list')

function displayGenres(genre){
    // console.log(genre)
    const genreLi = document.createElement('li')
    genreLi.className = 'list'
    genreLi.dataset.id = genre.id
    genreLi.innerText = genre.genre_name
    genreList.append(genreLi)
    
}

comicBar.addEventListener('click', itemClick)

function itemClick(event){
    if (event.toElement.localName === 'img'){
    const itemId = event.target.dataset.id
    fetch (`${url}/${itemId}`)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => displayOneComic(data))
    }
    
}
function displayOneComic(data){
    // console.log(data)
    comicDetail.style.display = 'block'
    comicDetail.dataset.id = data.id
    comicImage.src = data.image
    comicImage.alt = data.name
    comicName.innerText = data.name
    comicVideo.src = data.video
    comicBio.innerText = data.bio
}

genresList.addEventListener('click', fetchOneGenre)

function fetchOneGenre(event){ 
    if (event.toElement.localName === 'li'){
        genresList.innerHTML = ""
        const genreId = event.target.dataset.id
        fetch (`${genreUrl}/${genreId}`)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(genreData => genreData.comics.forEach(comic => displayOneGenre(comic)))
    }
}

function displayOneGenre(comic){
    // console.log(comic)
    const comicImg = document.createElement("img")
    comicImg.src = comic.image
    comicImg.dataset.id = comic.id
    // console.log(comicImg)
    comicBar.append(comicImg)
}

