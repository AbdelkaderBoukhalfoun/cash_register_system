function formatChangeDue(changeDueArray) {
    return changeDueArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
}
