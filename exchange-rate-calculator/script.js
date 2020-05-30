const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_one = document.getElementById('amount-one')
const amountEl_two = document.getElementById('amount-two')
const swap = document.getElementById('swap')
const rateEl = document.getElementById('rate')
const date = document.getElementById('date')


// Get currencies list from api and populate select options
function getCurrencies(){
fetch(`https://api.exchangerate-api.com/v4/latest/${'usd'}`)
.then(response => response.json())
.then(data => {

  date.innerText = `As of ${data.date}`
  // console.log(date.innerText)

  const currencies = data.rates // get rates dict
  index = 1
  for (const key in currencies) {
    if (currencies.hasOwnProperty(key)) {
      const ccy = key;
      const rate = currencies[key];

      // populate ccy one drop down
      let ccy_one = document.createElement('option')
      ccy_one.value = ccy
      ccy_one.innerHTML = ccy
      currencyEl_one.appendChild(ccy_one)


      // populate ccy two drop down
      let ccy_two = document.createElement('option')
      ccy_two.value = ccy
      ccy_two.innerHTML = ccy
      currencyEl_two.appendChild(ccy_two)

   
      index ++
    }
  }

  // convert object to array to be presented in datatable
  data = Object.entries(currencies)

  // get tableid(created via HTML)
  var tblId = document.getElementById('table_id')

  // create body of table
  var bodyOfTable = document.createElement('tbody')
  
  // create rows from array
  var dataRow = '';
  $.each(data,(index,value)=>{
    dataRow+=
    '<tr>'+ 
      '<td>' + value[0] +'</td>' +
      '<td>' + value[1] +'</td>' +
    '</tr>'

  });


  // bind the rows to the table body
  var addBody = bodyOfTable.innerHTML = dataRow;
  // console.log(addBody)

  //bind the table body to table
  tblId.innerHTML = addBody;

  // console.log(tblId)  

  // data table
    $('#table_id').DataTable({

      // required for showing number of rows  
      "aLengthMenu": [[8, 16, 30, 50, 75, 100, -1], [8, 16, 30, 50, 75, 100, "All"]],

      // data:data,
      columns: [
                  {title:'Currency'},
                  {title: 'Rate'},
                ],

      // Required for sorting a specific column by it's column index.  
      order: [[ 0, 'asc' ]]     
      

  });

// $(document).ready( function () {

// } );

})

}



// fetch exchange rate and update dom
function calculate(){
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  // console.log(currencyOne,currencyTwo)

  if(currencyOne !==""){

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
  .then(response => response.json())
  .then(data => {
    const rate = data.rates[currencyTwo]
    
    rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo} `

    amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
    
  }
)
}
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
getCurrencies()





