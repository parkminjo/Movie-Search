// 현재 상영작 데이터 배열
import { nowPlayingMovieList } from "./now-playing-api.js";

// 인기 상영작 데이터 배열
import { popularMovieList } from "./popular-api.js";

const arr = [...nowPlayingMovieList, ...popularMovieList];

// 인기/현재 상영작 데이터 배열
const allMovieList = arr.reduce((acc, current) => {
  const x = acc.find((item) => item.id === current.id);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

export { allMovieList };
