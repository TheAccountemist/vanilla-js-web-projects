const draggable_list = document.getElementById('draggable-list');
// console.log(draggable_list)

const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]
// Store list items
const listItems = [];

//initalize index
let dragStartIndex;


createList();

// Insert list items into DOM
function createList(){
  // spread operate makes a copy of,return a sorted array with map sort, convert string to value with .map use foreach to loop array, 
  [...richestPeople]
  .map(a => ({value:a, sort:Math.random()}))
  .sort((a,b)=>a.sort-b.sort)
  .map(a=>a.value)
  .forEach((person,index)=>{
    // console.log(person)
    // create list item elemnt
    const listItem = document.createElement('li')


    // add an attribute to li, custom attributes in html5 should be data- and the attribute you want
    listItem.setAttribute('data-index',index)
    listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
      <p class="person-name">${person}</p>
      <i class="fas fa-grip-lines"></i>
    </div>
    `
    // console.log(listItem)
    listItems.push(listItem);

    
    draggable_list.appendChild(listItem);
  }
    
  )

  addEventListeners();

}



function dragStart(){
  // console.log('Event: ','dragstart')
  // get index number
  dragStartIndex = +this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex)
}
function dragEnter(){
  // console.log('Event: ','dragenter')
  this.classList.add('over')
}
function dragLeave(){
  // console.log('Event: ','dragleave')
  this.classList.remove('over')
}
function dragOver(e){
  // console.log('Event: ','dragover')
  e.preventDefault()
}
function dragDrop(){
  // console.log('Event: ','drop')

  // use + sign to make a number
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex,dragEndIndex)

  this.classList.remove('over')
  
}

// Swap list items that are drag and drop
function swapItems(fromIndex,toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')
  // console.log(itemOne,itemTwo)

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)


}

// Check the order of list items
function checkOrder(){
  listItems.forEach((listItem,index)=>{
    const personName = listItem.querySelector('.draggable').innerText.trim()

    if(personName !== richestPeople[index]){
      // wrong spot
      listItem.classList.add('wrong')
    }else{
      // correct spot
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }

  })
}

function addEventListeners(){
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable=>{
    draggable.addEventListener('dragstart',dragStart)
  })

  dragListItems.forEach(item=>{
    item.addEventListener('dragover',dragOver)
    item.addEventListener('drop',dragDrop)
    item.addEventListener('dragenter',dragEnter)
    item.addEventListener('dragleave',dragLeave)
  })



}

check.addEventListener('click',checkOrder)


