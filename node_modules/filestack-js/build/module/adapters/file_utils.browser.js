/*
 * Copyright (c) 2018 by Filestack.
 * Some rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as tslib_1 from "tslib";
import { atob } from 'abab';
import { calcMD5 } from '../lib/api/upload/md5';
/**
 * Is file?
 *
 * @private
 * @return {Boolean}
 */
var isFile = function (file) {
    return file.toString() === '[object File]';
};
/**
 * Is blob?
 *
 * @private
 * @param blob
 * @returns {Boolean}
 */
var isBlob = function (blob) {
    return isFile(blob) || (blob.toString() === '[object Blob]');
};
/**
 * Convert encoded base64 string or dataURI to blob
 * @param b64data     String to decode
 * @param sliceSize   Byte quantity to split data into
 * @private
 * @returns {Blob}
 */
var b64toBlob = function (b64Data, sliceSize) {
    if (sliceSize === void 0) { sliceSize = 512; }
    var byteString;
    var contentType = '';
    if (b64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = b64Data.split(',')[1];
    }
    if (byteString !== undefined) {
        contentType = b64Data.split(',')[0].split(':')[1].split(';')[0];
        b64Data = decodeURI(byteString);
    }
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i += 1) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
};
/**
 * Get start and end for slice operations
 * @private
 * @returns Object where keys are `start` and `end`
 */
var getRange = function (_a, partNumber) {
    var config = _a.config, file = _a.file;
    var start = partNumber * config.partSize;
    var end = Math.min(start + config.partSize, file.size);
    return { start: start, end: end };
};
/**
 * Slice file into a single part
 * @private
 */
var sliceFile = function (ctx, partNumber) {
    var slice = File.prototype.slice;
    var _a = getRange(ctx, partNumber), start = _a.start, end = _a.end;
    return slice.call(ctx.file, start, end);
};
/**
 * Reads file as ArrayBuffer using HTML5 FileReader implementation
 * @private
 * @param file  Valid File instance
 * @returns     {Promise}
 */
var readFile = function (file) {
    return new Promise(function (resolve, reject) {
        var reader;
        if (File && FileReader && Blob) {
            reader = new FileReader();
            reader.onloadend = resolve;
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        }
        else {
            reject(new Error('The File APIs are not fully supported by your browser'));
        }
    });
};
/**
 * Reads a slice of a file based on the current part.
 * @private
 */
export var getPart = function (part, ctx) {
    return readFile(sliceFile(ctx, part.number))
        .then(function (evt) {
        var buffer = evt.target.result;
        var newPart = tslib_1.__assign({}, part, { buffer: buffer, size: buffer.byteLength, md5: calcMD5(buffer) });
        return newPart;
    });
};
/**
 * Get a Blob from a File or string.
 * @private
 */
export var getFile = function (fileOrString) {
    var file = fileOrString;
    if (typeof fileOrString === 'string') {
        file = b64toBlob(file);
    }
    if (!file || !isBlob(file)) {
        return Promise.reject(new TypeError('File argument is not a valid Blob'));
    }
    return Promise.resolve(file);
};
/**
 * This is a noop in browsers
 */
export var closeFile = function () { return undefined; };
