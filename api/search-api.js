const API_KEY = "90b4120de95509a3a2a1682d3c7abe13";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGI0MTIwZGU5NTUwOWEzYTJhMTY4MmQzYzdhYmUxMyIsIm5iZiI6MTczNjI5NTgzOS4wNSwic3ViIjoiNjc3ZGM1OWY4OWZjNWQ5NDQyNGU1NmUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KNDcuNLSXmO_bZERMNVDo-_I5r9KBaKkc-1kZCvdFU8",
  },
};

const fetchAllMovies = async function (query) {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?&query=${query}&include_adult=false&language=ko-KR&page=1&api_key=${API_KEY}`;

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status} 에러가 발생했습니다`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    alert(error.message);
  }
};

export { fetchAllMovies };
