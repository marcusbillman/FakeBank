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
    accounts.forEach(account => {
        createAccountElement(account);
    });
} else {
    console.error("No accounts in local storage");
}

function createAccountElement(account) {
    const newElement = accountTemplate.cloneNode(true);
    newElement.id = "";
    newElement.querySelector(".account__name").innerText = account.name;
    newElement.querySelector(".account__number").innerText = account.number;
    newElement.querySelector(".account__balance").innerText =
        "$" + account.balance;
    newElement.querySelector(".account").style.animationDelay =
        accounts.indexOf(account) * 0.1 + "s";
    accountsList.appendChild(newElement);
}

createNewAccountLink.addEventListener("click", () => {
    const input = window.prompt("Account name");
    if (input) {
        openNewAccount(input);
    }
});

function openNewAccount(name) {
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
    createAccountElement(accounts[accounts.length - 1]);
}

function resetDefaultAccounts() {
    localStorage.setItem("accounts", JSON.stringify(defaultAccounts));
    console.log("Reset default accounts");
    location.reload();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max + 1 - min)) + min;
}
