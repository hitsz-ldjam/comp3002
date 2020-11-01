"use strict";

class DateUtils {
    /**
     * @param {Date} date
     * @returns Time in form of "YYYY-MM-DDThh-mm"
     */
    static stringfy(date) {
        let year = date.getUTCFullYear();
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        let hour = date.getUTCHours();
        let minute = date.getUTCMinutes();

        let twowords = (n) => {
            if (n < 10) {
                return "0" + n;
            } else {
                return n;
            }
        };

        let result = "";
        result += year;
        result += "-";
        result += twowords(month);
        result += "-";
        result += twowords(day);
        result += "T";
        result += twowords(hour);
        result += ":";
        result += twowords(minute);
        return result;
    }

    /**
     * @param {String} time
     * @returns {Date} null if time is invalid.
     */
    static parse(time) {
        // YYYY-MM-DDThh:mm
        let pattern = /([0-9]*)-([0-9]*)-([0-9]*)T([0-9]*):([0-9]*)/;
        let ary = pattern.exec(time);
        if (ary) {
            let date = new Date();
            date.setUTCFullYear(ary[1], ary[2] - 1, ary[3]);
            date.setUTCHours(ary[4], ary[5], 0, 0);
            return date;
        } else {
            return null;
        }
    }
}

/**
 * Platform backend for web
 * Only for development.
 */
class PlatformWeb {
    constructor(platform) {
        this._platform = platform;
        this._assets = new Map();
        this._file = null;
    }

    showMessage(message) {
        alert(message);
    }

    logMessage(message) {
        console.log(message);
    }

    logError(error) {
        console.error(error);
    }

    logWTF(wtf) {
        console.error('> WTF: ' + wtf);
    }

    loadAssetFile(name) {
        if (this._assets.has(name)) {
            return this._assets.get(name);
        } else {
            return null;
        }
    }

    storeAssetFile(name, data) {
        this._assets.set(name, data);
        return true;
    }

    deleteAssetFile(name) {
        if (this._assets.has(name)) {
            this._assets.delete(name);
        }
        return true;
    }

    listAssetFiles() {
        let files = new Array();
        for (let key of this._assets.keys()) {
            files.push(key);
        }
        return files;
    }

    getRequestedData() {
        return this._file;
    }

    showFileImporter(type) {
        let input = document.createElement("input");
        input.style.display = "none";
        input.type = "file";

        input.onchange = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (readerEvent) => {
                this._file = readerEvent.target.result;
                this._platform._onFileImporterResult();
            };
        };

        input.click();
    }

    showFileExporter(name, type) {
        if (this._assets.has(name)) {
            let blob = new Blob([this._assets.get(name)], {
                type: type,
            });
            let url = window.URL.createObjectURL(blob);

            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", name);
            link.click();
            this._platform._onFileExporterResult(true);
        } else {
            this._platform._onFileExporterResult(false);
        }
    }

    saveSubPair(subpwd, key) {
        this.logError("PlatformWeb: saveSubPair(subpwd, key) not implemented");
    }

    clearSubPair() {
        this.logError("PlatformWeb: clearSubPair() not implemented");
    }

    hasSubPair() {
        this.logError("PlatformWeb: hasSubPair() not implemented");
        return false;
    }

    getSubPair() {
        this.logError("PlatformWeb: getSubPair() not implemented");
        return null;
    }
}

/**
 * Platform backend for Desktop
 */
class PlatformDesktop {
    constructor(platform) {
        this._platform = platform;
        this._file = null;
        this._backend = window.platformDesktop;
    }

    showMessage(message) {
        // todo make a popup
        console.log(message);
    }

    logMessage(message) {
        console.log(message);
    }

    logError(error) {
        console.error(error);
    }

    /** WTF stands for What a Terrible Failure */
    logWTF(wtf) {
        console.error(wtf);
    }

    loadAssetFile(name) {
        return this._backend.loadAssetFile(name);
    }

    storeAssetFile(name, data) {
        return this._backend.storeAssetFile(name, data);
    }

    deleteAssetFile(name) {
        return this._backend.deleteAssetFile(name);
    }

