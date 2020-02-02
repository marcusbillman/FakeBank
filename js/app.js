const defaultAccounts = [
    {
        name: "Checking Account",
        number: "123 111 123",
        balance: 1000.0
    },
    {
        name: "Savings Account",
        number: "456 222 456",
        balance: 420.69
    }
];

const accountTemplate = document.getElementById("accountTemplate");
const accountsList = document.getElementById("accountsList");
const createNewAccountLink = document.getElementById("createNewAccount");

let accounts;

// Get accounts from local storage
if (localStorage.getItem("accounts")) {
    accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(accounts);
    populateAccountsView();
} else {
    console.error("No accounts in local storage");
}

function populateAccountsView() {
    accounts.forEach(element => {
        const newAccount = accountTemplate.cloneNode(true);
        newAccount.id = "";
        newAccount.querySelector(".account__name").innerText = element.name;
        newAccount.querySelector(".account__number").innerText = element.number;
        newAccount.querySelector(".account__balance").innerText =
            "$" + element.balance;
        newAccount.querySelector(".account").style.animationDelay =
            accounts.indexOf(element) * 0.1 + "s";
        accountsList.appendChild(newAccount);
    });
}

createNewAccountLink.addEventListener("click", () => {
    const input = window.prompt("Account name");
    if (input) {
        createNewAccount(input);
    }
});

function createNewAccount(name) {
    const number =
        getRandomInt(100, 999) +
        " " +
        getRandomInt(100, 999) +
        " " +
        getRandomInt(100, 999);
    accounts.push({
        name: name,
        number: number,
        balance: 0.0
    });
    localStorage.setItem("accounts", JSON.stringify(accounts));
    //location.reload();
    const newAccount = accountTemplate.cloneNode(true);
    let element = accounts[accounts.length - 1];
    newAccount.id = "";
    newAccount.querySelector(".account__name").innerText = element.name;
    newAccount.querySelector(".account__number").innerText = element.number;
    newAccount.querySelector(".account__balance").innerText =
        "$" + element.balance;
    accountsList.appendChild(newAccount);
    accountsList.insertBefore(newAccount, createNewAccountLink);
}

function resetDefaultAccounts() {
    localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
    console.log("Reset default accounts");
    location.reload();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}
