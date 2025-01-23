const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGI0MTIwZGU5NTUwOWEzYTJhMTY4MmQzYzdhYmUxMyIsIm5iZiI6MTczNjI5NTgzOS4wNSwic3ViIjoiNjc3ZGM1OWY4OWZjNWQ5NDQyNGU1NmUxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.KNDcuNLSXmO_bZERMNVDo-_I5r9KBaKkc-1kZCvdFU8",
  },
};

const fetchMovieId = async function (movieId) {
  if (!movieId) {
    alert("movieId가 유효하지 않습니다.");
    return null;
  }

  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

    const response = await fetch(url, { ...options });
    if (!response.ok) {
      throw new Error(`${response.status} 에러가 발생했습니다`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export { fetchMovieId };
