import { fetchMovies } from "./all.js";
const movieList = await fetchMovies();

const $movieList = document.querySelector(".movie-list");
const $movieCard = document.querySelector(".movie-card");

// 카드 상세 페이지 보여주기
const showDetailInfo = function (event) {
  console.log("사용자가 클릭함");
};

$movieCard.addEventListener("click", showDetailInfo);
