// https://randomuser.me/
// fetch for getting the api
// using async await without having to use the .then syntax

const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

//array of objects
let data = [];

///fetch ramdom user and add money
async function getRandomUser(){
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    
    const user = data.results[0];

    const newUser = {
        name : `${user.name.title}. ${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000), // generate random number 
    }

    console.log(newUser);
    addData(newUser)
}


function  doubleMoney(){
    // alert("click");
    data = data.map(user => {
        return { 
            ...user,money: user.money * 2
        };
    });

    updateDOM();
}


function sortByRichest(){
    data.sort((a,b) => b.money - a.money); // decending order
    updateDOM();
}


function showMillionaires(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calculateWealth(){
    const wealth = data.reduce((acc,user) => acc + user.money,0);

    console.log(formatMoney(wealth));

    const wealthElemement = document.createElement("div");
    wealthElemement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthElemement);
}

//Add new obj to data arr
function addData(obj){
    data.push(obj);

    updateDOM();
}

// if nothing is pass in use the data
function updateDOM(providedData = data) {
    //Clear the main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });


}

// map - loop through an array and returns another array from it

function formatMoney(number){
    return "Php " + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}


/// Event Listeners
addUser.addEventListener("click",getRandomUser);

doubleBtn.addEventListener("click",doubleMoney);

sortBtn.addEventListener("click",sortByRichest);

showMillionairesBtn.addEventListener("click",showMillionaires);

calculateWealthBtn.addEventListener("click",calculateWealth);

// Initial 3 user
getRandomUser()
getRandomUser()
getRandomUser()