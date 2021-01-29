var currencyOne = document.querySelector('#cur_one');
var currencyOneAmt = document.querySelector('#cur_amt_one');
var currencyTwo = document.querySelector('#cur_two');
var currencyTwoAmt = document.querySelector('#cur_amt_two');
var swap = document.querySelector('#swap');
var resultText = document.querySelector('#result');

function calculateRate() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne.value}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currencyTwo.value];
            const res = (currencyOneAmt.value * rate).toFixed(2);
            currencyTwoAmt.value = res;
            resultText.innerText = `${currencyOneAmt.value} ${currencyOne.value} = ${currencyTwoAmt.value} ${currencyTwo.value}`;
        })
}

function swapCurrency() {
    let temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculateRate();
}

currencyOne.addEventListener('change', calculateRate);
currencyOneAmt.addEventListener('input', calculateRate);
currencyTwo.addEventListener('change', calculateRate);
currencyTwoAmt.addEventListener('input', calculateRate);

swap.addEventListener('click', swapCurrency);