const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
mealsEl = document.getElementById('meals'),
resultHeading = document.getElementById('result-heading'),
single_mealEl = document.getElementById('single-meal');



// search meal and fetch from API
function searchMeal(e){
  e.preventDefault();

  //clearsingle meal
  single_mealEl.innerHTML=''
  mealsEl.innerHTML= ``

  //get search item
  const term = search.value

  //check for empty
  if (term.trim()){
    // console.log(term)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res=>res.json())
    .then(data=>{
      resultHeading.innerHTML= `<h2>Search results for '${term}':</h2>`;

      if(data.meals === null){
        resultHeading.innerHTML = `<p>
        There are no search results. Try again.</p>`
      }

      else{
        mealsEl.innerHTML=data.meals
        .map(
          meal=>`
          <div class="meal">
            <img src = "${meal.strMealThumb}" alt= "${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>            
            </div>
          </div>
        `)
        .join('');
      }
      // console.log(mealsEl.innerHTML)

    })
    //Clear search text
    search.value = '';
  }else{
    alert('Please enter a search term')
  }

  // 
}


// show details like description, instruction, ingredients
function getMealById(mealID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res=>res.json())
  .then(data=>{
    // console.log(data)
    const meal = data.meals[0]

    addMealToDOM(meal);

  });
}

// fetch random meal from API
function getRandomMeal(){
  // clear existing meals
  mealsEl.innerHTML = ``
  resultHeading.innerHTML = ``

  // request random meal from API
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res=>res.json())
  .then(data=>{
    const meal = data.meals[0]
    addMealToDOM(meal)
    console.log(meal)
  })
}


// add meal to DOM
function addMealToDOM(meal){
  const ingredients = [];

  for (let i=1; i<=20; i++){
    ingredient = `strIngredient${i}`
    measure = `strMeasure${i}`
    // console.log(ingredient,measure)
    if (meal[ingredient]){
      ingredients.push(`${meal[ingredient]} - ${meal[measure]}`)
    } else{
      break;
    }
  }
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ?  `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ?  `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
      ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
    </div>

  </div>
  `
  // console.log(meal.strMeal)
}


//Event listeners
submit.addEventListener('submit',searchMeal)
random.addEventListener('click',getRandomMeal)

mealsEl.addEventListener('click',(e)=>{
  const mealInfo = e.path.find(item=>{
    if(item.classList){
      return item.classList.contains('meal-info')
    }else{
      return false;
    }

  })

  if (mealInfo){
    const mealID = mealInfo.getAttribute('data-mealId')
    // console.log(mealID)
    getMealById(mealID)
  }

})





