    listAssetFiles() {
        return this._backend.listAssetFiles();
    }

    getRequestedData() {
        return this._file;
    }

    showFileImporter(type) {
        let input = document.createElement("input");
        input.style.display = "none";
        input.type = "file";

        input.onchange = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = (readerEvent) => {
                this._file = readerEvent.target.result;
                this._platform._onFileImporterResult();
            };
        };

        input.click();
    }

    showFileExporter(name, type) {
        let files = this.listAssetFiles();
        if (files.includes(name)) {
            let blob = new Blob([this.loadAssetFile(name)], {
                type: type,
            });

            let url = window.URL.createObjectURL(blob);

            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", name);
            link.click();
            this._platform._onFileExporterResult(true);
        } else {
            this._platform._onFileExporterResult(false);
        }
    }

    saveSubPair(subpwd, key) {
        this.logError(
            "PlatformDesktop: saveSubPair(subpwd, key) not implemented"
        );
    }

    clearSubPair() {
        this.logError("PlatformDesktop: clearSubPair() not implemented");
    }

    hasSubPair() {
        this.logError("PlatformDesktop: hasSubPair() not implemented");
        return false;
    }

    getSubPair() {
        this.logError("PlatformDesktop: getSubPair() not implemented");
        return null;
    }
}

/**
 * Platform backend for Android
 */
class PlatformAndroid {
    constructor(platform) {
        this._backend = platformAndroid;
    }

    showMessage(message) {
        return this._backend.showMessage(message);
    }

    logMessage(message) {
        return this._backend.logMessage(message);
    }

    logError(error) {
        return this._backend.logError(error);
    }

    logWTF(wtf) {
        return this._backend.logWTF(wtf);
    }

    loadAssetFile(name) {
        return this._backend.loadAssetFile(name);
    }

    storeAssetFile(name, data) {
        return this._backend.storeAssetFile(name, data);
    }

    deleteAssetFile(name) {
        return this._backend.deleteAssetFile(name);
    }

    listAssetFiles() {
        return this._backend.listAssetFiles();
    }

    showFileImporter(type) {
        return this._backend.showFileImporter(type);
    }

    getRequestedData() {
        return this._backend.getRequestedData();
    }

    showFileExporter(name, type) {
        return this._backend.showFileExporter(name, type);
    }

    /**
     * @param {string} subpwd
     * @param {string} key
     */
    saveSubPair(subpwd, key) {
        return this._backend.saveSubPair(subpwd, key);
    }

    clearSubPair() {
        return this._backend.clearSubPair();
    }

    /**
     * @returns {boolean}
     */
    hasSubPair() {
        return this._backend.hasSubPair();
    }

    /**
     * @returns {string}
     */
    getSubPair() {
        return this._backend.getSubPair();
    }
}

/**
 * General platform backend.
 */
class Platform {
    constructor() {
        this.settings = {};
        let pattern = /zebra-settings *{(.*)}/;
        let ary = pattern.exec(navigator.userAgent);
        if (ary) {
            let str = ary[1];

            let pairs = str.split(";");

            pairs.forEach((element) => {
                let str = element.trim();
                if (str.length == 0) return;

                let pair = str.split(":");
                let key = pair[0].trim();
                let value = pair[1].trim();

                if (key.length == 0) return;

                this.settings[key] = value;
            });
        } else {
            this.settings["platform"] = "web";
        }

        this.settings["platform"] = this.settings["platform"].toLowerCase();

        switch (this.settings["platform"]) {
            case "android":
                this._backend = new PlatformAndroid(this);
                break;
            case "desktop":
                this._backend = new PlatformDesktop(this);
                break;
            default:
                this._backend = new PlatformWeb(this);
                break;
        }

        this.onFileExporterResult = null;
        this.onFileImporterResult = null;
        this.onStop = null;

        this.logMessage("Platform created(backend = " + this.settings.platform + " )");
    }

    /**
     * Get a string indicating the current platform
     * @returns {string}
     * - "web" Web platform
     * - "android" Android
     * - "desktop" Windows/Linux
     */
    getCurrentPlatform() {
        return this.settings["platform"];
    }

