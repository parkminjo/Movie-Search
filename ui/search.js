import { fetchAllMovies } from "../api/search-api.js";
import { makeMovieCard } from "./movie-card.js";

/**
 * @constant $searchBox 검색창 HTML 태그
 */
const $searchBox = document.querySelector(".movie-search-input");

/**
 * @constant specialSymbol 특수 문자
 */
const specialSymbol = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

/** 디바운싱 함수 */
let timerId;
const debouncing = function (func, timeOut = 300) {
  clearTimeout(timerId);
  timerId = setTimeout(func, timeOut);
};

/** 실시간 검색 기능 */
const realTimeSearch = function (e) {
  /**
   * @constant inputValue 사용자 입력 값
   */
  const inputValue = $searchBox.value
    .toLowerCase()
    .replace(specialSymbol, "")
    .replace(/\s/g, "");

  /** 디바운싱 */
  if (inputValue.length > 0) {
    document.querySelector(".banner").style.display = "none";
    document.querySelector(".movie-list-title-text").style.display = "none";
    debouncing(() => filterInput(inputValue));
  } else {
    document.querySelector(".movie-list").innerHTML = "";
  }
};

$searchBox.addEventListener("input", realTimeSearch);

/** 사용자가 입력한 값을 필터링하는 함수 */
const filterInput = async function (inputValue) {
  try {
    const lastSearchTerm = inputValue;

    const allMovieList = await fetchAllMovies(inputValue);
    console.log("Fetched movies:", allMovieList);
    if (inputValue !== lastSearchTerm) return;

    const searchedMovieList = allMovieList.filter((movie) => {
      // 영화 제목에 있는 특수문자와 공백 제거하기
      const movieTitle = movie.title
        .toLowerCase()
        .replace(specialSymbol, "")
        .replace(/\s/g, "");

      return movieTitle.includes(inputValue);
    });

    makeSearchedMovieCard(searchedMovieList);
  } catch (error) {
    console.error(error);
  }
};

/** 검색된 영화 카드를 만들어 주는 함수 */
const makeSearchedMovieCard = function (searchedMovieList) {
  document.querySelector(".movie-list").innerHTML = "";

  makeMovieCard(searchedMovieList);
};
