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

document.addEventListener("click", function (event) {
  var searchInput = document.getElementById("searchInput");

  if (event.target !== searchInput && !searchInput.contains(event.target)) {
    clearSearchInput();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var gridItems = document.getElementsByClassName("grid-item");

  for (var i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("mouseover", function (event) {
      if (!isMobileDevice()) {
        var gameId = event.currentTarget.querySelector("a").getAttribute("data-game-id");
        var selectedGame = gamesData.find((game) => game.game_id === gameId);

        if (selectedGame) {
          displayGameInfo(selectedGame, event);
        }
      }
    });

    gridItems[i].addEventListener("mouseout", function () {
      hideGameInfo();
    });

    // Add click event for mobile devices
    gridItems[i].addEventListener("click", function (event) {
      if (isMobileDevice()) {
        event.preventDefault(); // Prevent hyperlink navigation on mobile
        var gameId = event.currentTarget.querySelector("a").getAttribute("data-game-id");
        var selectedGame = gamesData.find((game) => game.game_id === gameId);

        if (selectedGame) {
          displayGameInfo(selectedGame, event);
        }
      }
    });
  }

  var infoContainer = document.createElement("div");
  infoContainer.id = "gameInfoContainer";
  infoContainer.style.display = "none";
  document.body.appendChild(infoContainer);

  // Close game info window on mobile
  if (isMobileDevice()) {
    infoContainer.addEventListener("click", function () {
      hideGameInfo();
    });
  }
});

function displayGameInfo(game, event) {
  var infoContainer = document.getElementById("gameInfoContainer");

  var percentage = (game.total_rating / 100) * 360;

  var htmlContent = `
    <h2>${game.title}</h2>
    <div class="progress-bar" style="--percentage: 0deg;">
      <div class="progress-text">0</div>
    </div>
    <p><strong>Release Date:</strong> ${game.release_date}</p>
    <p><strong>Genres:</strong> ${game.genres.join(", ")}</p>
    <p><strong>Made by:</strong> ${game.involved_companies.join(", ")}</p>
    <p><strong>Description:</strong> ${game.description}</p>
    ${isMobileDevice() ? `<button class="more-info-btn" onclick="window.open('${game.url}', '_blank')" onTouchStart="event.preventDefault(); this.click();">More Info</button>` : ''}
    ${isMobileDevice() ? `<button class="more-info-btn close-btn" onTouchStart="event.preventDefault(); this.click();">Close</button>` : ''}
  `;

  infoContainer.innerHTML = htmlContent;

  // Set the width of the info container to 100% for mobile devices
  infoContainer.style.width = isMobileDevice() ? "100%" : "auto";

  if (isMobileDevice()) {
    // Center the info container on mobile devices
    infoContainer.style.top = "50%";
    infoContainer.style.left = "50%";
    infoContainer.style.transform = "translate(-50%, -50%)";
    infoContainer.style.maxWidth = "80%"; // Maximum width on mobile
  } else {
    // Position the info container based on the grid item position
    var gridItem = event.currentTarget;
    var rect = gridItem.getBoundingClientRect();

    var topPosition = rect.top - infoContainer.offsetHeight;

    if (topPosition < 0) {
      infoContainer.style.top = rect.bottom + "px";
    } else {
      infoContainer.style.top = topPosition + "px";
    }

    var rightPosition = rect.right + 310;

    if (rightPosition > window.innerWidth) {
      infoContainer.style.left = rect.left - 452 + "px";
    } else {
      infoContainer.style.left = rect.right + 10 + "px";
    }

    infoContainer.style.maxWidth = "400px";
  }

  infoContainer.style.display = "block";

  // Animate the progress bar
  animateProgressBar(percentage);

  // Close game info window on mobile when "Close" button is clicked
  if (isMobileDevice()) {
    var closeButton = document.querySelector("#gameInfoContainer .close-btn");
    closeButton.addEventListener("touchstart", function () {
      hideGameInfo();
    });
  }
}



function navigateTo(url) {
  window.location.href = url;
}



function animateProgressBar(targetPercentage) {
  var progressBar = document.querySelector(".progress-bar");
  var progressText = document.querySelector(".progress-text");

  var currentPercentage = 0;

  var animation = setInterval(function () {
    if (currentPercentage >= targetPercentage) {
      clearInterval(animation);
    } else {
      currentPercentage += 20;
      progressBar.style.setProperty("--percentage", currentPercentage + "deg");
      progressText.textContent = Math.round((currentPercentage / 360) * 100);
    }
  }, 1);
}

function hideGameInfo() {
  var infoContainer = document.getElementById("gameInfoContainer");
  infoContainer.style.display = "none";
}

function isMobileDevice() {
  return window.innerWidth <= 900; // Adjust the breakpoint as needed
}