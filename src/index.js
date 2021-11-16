"use strict";

const API_KEY = "c1018a330183f93ffcc6df16fbfe581f";

/*
Listeners
*/
const body = document.querySelector("body");
const linkList = [...document.querySelectorAll(".movies__card")];
const backBtn = document.querySelector(".back__button");
linkList.map((list) => {
  list.addEventListener("click", (e) => {
    e.preventDefault();
    body.classList.toggle("is-active");
    // body.style = "display:none;";
  });
});

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

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = searchInput.value;
  const searchQuery = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1&include_adult=false`;
  // console.log("sumbitted", searchQuery);
  axios
    .get(searchQuery)
    .then((response) => {
      console.log("data", response);
    })
    .catch((error) => {
      console.log(error);
    });
});
