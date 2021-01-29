var seatContainer = document.querySelector(".container");
var seatCountLabel = document.querySelector(".count");
var totalPriceLabel = document.querySelector(".price");
var selectedMoviePrice = document.querySelector("#movie");
var seats = document.querySelectorAll(".container .seat:not(.occupied)");

seatContainer.addEventListener("click", toggleSeat);
selectedMoviePrice.addEventListener("change", onMovieChange);

populateUI();
calculateTicketPrice();

function toggleSeat(e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    calculateTicketPrice();
  }
}

function onMovieChange(e) {
  selectedMoviePrice.value = +e.target.value;
  setMovieDate(e.target.selectedIndex, e.target.value);
  calculateTicketPrice();
}

function setMovieDate(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function calculateTicketPrice() {
  var selectedSeates = document.querySelectorAll(".container .seat.selected");

  const seatIndex = [...selectedSeates].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  seatCountLabel.innerText = selectedSeates.length;
  totalPriceLabel.innerText = selectedMoviePrice.value * selectedSeates.length;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedSeats.length) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  if (selectedMovieIndex !== null) {
    selectedMoviePrice.selectedIndex = selectedMovieIndex;
  }
}
