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

const $movieList = document.querySelector(".movie-list");

// 인기 영화 데이터 가져오기
fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    const movieList = data.results; // 인기 영화 20개 정보가 담긴 배열

    // 영화 카드 만드는 템플릿 생성하기
    movieList.forEach((movie) => {
      let movieTitle = movie.title;
      let movieRating = movie.vote_average;
      let movieImage = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      let movieId = movie.id;

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
      // div 태그-movieList에 템플릿 추가하기
      $movieList.innerHTML += cardTemplate;
    });
  })
  .catch((err) => console.error(err));
