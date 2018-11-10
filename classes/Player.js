const WEAPON = {
    DRAW: -1,
    FIRE: 0,
    WATER: 1,
    ELECTRICITY: 2,
    TREE: 3
}
const WEAPON_NAME = {
    [WEAPON.DRAW]: 'draw',
    [WEAPON.FIRE]: 'fire',
    [WEAPON.WATER]: 'water',
    [WEAPON.ELECTRICITY]: 'electricity',
    [WEAPON.TREE]: 'tree'
}

const WEAPON_ICON = {
    [WEAPON.DRAW]: 'snowflake',
    [WEAPON.FIRE]: 'fire',
    [WEAPON.WATER]: 'water',
    [WEAPON.ELECTRICITY]: 'flash',
    [WEAPON.TREE]: 'tree'
}

class Player {
    constructor(name, weapon) {
        this.win = 0;
        this.lose = 0;
        this.draw = 0;
        this.name = name;
        this.weapon = weapon;
    }

    getWeapon() {
        return this.weapon;
    }
    getWeaponName() {
        return WEAPON_NAME[this.weapon];
    }
    getIconName() {
        return WEAPON_ICON[this.weapon];
    }
}
