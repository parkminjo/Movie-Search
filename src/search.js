// 인기 영화 배열 데이터
import { fetchMovies } from "./api.js";
const movieList = await fetchMovies();

// HTML 태그
const $searchInput = document.querySelector(".movie-search-input");
const $movieList = document.querySelector(".movie-list");
const $addBookMark = document.querySelector(".movie-add-button");

//
// 사용자가 입력한 값을 가져오는 함수
const bringInput = function (event) {
  if (event.key === "Enter") {
    const userInput = $searchInput.value; // 사용자가 입력한 값
    $searchInput.value = ""; // 사용자가 입력한 값 초기화하기
    filterInput(userInput);
  }
};

//
// 사용자가 입력한 값을 필터링하는 함수
const filterInput = function (userInput) {
  const searchedMovieList = movieList.filter((movie) => {
    return movie.title.toLowerCase().includes(userInput.toLowerCase());
  });

  if (searchedMovieList.length === 0) {
    alert("입력하신 키워드와 일치하는 영화가 없습니다");
  }
  makeSearchedMovie(searchedMovieList);
};

//
// 검색된 영화 카드를 만들어 주는 함수
const makeSearchedMovie = function (searchedMovieList) {
  // 기존에 있는 영화 카드 삭제하기
  $movieList.innerHTML = "";

  // 영화 제목이 일치한 영화 카드 템플릿 만들기
  searchedMovieList.forEach((movieData) => {
    const movieTitle = movieData.title;
    const movieRating = movieData.vote_average;
    const movieImage =
      "https://image.tmdb.org/t/p/w500" + movieData.poster_path;
    const movieId = movieData.id;

    // 영화 카드 템플릿
    const cardTemplate = `
      <div class="movie-card" id=${movieId}>
        <div class="movie-image">
          <img src=${movieImage} alt="영화이미지" />
        </div>
        <div class="movie-card-body">
          <h2 class="movie-title">${movieTitle}</h2>
          <p class="movie-rating">평점: ${movieRating}</p>
        </div>
      </div>
      
    `;
    // div 태그-movieList에 추가하기
    $movieList.innerHTML += cardTemplate;
  });
};

$searchInput.addEventListener("keydown", bringInput); // 사용자가 엔터키를 입력했을 때 bringInput 함수 실행하기
