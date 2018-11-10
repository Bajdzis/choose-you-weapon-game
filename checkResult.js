function checkTheResult(fields) {
    for (let i = 0; i < fields.length; i++) {
        const row = fields[i];
        const valueOfTile1 = row[0].getValue();
        const valueOfTile2 = row[1].getValue();
        const valueOfTile3 = row[2].getValue();

        if (valueOfTile1 === valueOfTile2 && valueOfTile2 === valueOfTile3 && valueOfTile1 === valueOfTile3 && valueOfTile1 !== null) {
            return valueOfTile1;
        }
    }

    for (let i = 0; i < fields.length; i++) {

        const valueOfTile1 = fields[0][i].getValue();
        const valueOfTile2 = fields[1][i].getValue();
        const valueOfTile3 = fields[2][i].getValue();

        if (valueOfTile1 === valueOfTile2 && valueOfTile2 === valueOfTile3 && valueOfTile1 === valueOfTile3 && valueOfTile1 !== null) {
            return valueOfTile1;
        }
    }

    const valueOfCenterTile = fields[1][1].getValue();
    const valueOfTile1 = fields[0][0].getValue();
    const valueOfTile2 = fields[2][2].getValue();
    const valueOfTile3 = fields[0][2].getValue();
    const valueOfTile4 = fields[2][0].getValue();

    if (
        (valueOfTile1 === valueOfCenterTile && valueOfTile1 === valueOfTile2 && valueOfTile2 !== null) ||
        (valueOfTile3 === valueOfCenterTile && valueOfTile3 === valueOfTile4 && valueOfTile4 !== null)
    ) {
        return valueOfCenterTile;
    }

    for (let i = 0; i < fields.length; i++) {
        const row = fields[i];
        for (let j = 0; j < row.length; j++) {
            const tile = row[j];
            if (tile.getValue() === null) {
                return null;
            }
        }
    }

    return WEAPON.DRAW;
}
