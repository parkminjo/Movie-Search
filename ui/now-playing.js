import { nowPlayingMovieList } from "../api/now-playing-api.js";

/** 영화 카드 템플릿 생성 함수 */
import { makeMovieCard } from "./movie-card.js";

/** 현재 상영작을 보여주는 함수 */
const showNowPlaying = function () {
  document.querySelector(".movie-list").innerHTML = "";
  document.querySelector(".banner").style.display = "none";
  document.querySelector(".movie-list-title-text").style.display = "none";

  makeMovieCard(nowPlayingMovieList);
};

document
  .querySelector(".now-playing")
  .addEventListener("click", showNowPlaying);
