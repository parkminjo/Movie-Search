// 인기 상영작 데이터 배열
import { popularMovieList } from "../api/popular-api.js";

// 영화 카드 템플릿 생성 함수
import { makeMovieCard } from "./movie-card.js";

// HTML 태그
const $movieList = document.querySelector(".movie-list");
const $popularButton = document.querySelector(".popular");
const $banner = document.querySelector(".banner");

//
// 인기 상영작을 보여주는 함수
const showNowPlaying = function () {
  $movieList.innerHTML = "";
  $banner.innerHTML = "";
  makeMovieCard(popularMovieList);
};

$popularButton.addEventListener("click", showNowPlaying);
