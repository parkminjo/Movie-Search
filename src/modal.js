// 인기 영화 배열 데이터
import { fetchMovies } from "./api.js";
const movieList = await fetchMovies();

// HTML 태그
const $modal = document.querySelector(".modal");
const $movieList = document.querySelector(".movie-list");
const $closeButton = document.querySelector(".close-button");
const $detailMovieInfo = document.querySelector(".movie-info-all");
const $addBookMark = document.querySelector(".movie-add-button");

//
// 모달창 페이지 켜기
const showModal = function (event) {
  $modal.style.display = "block"; // 모달창 보이게 하기
  document.body.style.overflow = "hidden"; // 외부 화면 스크롤 off
  const movieCard = event.target.closest(".movie-card");

  // 사용자가 클릭한 영화 정보 가져오기
  const clickedMovie = movieList.find((movie) => {
    return movie.id === Number(movieCard.id);
  });

  const movieImage =
    "https://image.tmdb.org/t/p/w500" + clickedMovie.poster_path;
  const movieTitle = clickedMovie.title;
  const movieOverview = clickedMovie.overview;
  const movieDate = clickedMovie.release_date;
  const movieRating = clickedMovie.vote_average;

  const detailTemplate = `
    <div class="movie-image">
        <img
          src="${movieImage}"
          alt="영화 이미지"
        />
    </div>

    <div class="movie-info">
        <h3 class="movie-title">${movieTitle}</h3>
        <p class="movie-content">
        ${movieOverview}
        </p>
        <p class="movie-date">개봉일: ${movieDate}</p>
        <p class="movie-rating">평점: ${movieRating}</p>
    </div>
    <div class="movie-add-button">
        <input type="button" value="북마크 추가" />
    </div>
  `;
  $detailMovieInfo.innerHTML = detailTemplate;

  if (!movieCard) return;
};

// 모달창 페이지 끄기
const closeModal = function (event) {
  $modal.style.display = "none";
  document.body.style.overflow = "unset"; // 외부 화면 스크롤 on
};

//
// 모달창 켜기
$movieList.addEventListener("click", showModal);
// 모달창 끄기
$closeButton.addEventListener("click", closeModal);

// 카드 상세 페이지 구현하기
