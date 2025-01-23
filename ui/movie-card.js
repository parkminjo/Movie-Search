import { nowPlayingMovieList } from "../api/now-playing-api.js";

/** 영화 카드 템플릿 생성 함수 */
const makeMovieCard = function (movieList) {
  movieList.forEach((movie) => {
    const { id, title, poster_path, vote_average } = movie;

    /**
     * @constant cardTemplate 영화 카드 템플릿
     */
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

    document
      .querySelector(".movie-list")
      .insertAdjacentHTML("beforeend", cardTemplate);
  });
};

/** 영화 카드 템플릿 생성 */
makeMovieCard(nowPlayingMovieList);

export { makeMovieCard };
