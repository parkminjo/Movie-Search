// 현재 상영작 데이터 배열
import { nowPlayingMovieList } from "../api/now-playing-api.js";

//
// 영화 카드 템플릿 생성 함수
const makeMovieCard = function (movieList) {
  movieList.forEach((movie) => {
    const { id, title, poster_path, vote_average } = movie;

    // 영화 카드 템플릿
    const cardTemplate = `
      <div class="movie-card" id=${id}>
        <div class="movie-image">
          <img src=${
            "https://image.tmdb.org/t/p/w500" + poster_path
          } alt="영화이미지" />
        </div>
        <div class="movie-card-body">
          <h2 class="movie-title">${title}</h2>
          <p class="movie-rating">평점: ${vote_average}</p>
        </div>
      </div>  
    `;

    // div 태그-movieList에 템플릿 추가하기
    document
      .querySelector(".movie-list")
      .insertAdjacentHTML("beforeend", cardTemplate);
  });
};

makeMovieCard(nowPlayingMovieList); // 영화 카드 템플릿 생성

export { makeMovieCard };
