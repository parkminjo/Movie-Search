import { fetchMovieId } from "../api/movie-id-api.js";
/**
 * @constant $movieList 영화 카드가 담기 HTML 태그
 */
const $movieList = document.querySelector(".movie-list");

/** 사용자가 북마크한 영화를 보여주는 함수 */
const showBookMark = function () {
  $movieList.innerHTML = "";
  document.querySelector(".banner").style.display = "none";
  document.querySelector(".movie-list-title-text").style.display = "none";

  /** local storage에 있는 영화 id, 상세 정보 가져와서 새로운 배열에 저장하기 */
  let markedMovies = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    const strValue = window.localStorage.getItem(key);
    const value = JSON.parse(strValue);

    markedMovies.push({ id: key, ...value });
  }

  markedMovies.forEach((movie) => {
    const { id, title, image, rating } = movie;

    /**
     * @constant cardTemplate 영화 카드 템플릿
     */
    const cardTemplate = `
    <div class="movie-card" id=${id}>
      <div class="movie-image">
        <img src=${image} alt="영화이미지" />
      </div>
      <div class="movie-card-body">
        <h2 class="movie-title">${title}</h2>
        <p class="movie-rating">평점: ${rating}</p>
      </div>
    </div>
    `;

    $movieList.insertAdjacentHTML("beforeend", cardTemplate);
  });
};

document
  .querySelector(".book-mark-button")
  .addEventListener("click", showBookMark);

/** 북마크 추가/삭제 버튼 변환 */
document.querySelector(".movie-add-delete").addEventListener("click", (e) => {
  const whatButton = e.target.classList.value;

  whatButton === "movie-delete-button" ? deleteBookMark(e) : addBookMark(e);
});

/** 북마크 추가 함수 */
const addBookMark = async function (e) {
  const clickedMovie = e.target.closest(".modal-body");

  /**
   * @constant movieDetails 영화 상세 정보
   */
  const movieDetails = await fetchMovieId(Number(clickedMovie.id));

  /**
   * @constant MovieDataObj 영화 상세 정보 객체 형태
   */
  const MovieDataObj = {
    title: movieDetails.title,
    image: "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path,
    overview: movieDetails.overview,
    date: movieDetails.release_date,
    rating: movieDetails.vote_average,
  };

  /** local storage에 key: 영화 id, value: 상세 정보 저장 */
  window.localStorage.setItem(
    `${movieDetails.id}`,
    JSON.stringify(MovieDataObj)
  );
  alert("북마크에 추가했습니다");
};

/** 북마크 삭제 함수 */
const deleteBookMark = async function (e) {
  const clickedMovie = e.target.closest(".modal-body");

  window.localStorage.removeItem(clickedMovie.id);
  alert("북마크에서 삭제했습니다");
};
