const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//last
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions: []; 
//Add Transactions
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please Enter Text and Value");
    }else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
}

//generate id

function generateID(){
    return Math.floor(Math.random()*1000000000);
}


function addTransactionDOM(transaction){
    //Get Sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    //Add Class Based on Value
    item.classList.add(
        transaction.amount <0 ?"minus":"plus"
    )

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class= "delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);    
}


//Update the balance income and expence
function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc +=item),0).toFixed(2);
    const expense = (amounts.filter(item => item<0).reduce((acc,item) => (acc += item),0)* -1 ).toFixed(2);

    balance.innerText = `₹${total}`;
    money_plus.innerText=`₹${income}`;
    money_minus.innerText= `₹${expense}`;
}

//Remove Transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}






//Update Local Storage Transaction

function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );

}
//Init app
function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

Init();

form.addEventListener("submit",addTransaction);
