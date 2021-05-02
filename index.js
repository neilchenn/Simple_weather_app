document.addEventListener('DOMContentLoaded', function(){

  const list = document.querySelector('#city-list ul');
  
  // delete cities (#10)
  list.addEventListener('click', (e) => {
    if(e.target.className == 'delete'){
      const li = e.target.parentElement;
      li.parentNode.removeChild(li);
    }
  });

  const forms = document.forms;

  // add cities (#10)
  const addForm = forms['add-city'];
  addForm.addEventListener('submit', function(e){
    e.preventDefault();
    // grabbing the value from the 'add-city' form
    const value = addForm.querySelector('input[type="text"]').value
    fetchWeather(value)
  });


function renderWeather (data) {
    // create elements
    const li = document.createElement('li')
    const cityName = document.createElement('span')
    const desc = document.createElement('span')
    const temp = document.createElement('span')
    const icon = document.createElement('img')
    const deleteBtn = document.createElement('span')

    // add text content
    cityName.textContent = data['name']
    desc.textContent = data['weather'][0]['description']
    temp.textContent = data['main']['temp'] + '℃'
    icon.src = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`
    deleteBtn.textContent = 'delete'

    // add classes (used .classList instead of .className as I can add multiple classes this way)
    // the input in the bracket for .add() is the class name
    cityName.classList.add('name')
    desc.classList.add('desc')
    temp.classList.add('temp')
    icon.classList.add('icon')
    deleteBtn.classList.add('delete')

    // append li element to the city-list under ul element (#12)
    list.appendChild(li)

    // append cityName and deleteBtn to li element created
    li.appendChild(cityName)
    li.appendChild(desc)
    li.appendChild(temp)
    li.appendChild(icon)    
    li.appendChild(deleteBtn) 
}

function fetchWeather (value) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=b9a760e0f3fdbfa257d1f712d0767f67&units=metric`)
    .then(response => response.json())
    .then(data => {
      renderWeather(data)
      return tempValue
    })
    .catch((msg) => {
      msg.textContent = "Please search for a valid city 😩";
    });
  }

  // hide cities
  const hideBox = document.querySelector('#hide');
  hideBox.addEventListener('change', function(e){

    // use the .checked property, if the box is checked, returns true, we want the list to display hidden
    // .display = "none" will hide it; .display = "initial" or "block" will show it
    if(hideBox.checked){
      list.style.display = "none";
    } else {
      list.style.display = "block";
    } 
  });

  // filter cities (#16)
  const searchBar = document.forms['search-cities'].querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const cities = list.getElementsByTagName('li');

    // turn the selection into an array
    Array.from(cities).forEach((city) => {
      const title = city.firstElementChild.textContent;
      if(title.toLowerCase().indexOf(e.target.value) != -1){
        city.style.display = 'block';
      } else {
        city.style.display = 'none';
      }
    });
  });


})












