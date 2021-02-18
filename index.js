const url = "http://localhost:3000/comics"
const reviewUrl = "http://localhost:3000/reviews"
const favUrl = "http://localhost:3000/favorites"
const genreUrl = "http://localhost:3000/comedy_genres"
const comicBar = document.querySelector('.all-comics')
const comicContainer = document.querySelector(".comic-container")
const genresList = document.querySelector("#genre-list")
const allComics = document.querySelector('#all-button')
const genres = document.querySelector('#genre-button')
const comicDetail = document.querySelector('#one-comic')
const comicImage = document.querySelector('.comic-image')
const comicName = document.querySelector('.name')
const comicVideo = document.querySelector('.video')
const comicBio = document.querySelector('.bio')
const favList = document.querySelector("#fav-list")
const heartBtn = document.querySelector(".heart")
const reviewBox = document.querySelector(".form")


comicDetail.style.display = 'none'

allComics.addEventListener('click', fetchComicItems)
genresList.addEventListener('click', fetchOneGenre)
heartBtn.addEventListener('click', addToFavs)
favList.addEventListener('click', handleFavClick)

// function deleteFav(event){

// }

reviewBox.addEventListener('submit', createReview)
function createReview(event){
    event.preventDefault()
    // console.log(event.target.querySelector('textarea').value)
    const content = event.target.querySelector('textarea').value
    const comic_id = comicDetail.dataset.id
    const user_id = 1
    const newReview = {content, comic_id, user_id}

    fetch(reviewUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newReview)
    })
    .then(response => response.json())
    // .then(reviewData => )
    event.target.reset()
}

function addToFavs(event){
    // console.log(event)
    const comicId = comicDetail.dataset.id
    // heartBtn.textContent = "❤️"
    // if (event.target.className === 'heart') {
    //     favLi.remove() 
    fetch(favUrl, {
        method: 'POST',
        headers: {'Content-Type': "application/json"},
        body: JSON.stringify({
            user_id: 1,
            comic_id: comicId
        })
    })
    .then(response => response.json())
   
    // .then(favData => displayFavComic(favData))
   fetchFavList()
   Array.from(favList.children).forEach(x => {
    x.remove()})
}


function fetchFavList() {
    fetch(favUrl)
    .then(response => response.json())
    .then(favData => favData.forEach(fav => displayFavComic(fav)))

    
}

fetchFavList()

function displayFavComic(fav){
    const deleteButton = document.createElement('button')
    deleteButton.className = "fav-delete"
    deleteButton.textContent = "💔"
    deleteButton.dataset.id = fav.id
    const favLi = document.createElement("li")
    favLi.className = "one-fav"
    favLi.textContent = fav.comic_name
    favLi.dataset.id = fav.id
    favLi.id = fav.comic.id
    favList.append(favLi)
    favLi.append(deleteButton)
    
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
    .then(comic => displayOneComic(comic))
    }
    Array.from(comicReviewUl.children).forEach(x => {
        x.remove()})
}

const comicReviewUl = document.querySelector("#review-list")

function displayOneComic(comic){
    // console.log(comic)
    comicDetail.style.display = 'block'
    comicDetail.dataset.id = comic.id
    comicImage.src = comic.image
    comicImage.alt = comic.name
    comicName.innerText = comic.name
    comicVideo.src = comic.video
    comicBio.innerText = comic.bio
    comic.reviews.forEach(oneReview => displayReview(oneReview))
}

function displayReview(oneReview){
    const comicReviewLi = document.createElement("li")
    comicReviewLi.dataset.id = oneReview.id
    comicReviewLi.textContent = oneReview.content
    comicReviewUl.append(comicReviewLi)
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

function handleFavClick(event){
    // console.log(event)
    const favId = event.target.dataset.id
    const favLi = event.target.closest('li')
    if (event.target.className === 'fav-delete') {
        favLi.remove() 
    fetch(`${favUrl}/${favId}`, {
        method: 'DELETE'
    })
    }
    else if (event.target.className === 'one-fav') {
        // console.log(event.target.id)
        const comicId = event.target.id
        fetch(`${url}/${comicId}`)
            .then(response => response.json())
            .then(comic => displayOneComic(comic))
       
    }
}

