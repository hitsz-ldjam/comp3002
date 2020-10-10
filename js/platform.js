// DONOT UPLOAD THIS
// DONOT UPLOAD THIS
// DONOT UPLOAD THIS
// DONOT UPLOAD THIS
// DONOT UPLOAD THIS
// DONOT UPLOAD THIS

"use strict"

/**
 * General platform backend.
 */
class Platform {
    constructor() { }

    showMessage(message) {
        alert(message);
    }

    logMessage(message) {
        console.log(message);
    }

    logError(error) {
        console.error(error);
    }

    /** WTF stands for What a Terrible Failure */
    logWTF(wtf) {
        console.error('> WTF: ' + wtf);
    }

    exportJsonFile(content) {
        let blob = new Blob([content], { type: 'application/json' });
        const downloadURL = URL.createObjectURL(blob);
        let dummyA = document.createElement('a');
        dummyA.href = downloadURL;
        dummyA.download = 'encrypted.json'
        dummyA.click();
    }
}

var platform = new Platform();