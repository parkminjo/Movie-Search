import { fetchMovieId } from "../api/movie-id-api.js";

/**
 * @constant $modal
 * @constant $addDeleteBookmarkButton
 */
const $modal = document.querySelector(".modal");
const $addDeleteBookmarkButton = document.querySelector(".movie-add-delete");

/**
 *
 * @param {*} event
 * @returns null
 */
const openModal = async function (e) {
  $modal.style.display = "block";
  document.body.style.overflow = "hidden";

  const movieCard = e.target.closest(".movie-card");

  /** 예외 상황 처리 */
  if (!movieCard) {
    $modal.style.display = "none";
    document.body.style.overflow = "unset";
    return;
  }

  /** @constant movieDetails 영화 상세 정보 */
  const movieDetails = await fetchMovieId(Number(movieCard.id));

  /** 북마크.js에서 사용자가 클릭한 영화의 id를 찾기 위한 방편 */
  document
    .querySelector(".modal-body")
    .setAttribute("id", `${movieDetails.id}`);

  /** @constant movieDetailsTemplate 영화 상세 정보 템플릿 */
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

  document.querySelector(".movie-info-all").innerHTML = movieDetailsTemplate;

  /**
   * @constant addButton 영화 추가 버튼
   * @constant deleteButton 영화 삭제 버튼
   */
  const addButton = `
      <input class="movie-add-button" type="button" value="북마크 추가" />
  `;
  const deleteButton = `
    <input class="movie-delete-button" type="button" value="북마크 삭제" />
  `;

  /** Local Storage 데이터 여부에 따라 달라지는 북마크 추가/삭제 버튼 */
  checkLocalStorage(movieDetails.id)
    ? ($addDeleteBookmarkButton.innerHTML = deleteButton)
    : ($addDeleteBookmarkButton.innerHTML = addButton);
};

document.querySelector(".movie-list").addEventListener("click", openModal);

/** 모달창 끄는 함수 */
const closeModal = function () {
  $modal.style.display = "none";
  document.body.style.overflow = "unset";
};

document.querySelector(".close-button").addEventListener("click", closeModal);

/**
 * @param {*} movieId
 * @returns Local Storage 데이터 여부
 */
const checkLocalStorage = function (movieId) {
  if (window.localStorage.length >= 1) {
    for (let i = 0; i < window.localStorage.length; i++) {
      if (Number(window.localStorage.key(i)) === movieId) {
        return true;
      }
    }
  } else {
    return false;
  }
};
