"use strict"

/**
 * General platform backend.
 */
class Platform {
    constructor() {
        let ua = navigator.userAgent;
        let pairs = ua.split(";");
        this.settings = {};

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

        switch (this.settings["platform"].toLowerCase()) {
            case "android":
                this._backend = PlatformAndroid;
                break;

            default:
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
        return JSON.parse(this._backend.listAssetFiles());
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

var platform = new Platform();