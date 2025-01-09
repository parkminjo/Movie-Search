const $searchInput = document.querySelector(".movie-search-input");

// 사용자가 엔터키를 눌렀을 때 입력한 값 가져오기
$searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const movieinput = $searchInput.value;
    $searchInput.value = ""; // 사용자가 입력한 값 초기화하기
  }
});
