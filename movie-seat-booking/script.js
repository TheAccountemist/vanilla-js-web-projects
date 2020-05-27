const container = document.querySelector('.container'); // select main container w screen and seats
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // select all available seats,aka not occupied
const count = document.getElementById('count');
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
let ticketPrice = +movieSelect.value //+ sign converts string to number type



//call populate UI function
populateUI();


// Save selected movie index and price
function setMovieData(movieIndex,moviePrice){
  localStorage.setItem('selectedMovieIndex',movieIndex)
  localStorage.setItem('selectedMoviePrice',moviePrice)
}


// update total and count
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //copy selected seats into arr (spread operator)
  // map through array (map, similar to for each, but returns array)
  // return new arr of indexs = return [...seats].indexOf(seat)
  const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

  console.log(seatsIndex)

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount  * ticketPrice

}


// get data from localstorage and populate UI
function populateUI(){

  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  // add selected seats back
  if (selectedSeats !== null && selectedSeats.length> 0){
    seats.forEach(
      (seat,index) => {
        if (selectedSeats.indexOf(index) > -1){
          seat.classList.add('selected');
        }
      }
    )
  }

  // check movie index and set it 
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice')
  if (selectedMoviePrice !== null){
    ticketPrice = selectedMoviePrice;
  }

  

}


// movie select event
movieSelect.addEventListener('change',e=>{
  ticketPrice = +e.target.value;

  // store movie data
  setMovieData(e.target.selectedIndex, e.target.value)

  updateSelectedCount()
})

// add seat click event listener for clicks of non-occupied seats
container.addEventListener('click',(e) =>{
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    // console.log(e.target)
    e.target.classList.toggle('selected') 
  }

  updateSelectedCount()

});


updateSelectedCount(); // will happen on page load after above functions have been run. this will auto update the number of seats selected and total cost







