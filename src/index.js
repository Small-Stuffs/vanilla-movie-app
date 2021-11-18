"use strict";

const API_KEY = "c1018a330183f93ffcc6df16fbfe581f";

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

let resultsContent = "";

movies.addEventListener("click", (e) => {
  // if (e.target.classList.contains("movies__card-src")) {
  e.preventDefault();
  body.classList.toggle("is-active");
  console.log("cloked", e);
  // }
  // console.log("cloked", e);
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = searchInput.value;
  const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`;
  // console.log("sumbitted", searchQuery);
  axios
    .get(searchQuery)
    .then((response) => {
      const results = response.data.results;
      /**
       * MOVIES CARD
       */
      results.map((result) => {
        // const year = result.release_date.split("-")[1];

        resultsContent += `      <a href="#" class="movies__card">
        <div class="movie__img">
          <img
            src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
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
      console.log("data", response);
    })
    .catch((error) => {
      console.log(error);
    });
});
