// TMDB에서 현재 상영작 API 가져오기
const url = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGI0MTIwZGU5NTUwOWEzYTJhMTY4MmQzYzdhYmUxMyIsIm5iZiI6MTczNjI5NTgzOS4wNSwic3ViIjoiNjc3ZGM1OWY4OWZjNWQ5NDQyNGU1NmUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KNDcuNLSXmO_bZERMNVDo-_I5r9KBaKkc-1kZCvdFU8",
  },
};

// 현재 상영작 데이터가 담긴 배열 만들기
const fetchNowPlayingMovies = async function () {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status} 에러가 발생했습니다`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const nowPlayingMovieList = await fetchNowPlayingMovies();
export { nowPlayingMovieList };
