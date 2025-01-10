const $searchInput = document.querySelector(".movie-search-input");
const $movieList = document.querySelector(".movie-list");

import { fetchMovies } from "./all.js";
const movieList = await fetchMovies();

// 사용자가 엔터키를 눌렀을 때 입력한 값 가져오는 함수
const bringUserInput = function (event) {
  if (event.key === "Enter") {
    const userInput = $searchInput.value; // 사용자가 입력한 값
    $searchInput.value = ""; // 사용자가 입력한 값 초기화하기

    // 사용자가 입력한 값과 영화 제목이 담긴 배열 비교하기
    let searchedMovieList = movieList.filter((movie) => {
      let result =
        movie.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
      console.log(result);

      return result;
    });

    if (searchedMovieList.length === 0) {
      alert("입력하신 키워드와 일치하는 영화가 없습니다");
    }

    // 기존에 있는 영화 카드 삭제하기
    $movieList.innerHTML = "";

    // 영화 제목이 일치한 영화 카드 템플릿 만들기
    searchedMovieList.forEach((movieData) => {
      let movieTitle = movieData.title;
      let movieRating = movieData.vote_average;
      let movieImage =
        "https://image.tmdb.org/t/p/w500" + movieData.poster_path;
      let movieId = movieData.id;

      // 영화 카드 템플릿
      let cardTemplate = `
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
  }
};

$searchInput.addEventListener("keydown", bringUserInput);
