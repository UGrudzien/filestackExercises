"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var throat_1 = require("./throat");
var t = require("tcomb-validation");
exports.throat = throat_1.default;
/**
 * Resolve cdn url based on handle type
 *
 * @private
 * @param session session object
 * @param handle file handle (hash, src://alias, url)
 */
exports.resolveCdnUrl = function (session, handle) {
    var processURL = session.urls.processApiUrl;
    var cdnURL = session.urls.cdnUrl;
    if (!handle || handle.length === 0) {
        return cdnURL;
    }
    if (handle.indexOf('http:') > -1 || handle.indexOf('https:') > -1) {
        if (!session.apikey) {
            throw new Error('Api key is required when external url is provided');
        }
        return processURL + "/" + session.apikey;
    }
    if (handle.indexOf('src:') > -1) {
        if (!session.apikey) {
            throw new Error('Api key is required when storage alias is provided');
        }
        return cdnURL + "/" + session.apikey;
    }
    return cdnURL;
};
/**
 * Check config options
 *
 * @private
 * @param name
 * @param allowed
 * @param options
 */
exports.checkOptions = function (name, allowed, options) {
    if (options === void 0) { options = {}; }
    var keys = Object.keys(options);
    var allowedNames = allowed.map(function (a) { return a.name; });
    var namesFormatted = allowedNames.join(', ');
    keys.forEach(function (key) {
        if (allowedNames.indexOf(key) < 0) {
            throw new Error(key + " is not a valid option for " + name + ". Valid options are: " + namesFormatted);
        }
    });
    allowed.forEach(function (obj) {
        var value = options[obj.name];
        if (obj.name === 'location' && typeof value === 'string') {
            value = value.toLowerCase();
        }
        if (value !== undefined) {
            var result = t.validate(value, obj.type);
            if (!result.isValid()) {
                var error = result.firstError();
                if (error && error.message) {
                    throw new Error(error.message);
                }
            }
        }
    });
    return keys;
};
/**
 * Removes empty options from object
 *
 * @private
 * @param obj
 */
exports.removeEmpty = function (obj) {
    var newObj = tslib_1.__assign({}, obj);
    Object.keys(newObj).forEach(function (k) { return (!newObj[k] && newObj[k] !== undefined) && delete newObj[k]; });
    return newObj;
};
/**
 *
 * @private
 * @param fn
 * @param interval
 * @param callFirst
 */
exports.throttle = function throttle(fn, interval, callFirst) {
    var wait = false;
    var callNow = false;
    /* istanbul ignore next */
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        callNow = !!callFirst && !wait;
        var context = this;
        if (!wait) {
            wait = true;
            setTimeout(function () {
                wait = false;
                if (!callFirst) {
                    return fn.apply(context, args);
                }
            }, interval);
        }
        if (callNow) {
            callNow = false;
            return fn.apply(this, arguments);
        }
    };
};
/**
 *
 * @private
 * @param start
 * @param stop
 * @param step
 */
exports.range = function (start, stop, step) {
    if (step === void 0) { step = 1; }
    var toReturn = [];
    for (; start < stop; start += step) {
        toReturn.push(start);
    }
    return toReturn;
};
