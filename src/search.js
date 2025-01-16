// 인기 영화 데이터 배열
import { fetchMovies } from "./api.js";
const popularMovieList = await fetchMovies();

// 영화 카드 템플릿 생성 함수
import { makeMovieCard } from "./movie-card.js";

// HTML 태그
const $searchBox = document.querySelector(".movie-search-input");

// 전역 변수 - 특수 문자
const specialSymbol = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

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
  const $banner = document.querySelector(".banner");
  $banner.innerHTML = "";

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
// 엔터키 검색 기능
const enterKeySearch = function (e) {
  // 사용자가 입력한 값
  const inputValue = $searchBox.value
    .trim()
    .toLowerCase()
    .replace(specialSymbol, "")
    .replace(/\s/g, "");

  if (e.key === "Enter") {
    if (inputValue === "") alert("검색창에 키워드를 입력해주세요"); // 예외 상황 처리

    filterInput(inputValue);
    $searchBox.value = ""; // 사용자가 입력한 값 초기화
  }
};

$searchBox.addEventListener("keydown", enterKeySearch);

//
// 사용자가 입력한 값을 필터링하는 함수
const filterInput = function (inputValue) {
  const searchedMovieList = popularMovieList.filter((movie) => {
    // 영화 제목에 있는 특수문자와 공백 제거하기
    const movieTitle = movie.title
      .trim()
      .toLowerCase()
      .replace(specialSymbol, "")
      .replace(/\s/g, "");

    return movieTitle.includes(inputValue);
  });

  makeSearchedMovieCard(searchedMovieList);
};

//
// 검색된 영화 카드를 만들어 주는 함수
const makeSearchedMovieCard = function (searchedMovieList) {
  const $movieList = document.querySelector(".movie-list");
  $movieList.innerHTML = ""; // 기존에 있는 영화 카드 삭제하기

  makeMovieCard(searchedMovieList);
};
