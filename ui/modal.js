// 인기/현재 상영작 데이터 배열
import { allMovieList } from "../api/combine-api.js";

// HTML 태그
const $modal = document.querySelector(".modal");
const $movieList = document.querySelector(".movie-list");
const $closeButton = document.querySelector(".close-button");
const $movieDetails = document.querySelector(".movie-info-all");
const $modalBody = document.querySelector(".modal-body");

const $addDeleteBookmarkButton = document.querySelector(".movie-add-delete");

//
// 모달창 켜기

const openModal = async function (e) {
  $modal.style.display = "block"; // 모달창 보여주기
  document.body.style.overflow = "hidden"; // 모달창 외부 화면 고정시키기

  const movieCard = e.target.closest(".movie-card");
  // 예외 상황 처리
  if (!movieCard) {
    $modal.style.display = "none";
    document.body.style.overflow = "unset";
  }

  // 영화 상세 정보 가져오기
  const movieDetails = allMovieList.find((movie) => {
    return movie.id === Number(movieCard.id);
  });

  $modalBody.setAttribute("id", `${movieDetails.id}`); // 북마크.js에서 사용자가 클릭한 영화의 id를 찾기 위한 방편

  // 모달창 내부 템플릿
  const movieDetailsTemplate = `
    <div class="detail-movie-image">
        <img
          src="${"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path}"
          alt="영화 이미지"
        />
    </div>
  
    <div class="detail-movie-info">
        <h3 class="detail-movie-title">${movieDetails.title}</h3>
        <p class="detail-movie-content">
        ${movieDetails.overview}
        </p>
        <p class="detail-movie-date">개봉일: ${movieDetails.release_date}</p>
        <p class="detail-movie-rating">평점: ${movieDetails.vote_average}</p>
    </div>
    `;

  $movieDetails.innerHTML = movieDetailsTemplate;

  // 북마크 추가/삭제 버튼 템플릿
  const addButton = `
      <input class="movie-add-button" type="button" value="북마크 추가" />
  `;
  const deleteButton = `
    <input class="movie-delete-button" type="button" value="북마크 삭제" />
  `;

  // Local Storage 데이터 여부에 따라 달라지는 북마크 추가/삭제 버튼
  checkLocalStorage(movieDetails.id)
    ? ($addDeleteBookmarkButton.innerHTML = deleteButton)
    : ($addDeleteBookmarkButton.innerHTML = addButton);
};

$movieList.addEventListener("click", openModal);

//
// 모달창 끄기
const closeModal = function () {
  $modal.style.display = "none"; /// 모달창 감추기
  document.body.style.overflow = "unset"; // 외부 화면 움직이게 하기
};

$closeButton.addEventListener("click", closeModal);

//
// Local Storage에 데이터가 있는지 확인하는 함수
const checkLocalStorage = function (movieId) {
  if (window.localStorage.length >= 1) {
    for (let i = 0; i < window.localStorage.length; i++) {
      if (Number(window.localStorage.key(i)) === movieId) {
        return true;
      }
    }
  } else {
    false;
  }
};
