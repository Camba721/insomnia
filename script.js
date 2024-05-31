let btn = document.querySelector("body");
// let api_key = "04a03760452fdabea07d13c24071c6e3";

let toggleMenu = document.querySelector(".toggle");
toggleMenu.addEventListener("click", () => {
  console.log("clicked");
  let ul = document.querySelector(".bottomHeader");
  ul.classList.toggle("show");
  toggleMenu.classList.toggle("fa-xmark");
  ul.classList.add("bg");
});
let tv = document.getElementById("tv");
var container = document.getElementsByClassName("container");
let url;
let i = 1;
let api_key = "04a03760452fdabea07d13c24071c6e3";
url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-US&page=${i}`;


  fetchData();
  let more = document.querySelector("#showMore");
  more.addEventListener("click", showMore);

  function showMore() {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-US&page=${i}`;
    i++;
    fetchData();
    console.log(i)
  }

function fetchData() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        i++;
        const message = `Error al recuperar los datos: ${response.status}`;
        throw new Error(message);
        console.log(Error(message));
      }
      return response.json();
    })
    .then((movies) => {
      let container = document.querySelector(".container");
      // console.log(movies.results[i].postser_path)
      console.log(movies);
      let myLen = movies.results.length;
      showMovies();

      function showMovies() {
        for (var j = 0; j < myLen; j++) {
          let movie = movies.results[j];
          container.innerHTML += `<div class="box">
      <img src="http://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="img" />
  <div class="moviesDetails">
    <div class="leftDetails">
      <h5>${movie.original_title}</h5>
      <p>${movie.release_date}</p>
    </div>
    <div class="rightDetails rating">${movie.vote_average}</div>
  </div>
</div>`;
        }
      }
    })
    .catch((error) => {
      error.message; // 'Error Encontrado: 404'
      console.log(error);
    });
}

const nombre = document.getElementById("name")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(pass.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
    }
})