// 인기 영화 데이터 배열
import { fetchMovies } from "./api.js";
const popularMovieList = await fetchMovies();

// HTML 태그
const $movieList = document.querySelector(".movie-list");

//
// 영화 카드 템플릿 생성 함수
const makeMovieCard = function (movieList) {
  movieList.forEach((movie) => {
    // 영화 카드 템플릿
    const cardTemplate = `
      <div class="movie-card" id=${movie.id}>
        <div class="movie-image">
          <img src=${
            "https://image.tmdb.org/t/p/w500" + movie.poster_path
          } alt="영화이미지" />
        </div>
        <div class="movie-card-body">
          <h2 class="movie-title">${movie.title}</h2>
          <p class="movie-rating">평점: ${movie.vote_average}</p>
        </div>
      </div>  
      `;

    // div 태그-movieList에 템플릿 추가하기
    $movieList.insertAdjacentHTML("beforeend", cardTemplate);
  });
};

makeMovieCard(popularMovieList); // 영화 카드 템플릿 생성

export { makeMovieCard };