    /**
     * Show a message popup.
     * @param {string} message
     */
    showMessage(message) {
        return this._backend.showMessage(message);
    }

    /**
     * Log a message to console.
     * @param {string} message
     */
    logMessage(message) {
        return this._backend.logMessage(message);
    }

    /**
     * Log a error message to console.
     * @param {string} error
     */
    logError(error) {
        return this._backend.logError(error);
    }

    /**
     * Log a fatal error message to console.
     * WTF stands for What a Terrible Failure
     *
     * @param {string} wtf
     */
    logWTF(wtf) {
        return this._backend.logWTF("> WTF: " + wtf);
    }

    /**
     * Load data from file.
     * @param {string} name Name of the file, can not contain path separators
     * @returns {string} Content of the file. Null if the operation failed.
     */
    loadAssetFile(name) {
        return this._backend.loadAssetFile(name);
    }

    /**
     * Store data to file.
     * @param {string} name Name of the file, can not contain path separators
     * @param {string} data Data to write.
     * @returns {boolean} Whether the operation successed.
     */
    storeAssetFile(name, data) {
        return this._backend.storeAssetFile(name, data);
    }

    /**
     * Delete file.
     * @param {string} name Name of the file, can not contain path separators
     * @returns {boolean} True if the file was successfully deleted; else false.
     */
    deleteAssetFile(name) {
        return this._backend.deleteAssetFile(name);
    }

    /**
     * List all files.
     * @returns {Array<string>} Array of filenames.
     */
    listAssetFiles() {
        return this._backend.listAssetFiles();
    }

    /**
     * Show file importer. Use this with onFileImporterResult to
     * get the result. This is used to let the user select the file,
     * if you just want to open an asset file use loadAssetFile instead.
     *
     * @param {string} type MIME of the file.
     *
     * @example
     * platform.onFileImporterResult = function (data) {
     *     $("#textarea-maindata").val(data);
     * }
     * platform.showFileImporter("application/json");
     *
     */
    showFileImporter(type) {
        return this._backend.showFileImporter(type);
    }

    /**
     * Global callback for function showFileImporter. This will be called
     * when file importer returns.
     *
     * @example
     * platform.onFileImporterResult = function(data) {
     *     // do something...
     * }
     *
     */

    /**
     * Show file exporter. Use this with onFileExporterResult to
     * get the result. This is used to let the user select the file,
     * if you just want to write an asset file use storeAssetFile instead.
     *
     * @param {string} name File to export.
     * @param {string} type MIME of the file.
     *
     * @example
     * platform.onFileExporterResult = function (success) {
     *     // do something
     * }
     * platform.showFileExporter("what.json", "text/json");
     */
    showFileExporter(name, type) {
        return this._backend.showFileExporter(name, type);
    }

    /**
     * Global callback for function showFileExporter. This will be called
     * when file exporter returns.
     *
     * You will alway get true on Android as I didn't yet find a good method to check if the operation is successful.
     *
     * @example
     * platform.onFileExporterResult = function(success) {
     *     // do something...
     * }
     */

    /**
     * Save sub password and key to local.
     * @param {string} subpwd
     * @param {string} key
     */
    saveSubPair(subpwd, key) {
        return this._backend.saveSubPair(subpwd, key);
    }

    clearSubPair() {
        return this._backend.clearSubPair();
    }

    /**
     * @returns {boolean}
     */
    hasSubPair() {
        return this._backend.hasSubPair();
    }

    /**
     * @returns {string}
     */
    getSubPair() {
        return this._backend.getSubPair();
    }

    /////////////////////////////////////////////
    //     Functions used by platform codes    //
    //                                         //
    // DO NOT call these functions yourself!   //
    /////////////////////////////////////////////

    _onFileImporterResult() {
        this.onFileImporterResult(this._backend.getRequestedData());
    }

    _onFileExporterResult(success) {
        this.onFileExporterResult(success);
    }

    _onStop() {
        this.onStop();
    }

}

let platform = new Platform();
