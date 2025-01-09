const $searchInput = document.querySelector(".movie-search-input");

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

// 인기 영화 제목이 담긴 배열 만들기
fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    const movieList = data.results;
    const movieTitleArr = movieList.map((movie) => movie.title);

    // 사용자가 엔터키를 눌렀을 때 입력한 값 가져오기
    $searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const userInput = $searchInput.value;
        $searchInput.value = ""; // 사용자가 입력한 값 초기화하기

        if (!userInput) {
          alert("검색어를 입력해주세요");
        }

        let searchedMovie = movieTitleArr.filter(function (movieTitle) {
          let result =
            movieTitle.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
          return result;
        });
      }
    });
  })
  .catch((err) => console.error(err));
