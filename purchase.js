// Global variables
let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

const cashInput = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

purchaseBtn.addEventListener("click", () => {
    const cashValue = parseFloat(cashInput.value);
    if (isNaN(cashValue)) {
        alert("Please enter a valid cash amount");
        return;
    }
    const changeDue = cashValue - price;

    if (cashValue < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    if (cashValue === price) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
        return;
    }

    const changeResult = getChange(changeDue, cid);

    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED") {
        changeDueElement.innerText = `Status: ${changeResult.status} ${formatChangeDue(changeResult.changeDue)}`;
    } else {
        changeDueElement.innerText = `Status: OPEN ${formatChangeDue(changeResult.changeDue)}`.trim();
    }
});
