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
var utils_1 = require("../utils");
var request_1 = require("../api/request");
/**
 * @private
 */
exports.PICKER_KEY = '__fs_picker_token';
/**
 * @private
 */
var CloudClient = /** @class */ (function () {
    function CloudClient(session, options) {
        this.cache = false;
        this.session = session;
        this.cloudApiUrl = session.urls.cloudApiUrl;
        if (options && options.sessionCache) {
            this.cache = options.sessionCache;
        }
    }
    Object.defineProperty(CloudClient.prototype, "token", {
        get: function () {
            if (this.cache) {
                var token = localStorage.getItem(exports.PICKER_KEY);
                if (token)
                    return token;
            }
            return this._token;
        },
        set: function (key) {
            if (this.cache) {
                localStorage.setItem(exports.PICKER_KEY, key);
            }
            this._token = key;
        },
        enumerable: true,
        configurable: true
    });
    CloudClient.prototype.prefetch = function () {
        var params = {
            apikey: this.session.apikey,
        };
        return request_1.requestWithSource('get', this.cloudApiUrl + "/prefetch")
            .query(params)
            .then(function (res) { return res.body; });
    };
    CloudClient.prototype.list = function (clouds, token) {
        var _this = this;
        if (token === void 0) { token = {}; }
        var payload = {
            apikey: this.session.apikey,
            clouds: clouds,
            flow: 'web',
            token: this.token,
        };
        if (this.session.policy && this.session.signature) {
            payload.policy = this.session.policy;
            payload.signature = this.session.signature;
        }
        return new Promise(function (resolve, reject) {
            var req = request_1.requestWithSource('post', _this.cloudApiUrl + "/folder/list")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    if (response.body && response.body.token) {
                        _this.token = response.body.token;
                    }
                    resolve(response.body);
                }
            });
            token.cancel = function () {
                req.abort();
                reject(new Error('Cancelled'));
            };
        });
    };
    CloudClient.prototype.store = function (name, path, options, customSource, token) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (customSource === void 0) { customSource = {}; }
        if (token === void 0) { token = {}; }
        var _a;
        // Default to S3
        if (options.location === undefined)
            options.location = 's3';
        var payload = {
            apikey: this.session.apikey,
            token: this.token,
            flow: 'web',
            clouds: (_a = {},
                _a[name] = {
                    path: path,
                    store: utils_1.removeEmpty(options),
                },
                _a),
        };
        if (name === 'customsource' && customSource.customSourcePath) {
            payload.clouds.customsource.customSourcePath = customSource.customSourcePath;
        }
        if (name === 'customsource' && customSource.customSourceContainer) {
            payload.clouds.customsource.customSourceContainer = customSource.customSourceContainer;
        }
        if (this.session.policy && this.session.signature) {
            payload.policy = this.session.policy;
            payload.signature = this.session.signature;
        }
        return new Promise(function (resolve, reject) {
            var req = request_1.requestWithSource('post', _this.cloudApiUrl + "/store/")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    if (response.body && response.body.token) {
                        _this.token = response.body.token;
                    }
                    if (response.body && response.body[name]) {
                        resolve(response.body[name]);
                    }
                    else {
                        resolve(response.body);
                    }
                }
            });
            token.cancel = function () {
                req.abort();
                reject(new Error('Cancelled'));
            };
        });
    };
    CloudClient.prototype.link = function (name, path, customSource, token) {
        var _this = this;
        if (customSource === void 0) { customSource = {}; }
        if (token === void 0) { token = {}; }
        var _a;
        var payload = {
            apikey: this.session.apikey,
            token: this.token,
            flow: 'web',
            clouds: (_a = {},
                _a[name] = {
                    path: path,
                },
                _a),
        };
        if (name === 'customsource' && customSource.customSourcePath) {
            payload.clouds.customsource.customSourcePath = customSource.customSourcePath;
        }
        if (name === 'customsource' && customSource.customSourceContainer) {
            payload.clouds.customsource.customSourceContainer = customSource.customSourceContainer;
        }
        if (this.session.policy && this.session.signature) {
            payload.policy = this.session.policy;
            payload.signature = this.session.signature;
        }
        return new Promise(function (resolve, reject) {
            var req = request_1.requestWithSource('post', _this.cloudApiUrl + "/link/")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    if (response.body && response.body.token) {
                        _this.token = response.body.token;
                    }
                    if (response.body[name]) {
                        resolve(response.body[name]);
                    }
                    else {
                        resolve(response.body);
                    }
                }
            });
            token.cancel = function () {
                req.abort();
                reject(new Error('Cancelled'));
            };
        });
    };
    CloudClient.prototype.logout = function (name) {
        var _this = this;
        var _a;
        var payload = {
            apikey: this.session.apikey,
            flow: 'web',
            token: this.token,
        };
        if (name) {
            payload.clouds = (_a = {},
                _a[name] = {},
                _a);
        }
        else {
            // No name means logout of ALL clouds. Clear local session.
            if (this.cache) {
                localStorage.removeItem(exports.PICKER_KEY);
            }
        }
        return new Promise(function (resolve, reject) {
            request_1.requestWithSource('post', _this.cloudApiUrl + "/auth/logout/")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    if (response.body && response.body.token) {
                        _this.token = response.body.token;
                    }
                    resolve(response.body);
                }
            });
        });
    };
    CloudClient.prototype.metadata = function (url) {
        var _this = this;
        var payload = {
            apikey: this.session.apikey,
            url: url,
        };
        if (this.session.policy && this.session.signature) {
            payload.policy = this.session.policy;
            payload.signature = this.session.signature;
        }
        return new Promise(function (resolve, reject) {
            request_1.requestWithSource('post', _this.cloudApiUrl + "/metadata")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response.body);
                }
            });
        });
    };
    // OpenTok API Endpoints
    CloudClient.prototype.tokInit = function (type) {
        var _this = this;
        if (type !== 'video' && type !== 'audio') {
            throw new Error('Type must be one of video or audio.');
        }
        return new Promise(function (resolve, reject) {
            return request_1.requestWithSource('post', _this.cloudApiUrl + "/recording/" + type + "/init")
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    CloudClient.prototype.tokStart = function (type, key, sessionId) {
        var _this = this;
        if (type !== 'video' && type !== 'audio') {
            throw new Error('Type must be one of video or audio.');
        }
        var payload = {
            apikey: key,
            session_id: sessionId,
        };
        return new Promise(function (resolve, reject) {
            return request_1.requestWithSource('post', _this.cloudApiUrl + "/recording/" + type + "/start")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    CloudClient.prototype.tokStop = function (type, key, sessionId, archiveId) {
        var _this = this;
        if (type !== 'video' && type !== 'audio') {
            throw new Error('Type must be one of video or audio.');
        }
        var payload = {
            apikey: key,
            session_id: sessionId,
            archive_id: archiveId,
        };
        return new Promise(function (resolve, reject) {
            return request_1.requestWithSource('post', _this.cloudApiUrl + "/recording/" + type + "/stop")
                .send(payload)
                .end(function (err, response) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    };
    return CloudClient;
}());
exports.CloudClient = CloudClient;
