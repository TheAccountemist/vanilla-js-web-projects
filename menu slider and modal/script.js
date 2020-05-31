const toggleBtn = document.getElementById('toggle')
const modalBtn = document.getElementById('modal')
const close = document.getElementById('close')
const open = document.getElementById('open')


// toggle side menu
function toggleSideMenu(){
  // console.log(document.body.classList)
  document.body.classList.toggle('show-nav')
}

// show modal
function showModal(){
  modal.classList.add('show-modal')
  // console.log('clicked')
}

//hide modal
function hideModal(){
  modal.classList.remove('show-modal')
  // console.log('clicked')
}


//Event listeners

// toggle side menu
toggleBtn.addEventListener('click',(e)=>{
  toggleSideMenu()

})


//show modal
open.addEventListener('click',(e)=>{
  showModal()

})

//hide modal
close.addEventListener('click',(e)=>{
  hideModal()

})

// hide modal on outside click
window.addEventListener('click',(e)=>{
  e.target == modal ? modal.classList.remove('show-modal') : false
})





