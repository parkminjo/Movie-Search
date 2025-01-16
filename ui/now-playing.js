// 현재 상영작 데이터 배열
import { nowPlayingMovieList } from "../api/now-playing-api.js";

// 영화 카드 템플릿 생성 함수
import { makeMovieCard } from "./movie-card.js";

// HTML 태그
const $movieList = document.querySelector(".movie-list");
const $nowPlayingButton = document.querySelector(".now-playing");
const $banner = document.querySelector(".banner");

//
// 현재 상영작을 보여주는 함수
const showNowPlaying = function () {
  $movieList.innerHTML = "";
  $banner.innerHTML = "";
  makeMovieCard(nowPlayingMovieList);
};

$nowPlayingButton.addEventListener("click", showNowPlaying);
