function filterGames() {
  var input, filter, grid, gridItems, gameTitle, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  grid = document.getElementById("gameGrid");
  gridItems = grid.getElementsByClassName("grid-item");

  for (i = 0; i < gridItems.length; i++) {
    gameTitle = gridItems[i].getElementsByTagName("p")[0];
    if (gameTitle.innerHTML.toUpperCase().indexOf(filter) > -1) {
      gridItems[i].style.display = "";
    } else {
      gridItems[i].style.display = "none";
    }
  }
}
