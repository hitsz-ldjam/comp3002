'use strict';

class Global {
    constructor() {
        // this.varItems = ['dataJson', 'cryptoInfo']
        this.varItems = ['dataJson', '_demoUnsafeMagic_']
        this.varItems.forEach(key => {
            this.addVarItem(key);
        });

    }

    addVarItem(key) {
        let item = sessionStorage.getItem(key)
        if (item)
            this[key] = JSON.parse(item);
        else
            this[key] = {};
    }

    updateVarItem(key, value) {
        sessionStorage.setItem(key, value);
    }

    updateAllItems() {
        this.varItems.forEach(key => {
            this.updateVarItem(key, JSON.stringify(this[key]));
        });
    }
}


let global = new Global();

window.onunload = _ => { global.updateAllItems(); };
