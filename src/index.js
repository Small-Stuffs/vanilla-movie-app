"use strict";

const API_KEY = "c1018a330183f93ffcc6df16fbfe581f";
const imgUrl = "https://image.tmdb.org/t/p/w500";

/*
Listeners
*/
const body = document.querySelector("body");
const linkList = [...document.querySelectorAll(".movies__card")];
const backBtn = document.querySelector(".back__button");

// linkList.map((list) => {
//   list.addEventListener("click", (e) => {
//     e.preventDefault();
//     body.classList.toggle("is-active");
//     console.log(e);
//     // body.style = "display:none;";
//   });
// });

backBtn.addEventListener("click", function () {
  // body.style = "display:none;";
  body.classList.remove("is-active");
});

/**
 *
 * REQUEST MOVIE
 */

const searchForm = document.querySelector(".search__form");
const movies = document.querySelector(".movies");
const searchInput = document.querySelector(".search__input");
const loader = document.querySelector(".loader");
// const moviesC = document.querySelector('')
let resultsContent = "";
let detailsContent = "";
/**
 * DETAILS PAGE
 */

const info = document.querySelector(".info");

movies.addEventListener("click", (e) => {
  if (e.target.classList.contains("movies__card")) {
    //  open details page
    e.preventDefault();
    body.classList.toggle("is-active");

    const movieId = e.target.getAttribute("data-id");
    const detailsQuery = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    console.log(detailsQuery);
    axios
      .get(detailsQuery)
      .then((response) => {
        const details = response.data;
        detailsContent += `
        <div class="info__img">
          <img
            src="${imgUrl}/${details.poster_path}"
            alt="movie-image"
            class="movies__img-src"
          />
        </div>
        <div class="info__name">
          <h1 class="info__title">${details.title}</h1>
          <div class="duration">
            <i class="fas fa-clock"></i><span class="duration">96 min</span>
          </div>
        </div>

        <!-- about -->
        <div class="about">
          <h2>About</h2>
          <p>${details.tagline}
          </p>
          
          <div class="genre-wrapper">
            <div class="genre__role">
              Genre: <a href="" class="genre__role--title">Action</a>
            </div>
            <div class="genre__role">
              Cast: <a href="" class="genre__role--title">Asahina Aya</a>
              <a href="" class="genre__role--title">Tao Tsuchiya</a>
            </div>
          </div>
          <p>${details.overview}</p>
        </div>`;
        info.innerHTML = detailsContent;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // if (e.target.children) {
  //   console.log(e);
  // }
  // console.log(e);
  // console.log(e);
  // if (e.target.children) {
  //   const tryLang = e.target.children;

  //   e.preventDefault();
  //   body.classList.toggle("is-active");
  //   console.log("cloked", movieId);
  //   console.log(detailsQuery);
  // }
  // console.log("cloked", tryLang);
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = searchInput.value;
  const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`;
  console.log("sumbitted", searchQuery);
  axios
    .get(searchQuery)
    .then((response) => {
      const results = response.data.results;
      /**
       * MOVIES CARD
       */
      results.map((result) => {
        // const year = result.release_date.split("-")[1];

        resultsContent += `      <a href="#" class="movies__card" data-id = "${result.id}">
        <div class="movie__img">
          <img
            src="${imgUrl}/${result.poster_path}"
            alt="movie-image"
            class="movies__img-src"
          />
        </div>
        <div class="movies__content">
          <h2 class="movies__title">${result.title}</h2>
        </div>
        <div class="movies__details">
          <div class="movies__year">${result.release_date}</div>
          <div class="movies__rating">
            <span>${result.vote_average}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                d="m12 .587 3.668 7.568L24 9.306l-6.064 5.828 1.48 8.279L12 19.446l-7.417 3.967 1.481-8.279L0 9.306l8.332-1.151z"
              />
            </svg>
          </div>
        </div>
      </a>`;
      });
      movies.innerHTML = resultsContent;

      movies.style.display = "flex";
      console.log("data", response);
    })
    .catch((error) => {
      console.log(error);
    });
});
