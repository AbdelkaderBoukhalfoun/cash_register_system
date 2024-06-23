function getChange(changeDue, cid) {
    let totalCid = parseFloat(cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2));
    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", changeDue: [] };
    }

    let changeDueArray = [];
    let remainingChange = changeDue;

    for (let i = currencyUnits.length - 1; i >= 0; i--) {
        let unit = currencyUnits[i][0];
        let unitValue = currencyUnits[i][1];
        let unitInDrawer = cid[i][1];

        if (unitValue <= remainingChange && unitInDrawer > 0) {
            let amountFromUnit = 0;

            while (remainingChange >= unitValue && unitInDrawer > 0) {
                remainingChange = parseFloat((remainingChange - unitValue).toFixed(2));
                unitInDrawer -= unitValue;
                amountFromUnit += unitValue;
            }

            if (amountFromUnit > 0) {
                changeDueArray.push([unit, amountFromUnit]);
            }
        }
    }

    if (remainingChange > 0) {
        return { status: "INSUFFICIENT_FUNDS", changeDue: [] };
    }

    if (changeDue === totalCid) {
        return { status: "CLOSED", changeDue: changeDueArray };
    }
    return { status: "OPEN", changeDue: changeDueArray };
}
