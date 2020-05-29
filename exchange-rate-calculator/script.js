const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_one = document.getElementById('amount-one')
const amountEl_two = document.getElementById('amount-two')
const swap = document.getElementById('swap')
const rateEl = document.getElementById('rate')




  
// fetch exchange rate and update dom
function calculate(){
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  console.log(currencyOne,currencyTwo)


  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
  .then(response => response.json())
  .then(data => {
    const rate = data.rates[currencyTwo]
    
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo} `

    amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
    
  }
)



}




// event listeners
currencyEl_one.addEventListener('change',calculate)
currencyEl_two.addEventListener('change',calculate)
amountEl_one.addEventListener('input',calculate)
amountEl_two.addEventListener('input',calculate)


swap.addEventListener('click', (e)=>{
  const temp = currencyEl_one.value
  currencyEl_one.value = currencyEl_two.value
  currencyEl_two.value = temp
  calculate()
}
)



calculate()














