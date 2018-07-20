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
import * as t from 'tcomb-validation';
import { request } from './request';
import { checkOptions, removeEmpty } from '../utils';
/**
 * Remove given file
 *
 * @private
 * @param session
 * @param handle
 * @param security
 */
export var remove = function (session, handle, skipStorage, security) {
    if (!handle || typeof handle !== 'string') {
        throw new Error('A valid Filestack handle is required for remove');
    }
    if (!(session.policy && session.signature) && (!security || !(security.policy && security.signature))) {
        throw new Error('Security policy and signature are required for remove');
    }
    var fileApiUrl = session.urls.fileApiUrl;
    var baseURL = fileApiUrl + "/" + handle;
    var options = {
        key: session.apikey,
        policy: (security && security.policy) || session.policy,
        signature: (security && security.signature) || session.signature,
    };
    if (skipStorage) {
        options.skip_storage = true;
    }
    return new Promise(function (resolve, reject) {
        request
            .delete(baseURL)
            .query(options)
            .end(function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
/**
 * Returns file metadata
 *
 * @private
 * @param session
 * @param handle
 * @param opts
 * @param security
 */
export var metadata = function (session, handle, opts, security) {
    if (!handle || typeof handle !== 'string') {
        throw new Error('A valid Filestack handle is required for metadata');
    }
    var allowed = [
        { name: 'size', type: t.Boolean },
        { name: 'mimetype', type: t.Boolean },
        { name: 'filename', type: t.Boolean },
        { name: 'width', type: t.Boolean },
        { name: 'height', type: t.Boolean },
        { name: 'uploaded', type: t.Boolean },
        { name: 'writeable', type: t.Boolean },
        { name: 'cloud', type: t.Boolean },
        { name: 'sourceUrl', type: t.Boolean },
        { name: 'md5', type: t.Boolean },
        { name: 'sha1', type: t.Boolean },
        { name: 'sha224', type: t.Boolean },
        { name: 'sha256', type: t.Boolean },
        { name: 'sha384', type: t.Boolean },
        { name: 'sha512', type: t.Boolean },
        { name: 'location', type: t.Boolean },
        { name: 'path', type: t.Boolean },
        { name: 'container', type: t.Boolean },
        { name: 'exif', type: t.Boolean },
    ];
    checkOptions('metadata', allowed, opts);
    var options = tslib_1.__assign({}, opts);
    options.source_url = options.sourceUrl; // source_url is snake_case
    options.policy = (security && security.policy) || session.policy;
    options.signature = (security && security.signature) || session.signature;
    var baseURL = session.urls.fileApiUrl + "/" + handle + "/metadata";
    return new Promise(function (resolve, reject) {
        request
            .get(baseURL)
            .query(removeEmpty(options))
            .end(function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(tslib_1.__assign({}, res.body, { handle: handle }));
            }
        });
    });
};
/**
 * @private
 */
var ERequestMethod;
(function (ERequestMethod) {
    ERequestMethod["get"] = "get";
    ERequestMethod["head"] = "head";
})(ERequestMethod || (ERequestMethod = {}));
/**
 * @private
 */
var EResponseType;
(function (EResponseType) {
    EResponseType["blob"] = "blob";
    EResponseType["json"] = "json";
})(EResponseType || (EResponseType = {}));
/**
 * Returns file information
 *
 * @private
 * @param session
 * @param handle
 * @param options
 * @param security
 */
export var retrieve = function (session, handle, options, security) {
    if (options === void 0) { options = {}; }
    if (!handle
        || handle.length === 0
        || typeof handle !== 'string') {
        throw new Error('File handle is required');
    }
    var allowed = [
        { name: 'metadata', type: t.Boolean },
        { name: 'head', type: t.Boolean },
        { name: 'dl', type: t.Boolean },
        { name: 'cache', type: t.Boolean },
        { name: 'extension', type: t.String },
    ];
    checkOptions('retrieveOptions', allowed, options);
    var requestOptions = tslib_1.__assign({}, options);
    requestOptions.key = session.apikey;
    requestOptions.policy = security && security.policy || session.policy;
    requestOptions.signature = security && security.signature || session.signature;
    var method = ERequestMethod.get;
    var responseType = EResponseType.blob;
    if (requestOptions.head) {
        method = ERequestMethod.head;
        responseType = EResponseType.json;
        delete requestOptions.head;
    }
    var extension;
    if (requestOptions.extension && requestOptions.extension.length) {
        extension = requestOptions.extension;
        delete requestOptions.extension;
    }
    var metadata;
    if (requestOptions.metadata) {
        if (method === ERequestMethod.head) {
            throw new Error('Head and metadata options cannot be used together');
        }
        responseType = EResponseType.json;
        metadata = requestOptions.metadata;
        delete requestOptions.metadata;
    }
    var baseURL = session.urls.fileApiUrl + "/" + handle + (extension ? "+" + extension : '') + (metadata ? '/metadata' : '');
    return new Promise(function (resolve, reject) {
        request[method](baseURL)
            .query(requestOptions)
            .responseType(responseType)
            .end(function (err, res) {
            if (err) {
                return reject(err);
            }
            if (method === ERequestMethod.head) {
                return resolve(res.headers);
            }
            resolve(res.body);
        });
    });
};
