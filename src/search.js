const $searchInput = document.querySelector(".movie-search-input");
const $movieList = document.querySelector(".movie-list");

// TMDB에서 인기 영화 API 가져오기
const url = "https://api.themoviedb.org/3/movie/popular?language=ko&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGI0MTIwZGU5NTUwOWEzYTJhMTY4MmQzYzdhYmUxMyIsIm5iZiI6MTczNjI5NTgzOS4wNSwic3ViIjoiNjc3ZGM1OWY4OWZjNWQ5NDQyNGU1NmUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KNDcuNLSXmO_bZERMNVDo-_I5r9KBaKkc-1kZCvdFU8",
  },
};

// 인기 영화 데이터가 담긴 배열 만들기
let movieList = [];

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    movieList = data.results;
  })
  .catch((err) => console.error(err));

// 사용자가 엔터키를 눌렀을 때 입력한 값 가져오는 함수
const bringUserInput = function (event) {
  if (event.key === "Enter") {
    const userInput = $searchInput.value;
    $searchInput.value = ""; // 사용자가 입력한 값 초기화하기

    // 사용자가 입력한 값과 영화 제목이 담긴 배열 비교하기
    let searchedMovieList = movieList.filter((movie) => {
      let result =
        movie.title.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
      console.log(result);

      return result;
    });

    if (searchedMovieList.length === 0) {
      alert("일치하는 키워드가 없습니다");
    }

    // 영화 제목이 일치한 영화 카드 템플릿 만들기
    searchedMovieList.forEach((movieData) => {
      let movieTitle = movieData.title;
      let movieRating = movieData.vote_average;
      let movieImage =
        "https://image.tmdb.org/t/p/w500" + movieData.poster_path;
      let movieId = movieData.id;

      // 영화 카드 템플릿
      let cardTemplate = `
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
      // div 태그-movieList에 템플릿 삭제하고 추가하기
      $movieList.innerHTML = "";
      $movieList.innerHTML += cardTemplate;
    });
  }
};

$searchInput.addEventListener("keydown", bringUserInput);
