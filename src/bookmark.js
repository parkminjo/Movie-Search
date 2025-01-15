// 인기 영화 데이터 배열
import { fetchMovies } from "./api.js";
const popularMovieList = await fetchMovies();

// HTML 태그
const $movieList = document.querySelector(".movie-list");
const $bookMarkButton = document.querySelector(".book-mark-button");
const $addDeleteBookmarkButton = document.querySelector(".movie-add-delete");

//
// 사용자가 북마크한 영화를 보여주는 함수
const showBookMark = function () {
  $movieList.innerHTML = "";

  const strMovieArr = window.localStorage.getItem("movie");
  const markedMovie = JSON.parse(strMovieArr);

  markedMovie.forEach((movie) => {
    // 영화 카드 템플릿 + 삼항 연산자
    const cardTemplate = `
    <div class="movie-card" id=${movie.id}>
      <div class="movie-image">
        <img src=${movie.image} alt="영화이미지" />
      </div>
      <div class="movie-card-body">
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-rating">평점: ${movie.rating}</p>
      </div>
    </div>
    `;

    // div 태그-movieList에 템플릿 추가하기
    $movieList.innerHTML += cardTemplate;
  });
};

$bookMarkButton.addEventListener("click", showBookMark);

//
// 북마크 추가/삭제 버튼 변환
$addDeleteBookmarkButton.addEventListener("click", (e) => {
  const whatButton = e.target.classList.value;

  whatButton === "movie-delete-button" ? deleteBookMark(e) : addBookMark(e);
});

//
// 북마크 추가 함수
const movieArr = [];

const addBookMark = async function (e) {
  const clickedMovie = e.target.closest(".modal-body");

  // 영화 상세 정보 가져오기
  const movieDetails = popularMovieList.find((movie) => {
    return movie.id === Number(clickedMovie.id);
  });

  const movieTitle = movieDetails.title;
  const movieId = movieDetails.id;
  const movieImage =
    "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;
  const movieOverview = movieDetails.overview;
  const movieDate = movieDetails.release_date;
  const movieRating = movieDetails.vote_average;

  const dataObj = {
    title: movieTitle,
    id: movieId,
    image: movieImage,
    overview: movieOverview,
    date: movieDate,
    rating: movieRating,
  };
  movieArr.push(dataObj);
  const strMovieArr = JSON.stringify(movieArr);

  window.localStorage.setItem("movie", strMovieArr); // movie id를 key로, 나머지 내용을 value로 {id : {영화 정보}}
  alert("북마크에 추가했습니다");
};

//
// 북마크 삭제 함수
const deleteBookMark = async function (e) {
  const clickedMovie = e.target.closest(".modal-body");

  let strMovieArr = window.localStorage.getItem("movie");
  const markedMovie = JSON.parse(strMovieArr);

  const newMarkedMovie = markedMovie.filter((movie) => {
    return movie.id !== Number(clickedMovie.id);
  });

  strMovieArr = JSON.stringify(newMarkedMovie);
  window.localStorage.setItem("movie", strMovieArr);
  alert("북마크에서 삭제했습니다");
};
