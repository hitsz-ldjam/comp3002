"use strict"

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

    loadAssetFile(name) {
        if (this._assets.has(name)) {
            return this._assets.get(name);
        } else {
            return null;
        }
    }

    storeAssetFile(name, data) {
        this._assets.set(name, data)
        return true;
    }

    deleteAssetFile(name) {
        if (this._assets.has(name)) {
            this._assets.delete(name);
        }
        return true;
    }

    listAssetFiles() {
        let files = new Array()
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

        input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = readerEvent => {
                this._file = readerEvent.target.result;
                this._platform._onFileImporterResult();
            }
        }

        input.click();
    }

    showFileExporter(name, type) {
        if (this._assets.has(name)) {
            let blob = new Blob([this._assets.get(name)], {
                type: type
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
        alert(message);
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

        input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, "UTF-8");

            reader.onload = readerEvent => {
                this._file = readerEvent.target.result;
                this._platform._onFileImporterResult();
            }
        }

        input.click();
    }

    showFileExporter(name, type) {
        let files = this.listAssetFiles();
        if (files.includes(name)) {
            let blob = new Blob([this.loadAssetFile(name)], {
                type: type
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

            pairs.forEach(element => {
                let str = element.trim();
                if (str.length == 0)
                    return;

                let pair = str.split(":");
                let key = pair[0].trim();
                let value = pair[1].trim();

                if (key.length == 0)
                    return;

                this.settings[key] = value;
            });
        } else {
            this.settings["platform"] = "web";
        }


        switch (this.settings["platform"].toLowerCase()) {
            case "android":
                this._backend = platformAndroid;
                break;
            case "desktop":
                this._backend = new PlatformDesktop(this);
                break;
            default:
                this._backend = new PlatformWeb(this);
                break;
        }
    }

    /**
     * Show a message popup.
     * @param {string} message 
     */
    showMessage(message) {
        return this._backend.showMessage(message);
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
     * @returns True if the file was successfully deleted; else false.
     */
    deleteAssetFile(name) {
        return this._backend.deleteAssetFile(name);
    }

    /**
     * List all files.
     * @returns Array of filenames.
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
    onFileImporterResult;


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
    onFileExporterResult;


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
}

let platform = new Platform();