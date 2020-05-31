const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const RemoveUserBtn = document.getElementById('remove-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')


let data = []; // data array

// fetch random user and add money
async function getRandomUser(){
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0]
  
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() *1000000)

  }
  addData(newUser)
  // console.log(newUser)

}

//removeUser
function removeUser(){
  data.pop()
  console.log(data)

  updateDOM()
}



//double money
function doubleMoney(){

  data = data.map((user)=>{

    // console.log({...user})
    return {...user, money: user.money*2} 

  });

  updateDOM()
}

// Sort users by richest
function sortByRichest(){
  data.sort((a,b)=>{
    return b.money - a.money
  })

  updateDOM()

}

// filter for users with greater than 1m
function showMillionaires(){

  data = data.filter(item=>item.money > 1000000)

  updateDOM()
}

// calculate entire wealth
function calcWealth(){
  const wealth = formatMoney(data.reduce((acc,user) =>(acc +=user.money),0));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${wealth}</strong></h3>`
  main.appendChild(wealthEl)
  console.log(wealthEl)
}


// add new obj to data arr
function addData(obj){
  data.push(obj);
  updateDOM();
}

//update DOM
function updateDOM(providedData = data){
  //clear main div
  main.innerHTML='<h2><strong>Person</strong> Wealth</h3>'

  providedData.forEach((item,index,arr)=>{
      const element = document.createElement('div')
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`

      main.appendChild(element)
  });
}



//format number as money
function formatMoney(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



getRandomUser()
getRandomUser()
getRandomUser()

// event listeners

// Add user
addUserBtn.addEventListener('click',(e)=>{
  getRandomUser()
})

// remove user
RemoveUserBtn.addEventListener('click',(e)=>{
  removeUser()
})

// Double money
doubleBtn.addEventListener('click',(e)=>{
  doubleMoney()
})

// Sort users
sortBtn.addEventListener('click',(e)=>{
  sortByRichest()
})


// Filter for millionaires
showMillionairesBtn.addEventListener('click',(e)=>{
 showMillionaires()
})

//Calculate welath
calculateWealthBtn.addEventListener('click',(e)=>{
  calcWealth()
 })
 

