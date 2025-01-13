// 인기 영화 배열 데이터
import { fetchMovies } from "./api.js";
const movieList = await fetchMovies();

// HTML 태그
const $movieList = document.querySelector(".movie-list");

//
// 영화 카드 만드는 템플릿 생성하기
movieList.forEach((movieData) => {
  const movieTitle = movieData.title;
  const movieRating = movieData.vote_average;
  const movieImage = "https://image.tmdb.org/t/p/w500" + movieData.poster_path;
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
  // div 태그-movieList에 템플릿 추가하기
  $movieList.innerHTML += cardTemplate;
});
