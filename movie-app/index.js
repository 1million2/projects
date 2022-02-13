const key = "bbd748681267b90b094266ac3e09c2e0";
const startUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;
const form = document.querySelector("form");
const inputBtn = document.querySelector(".input__btn");
const hedingEmpty = document.querySelector(".empty-list");

function showData (data) {
    const cards = document.querySelector(".cards");
    // перед новым запросом удаляем старые карточки
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    data.map(function (item) {
        const img = document.createElement("img");
        const card = document.createElement("div");
        img.alt = item.original_title
        img.src = `http://image.tmdb.org/t/p/w300/${item.poster_path}`;

        if (!item.poster_path){
            img.src = "";
        }

        card.classList.add("card__body");
        card.innerHTML = 
            `<div class="card-image">
                <img src="${img.src}" alt="${img.alt}">
            </div>
            <div class="card-title">
                <h2>${item.original_title}</h2>
            </div>
            <div class="card-description"><p>${item.overview}</p></div>
            <div class="card-footer">
                <div class="card-score">${item.vote_average.toFixed(1)}</div>
                <span>&#183;</span>
                <div class="release"><p>${item.release_date.substring(0,4)}</p></div>
            </div>`;
        cards.append(card);
        // если рейтинг фильма больше чем 8 - меняем фон на зеленый
        if (item.vote_average >= 8) {
            card.querySelector(".card-score").style.backgroundColor = "#64dd00";
        }
    })
    // если по запросу ничего не найдено, то показываем надпись что ничего не найдено
    if (cards.children.length === 0) {
        cards.append(hedingEmpty)
        hedingEmpty.classList.add("active");
    } else {
        hedingEmpty.classList.remove("active");
    }
}


async function getData (url) {
    const response = await fetch(url);
    const data = await response.json()
    const cardData = data.results;
    if (response.ok) {
        showData(cardData);
    }
    else {
        console.error("403 - Too many request");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    getData(startUrl)
})

inputBtn.addEventListener("click", (e)=> {
    e.preventDefault()
    form.querySelector("input").value = "";
})

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const formData = new FormData(form)
    const searchText = formData.get("movie-name");
    const cards = document.querySelector(".cards");

    // // перед новым запросом удаляем старые карточки
    // while (cards.firstChild) {
    //     cards.removeChild(cards.firstChild);
    // }
    const newUrl = `https://api.themoviedb.org/3/search/movie?api_key=bbd748681267b90b094266ac3e09c2e0&language=en-US&query=${searchText}&page=1&include_adult=false`
    getData(newUrl);
    formData.set("movie-name", searchText)
})

console.log("Самооценка автора:\n\все пункты выполнены: 60 баллов");
