const url = "https://cat-fact.herokuapp.com/facts"
const url2 = "https://cors-anywhere.herokuapp.com/"

async function fetchApi(url2, url) {
    let response = await fetch(url2 + url)
    let data = await response.json()
      return data;
    };
    
const getArrayRandomElement = (arr) => {
  if (arr && arr.length) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

const printFact = (data, factList) => {
  const catFact = getArrayRandomElement(data.all).text
  let facts =  `<div class="container border mt-3 p-3"> 
                <img src="https://source.unsplash.com/300x300/?animals,cat" alt="cats" class="rounded-circle w-25 mt-3">
                <h5 class='col-12 mt-4'>${catFact}</h5>
                <button class="btn btn-primary refresh-button">Change this fact</button>
                </div>`
  factList.insertAdjacentHTML("beforeend", facts);
}

const refreshFact = (data, factRefresh) => {
  const catFact = getArrayRandomElement(data.all).text
  let facts = `<div class="container border mt-3 p-3"> 
                <img src="https://source.unsplash.com/300x300/?animals,cat" alt="cats" class="rounded-circle w-25 mt-3">
                <h5 class='col-12 mt-4'>${catFact}</h5>
                <button class="btn btn-primary refresh-button">Change this fact</button>
                </div>`
  factRefresh.outerHTML = facts;
}

const addRefresher = (data, factList) => {
  factList.querySelectorAll('.refresh-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const singleFact = event.currentTarget.parentNode;
      refreshFact(data, singleFact);
      addRefresher(data, factList);
    })
  })
}

const factButton = document.getElementById('botao')
factButton.addEventListener('click', (event) => {
  const factNumbers = parseInt(document.querySelector('#fact-numbers').value, 10);
  if (factNumbers) {
    event.currentTarget.innerText = 'Hold still...';
    event.currentTarget.setAttribute("disabled", "true");
    const factList = document.querySelector('.fact-list');
    factList.innerHTML = ''
    fetchApi(url2, url).then(data => {
      [...Array(factNumbers).keys()].forEach(() => printFact(data, factList));
      factButton.disabled = false;
      factButton.innerText = 'Get facts!';
      addRefresher(data, factList);
    })
  } else {
    alert("Choose how many facts you want!");
  };
});