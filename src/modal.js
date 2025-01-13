// 인기 영화 배열 데이터
import { fetchMovies } from "./api.js";
const movieList = await fetchMovies();

// HTML 태그
const $modal = document.querySelector(".modal");
const $movieList = document.querySelector(".movie-list");
const $closeButton = document.querySelector(".close-button");
const $detailMovieInfo = document.querySelector(".movie-info-all");

const $addBookMark = document.querySelector(".movie-add");
const $bookMark = document.querySelector(".book-mark-button");

//
// 모달창 페이지 켜기
let movieCard;
const openModal = async function (event) {
  $modal.style.display = "block"; // 모달창 보이게 하기
  document.body.style.overflow = "hidden"; // 외부 화면 고정시키기
  movieCard = event.target.closest(".movie-card");
  if (!movieCard) return;

  const detailMovieInfo = await findDetailInfo(movieCard);

  // 모달창에 영화 상세 정보 채우기
  const movieImage =
    "https://image.tmdb.org/t/p/w500" + detailMovieInfo.poster_path;
  const movieTitle = detailMovieInfo.title;
  const movieOverview = detailMovieInfo.overview;
  const movieDate = detailMovieInfo.release_date;
  const movieRating = detailMovieInfo.vote_average;

  const detailTemplate = `
    <div class="detail-movie-image">
        <img
          src="${movieImage}"
          alt="영화 이미지"
        />
    </div>
  
    <div class="detail-movie-info">
        <h3 class="detail-movie-title">${movieTitle}</h3>
        <p class="detail-movie-content">
        ${movieOverview}
        </p>
        <p class="detail-movie-date">개봉일: ${movieDate}</p>
        <p class="detail-movie-rating">평점: ${movieRating}</p>
    </div>
    `;

  const addButton = `
      <input class="movie-add-button" type="button" value="북마크 추가" />
    `;

  $detailMovieInfo.innerHTML = detailTemplate;
  $addBookMark.innerHTML = addButton;
};

//
// 모달창 페이지 끄기
const closeModal = function (event) {
  $modal.style.display = "none"; /// 모달창 감추기
  document.body.style.overflow = "unset"; // 외부 화면 움직이게 하기
};

//
// 모달창 켜기
$movieList.addEventListener("click", openModal);
// 모달창 끄기
$closeButton.addEventListener("click", closeModal);

//
// 사용자가 클릭한 영화 상세 정보 가져오기
const findDetailInfo = async function (movieCard) {
  const clickedMovie = movieList.find((movie) => {
    return movie.id === Number(movieCard.id);
  });
  return clickedMovie;
};

//
// 북마크 추가 함수
const movieArr = [];
const addBookMark = async function (event) {
  const movieInfo = await findDetailInfo(movieCard);

  const movieTitle = movieInfo.title;
  const movieId = movieInfo.id;
  const movieImage = "https://image.tmdb.org/t/p/w500" + movieInfo.poster_path;
  const movieOverview = movieInfo.overview;
  const movieDate = movieInfo.release_date;
  const movieRating = movieInfo.vote_average;

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

  window.localStorage.setItem("movie", strMovieArr);
  alert("북마크에 추가했습니다");
};

$addBookMark.addEventListener("click", addBookMark);

//
// 북마크 페이지 보여주는 함수
const showBookMark = function (event) {
  $movieList.innerHTML = "";
  const strMovieArr = window.localStorage.getItem("movie");
  console.log(strMovieArr);
  const markedMovie = JSON.parse(strMovieArr);
  markedMovie.forEach((movie) => {
    const movieTitle = movie.title;
    const movieId = movie.id;
    const movieImage = movie.image;
    const movieRating = movie.rating;

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
};

$bookMark.addEventListener("click", showBookMark);
