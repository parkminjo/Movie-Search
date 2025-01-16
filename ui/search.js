// 영화 데이터 배열
import { allMovieList } from "../api/combine-api.js";

// // 검색할 수 있는 모든 영화 배열
// import { fetchSearchMovies } from "./api.js";
// const allMovieList = await fetchSearchMovies();

// 영화 카드 템플릿 생성 함수
import { makeMovieCard } from "./movie-card.js";

// HTML 태그
const $searchBox = document.querySelector(".movie-search-input");
const $banner = document.querySelector(".banner");
const $movieList = document.querySelector(".movie-list");
const $movieListTitle = document.querySelector(".movie-list-title-text");

// 전역 변수 - 특수 문자
const specialSymbol = /[\{\}\[\]\/?.,;:|\)*~`ㅇㄴ!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

//
// 디바운싱 함수
let timerId;
const debouncing = function (func, timeOut = 300) {
  clearTimeout(timerId);
  timerId = setTimeout(func, timeOut);
};

//
// 실시간 검색 기능
const realTimeSearch = function (e) {
  $banner.style.display = "none";
  $movieListTitle.style.display = "none";

  // 사용자가 입력한 값
  const inputValue = $searchBox.value
    .trim()
    .toLowerCase()
    .replace(specialSymbol, "")
    .replace(/\s/g, "");

  // 디바운싱
  if (inputValue.length > 0) {
    debouncing(filterInput(inputValue));
  }
};

$searchBox.addEventListener("input", realTimeSearch);

//
// 사용자가 입력한 값을 필터링하는 함수
const filterInput = function (inputValue) {
  const searchedMovieList = allMovieList.filter((movie) => {
    // 영화 제목에 있는 특수문자와 공백 제거하기
    const movieTitle = movie.title
      .trim()
      .toLowerCase()
      .replace(specialSymbol, "")
      .replace(/\s/g, "");

    return includeByCho(inputValue, movieTitle);
  });

  makeSearchedMovieCard(searchedMovieList);
};

//
// 검색된 영화 카드를 만들어 주는 함수
const makeSearchedMovieCard = function (searchedMovieList) {
  $movieList.innerHTML = ""; // 기존에 있는 영화 카드 삭제하기

  makeMovieCard(searchedMovieList);
};

//
// 초성 검색을 위한 함수
const CHO_HANGUL = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const HANGUL_START_CHARCODE = "가".charCodeAt();

const CHO_PERIOD = Math.floor("까".charCodeAt() - "가".charCodeAt());
const JUNG_PERIOD = Math.floor("개".charCodeAt() - "가".charCodeAt());

function combine(cho, jung, jong) {
  return String.fromCharCode(
    HANGUL_START_CHARCODE + cho * CHO_PERIOD + jung * JUNG_PERIOD + jong
  );
}

function makeRegexByCho(search = "") {
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) =>
      acc.replace(
        new RegExp(cho, "g"),
        `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`
      ),
    search
  );

  return new RegExp(`(${regex})`, "g");
}

function includeByCho(search, targetWord) {
  return makeRegexByCho(search).test(targetWord);
}
