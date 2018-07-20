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
import { checkOptions, removeEmpty } from '../utils';
/**
 * Returns file preview url
 *
 * @private
 * @param session
 * @param handle
 * @param opts
 * @param security
 */
export var getUrl = function (session, handle, opts, security) {
    var options = tslib_1.__assign({}, opts);
    var policy = security && security.policy || session.policy;
    var signature = security && security.signature || session.signature;
    var hasSecurity = signature && policy;
    var baseUrl = [session.urls.cdnUrl];
    var css = options.css && encodeURIComponent("\"" + options.css + "\"");
    var previewTask = css ? "preview=css:" + css : 'preview';
    if (handle.indexOf('src:') !== -1) {
        baseUrl.push(session.apikey + "/" + previewTask);
    }
    else {
        baseUrl.push(previewTask);
    }
    if (hasSecurity) {
        baseUrl.push("security=policy:" + policy + ",signature:" + signature);
    }
    baseUrl.push(handle);
    return baseUrl.join('/');
};
/**
 * Appends image preview into page
 *
 * @private
 * @param session
 * @param handle
 * @param opts
 */
export var preview = function (session, handle, opts) {
    if (!handle || typeof handle !== 'string') {
        throw new Error('A valid Filestack handle or storage alias is required for preview');
    }
    var allowed = [
        { name: 'id', type: t.String },
        { name: 'css', type: t.String },
    ];
    checkOptions('preview', allowed, opts);
    var options = removeEmpty(opts);
    var url = getUrl(session, handle, options);
    if (options.id) {
        var id = options.id;
        var iframe = document.createElement('iframe');
        var domElement = document.getElementById(id);
        iframe.src = url;
        iframe.width = '100%';
        iframe.height = '100%';
        if (!domElement) {
            throw new Error("DOM Element with id \"" + id + "\" not found.");
        }
        return domElement.appendChild(iframe);
    }
    return window.open(url, handle);
};
