const APIKey = `01775c90fc3bfda08ddcd5f4c0167804`;
let movie = [];
let obj = []
let genre;

let mvContainer = document.querySelectorAll(".movie-container");


const mvCard = document.querySelector("#card-section")


let pageNum = 1;

function displayUi(movie){
    // console.log(movie.length)
    mvCard.innerHTML = "";

    if(movie.length > 0){
        movie.map((e)=>{
            const {title,poster_path,original_language,vote_average} = e;
    
            const divTag = document.createElement("div")
            divTag.setAttribute("class","movie-container")
    
            let imgUrl = `https://image.tmdb.org/t/p/original${poster_path}`
            let lang = original_language.toUpperCase()
    
            divTag.innerHTML = `<img class="movie-img" src=${imgUrl} alt=${title}/>
                                <h3 class="movie-name">${title}</h3>
                                <div class="info">
                                <p class="movie-lang">${lang}</p>
                                <p class="movie-rating">${vote_average}</p>
                                </div>`
            
            mvCard.appendChild(divTag);
        })
    }else{

        mvCard.innerHTML = `
        <div class="empty-gendre">No match found!
        <div>Please check with other genre's from the list !</div>
        </div>
        `

    }
    

    

}

async function fetchData(){
    try{
        const response =await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKey}&language=en&page=${pageNum}`)

        let data = await response.json()
    
        movie = data.results
        obj = data.results

        displayUi(movie);
        fetchGendre()
        mvContainer = document.querySelectorAll(".movie-container")
        displayModal()

    }catch(err){
        console.log(err)
    }

}

fetchData()


async function fetchGendre(){
    
    const genreRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=en`)
    let genreData = await genreRes.json();

    genre = genreData.genres

    const ulTag = document.querySelector(".genreList")

    for(let i=0;i<genre.length;i++){
        let liTag = document.createElement("li")
        liTag.classList.add("genre");
        liTag.id = genre[i].id;
        liTag.textContent = genre[i].name;

        ulTag.appendChild(liTag);
    }
    
    const genreArray  = document.querySelectorAll(".genre")
    
    for(let i=0;i<genreArray.length;i++){

        genreArray[i].addEventListener("click", (evt)=>{  
            obj = movie.filter((e)=>{
                return e.genre_ids.includes(Number(evt.target.id))
            })
            displayUi(obj)
            mvContainer = document.querySelectorAll(".movie-container") 
            displayModal()      
        })
    }  
}


const sInput = document.querySelector("#text-search")
const sBtn = document.querySelector("#submit-search")

async function searchMovie(){
    let sText = sInput.value;
    const searchApiRes = await fetch(`https://api.themoviedb.org/3/search/movie?query=${sText}&api_key=${APIKey}&include_adult=false&language=en-US&page=${pageNum}`)
    const sApiData = await searchApiRes.json();

    movie = sApiData.results
    obj = sApiData.results

    displayUi(movie);
    mvContainer = document.querySelectorAll(".movie-container")
    displayModal()        
}

sBtn.addEventListener("click",searchMovie);

// function debounceSearch(){
//     let timer;

//     clearTimeout(timer);

//     timer = setTimeout(()=>{
//         if(sInput.value.length >0){
//             searchMovie()
//         }
//         else{
//             fetchData()
//         }
        
//     },3000);  
// }


// sInput.addEventListener("input",debounceSearch)

const modalContainer = document.querySelector(".modal-container")


function displayModal(){
    for(let i=0;i<mvContainer.length;i++){
        mvContainer[i].addEventListener("click",()=>{

            const {title,poster_path,original_language,vote_average,overview} = obj[i];
            localStorage.setItem("mvTitle",title)

            let posterUrl = `https://image.tmdb.org/t/p/original${poster_path}`
            let runtime = Math.floor(Math.random()*(200-150)+150)
            let lang = original_language.toUpperCase()
            let duration = runtime*2

            localStorage.setItem("mvPrice",runtime)


            let genreName;
            genre.forEach((e)=>{
                
                if(obj[i].genre_ids[0] == e.id){
                    genreName = e.name
                    
                }
            })


            modalContainer.classList.remove("hidden")

            modalContainer.innerHTML = `<div class="modal-card">

                                            <div class="img-section">
                                                <img src=${posterUrl} alt=${title} class="modal-img">
                                            </div>

                                            <div class="description-section">

                                                <div class="description-card">
                                                    <h1 class="movie-name">${title}</h1>
                                                    <h3 class="movie-rating"><i class="fa-solid fa-star"></i> <span class="mv-rating">${vote_average}</span>/10</h3>
                                                    <p class="mv-lang">${lang}</p>
                                                    <p><span>${runtime} minutes</span><i class="fa-solid fa-circle-small"></i> <span>${genreName}</span></p>
                                                    <p>${overview}</p>
                                                    <p>&#8377; <span class="mv-price">${duration}</span></p>
                                                    <button class="book-tickets-btn">Book Tickets</button>      
                                                </div>

                                                <button class="modal-close-btn">X</button>
                                            </div>  
                                        </div>`
          
                                        
            const closeBtn = document.querySelector(".modal-close-btn")
            
            closeBtn.addEventListener("click", hideModal)

            modalContainer.addEventListener("click", hideModal)

            const bookTicketsBtn = document.querySelector(".book-tickets-btn")

            bookTicketsBtn.addEventListener("click",(e)=>{

                e.preventDefault();
                window.location.href = `payment.html` 
            })

        })
    }
}

function hideModal(){
    modalContainer.classList.add("hidden")
}


let open = document.getElementById('open');
open.addEventListener('click', ()=>{
    let genresContainer = document.getElementById('genres-section')
    genresContainer.classList.add('open'); 
})

let close = document.getElementById('close');
close.addEventListener('click',()=>{
    let hide = document.getElementById('genres-section')
    hide.classList.remove('open')
})