const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const showMillionaresBtn = document.getElementById('show-millionares');
const doubleBtn = document.getElementById('double');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add cash

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  
  const user = data.results[0];

  const newUser = {
      name: `${user.name.first} ${user.name.last} `,
      money: Math.floor(Math.random() * 10000000)
  };

  addData(newUser);

}

// double everyones money
function doubleMoney() {
  // for each user, spread
  data = data.map((user)=> {
    return { ...user, money: user.money*2 };

  });

  updateDOM();
}

// sort users by richest

function sortByRichest() {
  data.sort((a,b) => b.money-a.money);

  updateDOM();
}

// filter only millionaires
function showMillionares() {
  data = data.filter(user => user.money > 1_000_000);

  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}
  </strong></h3>`;
  main.appendChild(wealthEl);
}


// add the new obj to data arr
function addData(obj) {
    data.push(obj);
    console.log(obj);

    updateDOM();
}

 // update dom
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong>
      ${formatMoney(item.money)}`;
      main.appendChild(element);
  });
}

//format number as money

function formatMoney(number) {
  return number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') +" kr.";
}


// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaresBtn.addEventListener('click', showMillionares );
calculateWealthBtn.addEventListener('click', calculateWealth);