// 인기 영화 데이터 배열
import { fetchMovies } from "./api.js";
const popularMovieList = await fetchMovies();

// 영화 카드 템플릿 생성 함수
import { makeMovieCard } from "./movie-card.js";

// HTML 태그
const $searchBox = document.querySelector(".movie-search-input");
const $movieList = document.querySelector(".movie-list");

//
// 사용자가 입력한 값을 가져오는 함수
const bringUserInput = function (e) {
  if (e.key === "Enter") {
    const inputValue = $searchInput.value; // 사용자가 입력한 값 가져오기

    if (inputValue === "") {
      alert("검색창에 키워드를 입력해주세요"); // 예외 상황 처리
    }
    $searchInput.value = ""; // 사용자가 입력한 값 초기화하기

    filterInput(inputValue);
  }
};

$searchBox.addEventListener("keydown", bringUserInput); // 사용자가 엔터키를 입력했을 때 bringInput 함수 실행하기

//
// 사용자가 입력한 값을 필터링하는 함수
const filterInput = function (inputValue) {
  const searchedMovieList = popularMovieList.filter((movie) => {
    return movie.title.toLowerCase().includes(inputValue.toLowerCase());
  });

  if (searchedMovieList.length === 0) {
    alert("입력하신 키워드와 일치하는 영화가 없습니다"); // 예외 상황 처리
  }
  makeSearchedMovieCard(searchedMovieList);
};

//
// 검색된 영화 카드를 만들어 주는 함수
const makeSearchedMovieCard = function (searchedMovieList) {
  $movieList.innerHTML = ""; // 기존에 있는 영화 카드 삭제하기

  makeMovieCard(searchedMovieList);
};
