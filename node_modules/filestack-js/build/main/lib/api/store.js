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
var t = require("tcomb-validation");
var request_1 = require("./request");
var utils_1 = require("../utils");
/**
 *
 * @private
 * @param session
 * @param url
 * @param opts
 * @param token
 * @param security
 */
exports.storeURL = function (session, url, opts, token, security) {
    if (!url || typeof url !== 'string') {
        throw new Error('url is required for storeURL');
    }
    var allowed = [
        { name: 'filename', type: t.String },
        { name: 'location', type: t.enums.of('s3 gcs rackspace azure dropbox') },
        { name: 'path', type: t.String },
        { name: 'region', type: t.String },
        { name: 'container', type: t.String },
        { name: 'access', type: t.enums.of('public private') },
    ];
    utils_1.checkOptions('storeURL', allowed, opts);
    var options = tslib_1.__assign({}, opts);
    var location = options.location || 's3';
    options.key = session.apikey;
    options.policy = security && security.policy || session.policy;
    options.signature = security && security.signature || session.signature;
    var baseURL = session.urls.storeApiUrl + "/" + location;
    return new Promise(function (resolve, reject) {
        var req = request_1.request
            .post(baseURL)
            .query(utils_1.removeEmpty(options))
            .field('url', url);
        if (token) {
            token.cancel = function () {
                req.abort();
                reject(new Error('Upload cancelled'));
            };
        }
        req.then(function (res) {
            if (res.body && res.body.url) {
                var handle = res.body.url.split('/').pop();
                var response = tslib_1.__assign({}, res.body, { handle: handle, mimetype: res.body.type });
                resolve(response);
            }
            else {
                resolve(res.body);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};
