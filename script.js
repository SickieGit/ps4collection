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

function resetSearchInput() {
  var input = document.getElementById("searchInput");
  input.value = "";
}

window.addEventListener("load", resetSearchInput);

function toggleTextOverlay() {
  var textToggle = document.getElementById("textToggle");
  var gameGrid = document.getElementById("gameGrid");
  if (textToggle.checked) {
    gameGrid.classList.add("show-text");
  } else {
    gameGrid.classList.remove("show-text");
  }
}

function clearSearchInput() {
  var input = document.getElementById("searchInput");
  input.value = ""; 
  filterGames();
}

window.addEventListener("load", resetSearchInput);

document.addEventListener("click", function (event) {
  var searchInput = document.getElementById("searchInput");

  if (event.target !== searchInput && !searchInput.contains(event.target)) {
    clearSearchInput(); 
  }
});
document.addEventListener("DOMContentLoaded", function() {
  // This function will be called when the DOM is fully loaded
  document.getElementById("textToggle").checked = false;
});
