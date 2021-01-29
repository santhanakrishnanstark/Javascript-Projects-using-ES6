var addUserBtn = document.querySelector('#add_user');
var doubleMoneyBtn = document.querySelector('#double_money');
var showMillionareBtn = document.querySelector('#show_millionare');
var sortRichestBtn = document.querySelector('#sort_richest');
var totalWealthBtn = document.querySelector('#total_wealth');

let users = [];

async function generateNewUser() {
    let response = await fetch('https://randomuser.me/api/');
    let data = await response.json();
    const name = data.results[0].name;

    const userName = `${name.first} ${name.last}`;
    const randMoney = Math.floor(Math.random() * 1000000);

    const user = {
        name: userName,
        money: randMoney
    }

    addUser(user);
}

function addUser(obj) {
    users.push(obj);
    updateDOM();
}

function updateDOM(providedData = users) {
    let rows = '';
    providedData.forEach(function (user) {
        rows += `<tr><td>${user.name}</td><td>${formatMoney(user.money)}</td></tr>`;
    });
    document.querySelector('.user-table tbody').innerHTML = rows;
}

function formatMoney(money) {
    return '$ ' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleTheMoney() {
    users = users.map(user => {
        return {
            ...user,
            money: (+user.money * 2)
        }
    });
    updateDOM();
}

function sortByRich() {
    users = users.sort((a, b) => b.money - a.money);
    updateDOM();
}

function showOnlyMillionare() {
    users = users.filter((user) => {
        return user.money > 1000000;
    });
    updateDOM();
}

function calculateTotalWealth() {
    const totalWealth = users.reduce((acc, user) => (acc + user.money), 0);
    let tr = document.createElement('tr');
    tr.innerHTML = `<th>Total</th><th>${formatMoney(totalWealth)}</th>`;
    document.querySelector('table tbody').appendChild(tr);
}



addUserBtn.addEventListener('click', generateNewUser);
doubleMoneyBtn.addEventListener('click', doubleTheMoney);
sortRichestBtn.addEventListener('click', sortByRich);
showMillionareBtn.addEventListener('click', showOnlyMillionare);
totalWealthBtn.addEventListener('click', calculateTotalWealth);