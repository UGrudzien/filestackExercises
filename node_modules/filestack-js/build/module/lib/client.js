/*
 * Copyright (c) 2018 by Filestack
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
import { config } from '../config';
import { metadata, remove, retrieve } from './api/file';
import { transform } from './api/transform';
import { storeURL } from './api/store';
import { upload } from './api/upload';
import { preview } from './api/preview';
import { CloudClient } from './api/cloud';
import { picker, } from './picker';
/**
 * The Filestack client, the entry point for all public methods. Encapsulates session information.
 *
 * ### Example
 * ```js
 * // ES module
 * import * as filestack from 'filestack-js';
 * const client = filestack.init('apikey');
 * ```
 *
 * ```js
 * // UMD module in browser
 * <script src="https://static.filestackapi.com/filestack-js/1.x.x/filestack.min.js"></script>
 * const client = filestack.init('apikey');
 * ```
 */
var Client = /** @class */ (function () {
    function Client(apikey, options) {
        var _this = this;
        if (!apikey || typeof apikey !== 'string' || apikey.length === 0) {
            throw new Error('An apikey is required to initialize the Filestack client');
        }
        var urls = config.urls;
        this.session = { apikey: apikey, urls: urls };
        if (options) {
            var cname_1 = options.cname, security = options.security;
            if (security && !(security.policy && security.signature)) {
                throw new Error('Both policy and signature are required for client security');
            }
            if (security && security.policy && security.signature) {
                this.session.policy = security.policy;
                this.session.signature = security.signature;
            }
            if (cname_1) {
                var hosts_1 = /filestackapi.com|filestackcontent.com/i;
                this.session.cname = cname_1;
                Object.keys(urls).forEach(function (key) {
                    _this.session.urls[key] = urls[key].replace(hosts_1, cname_1);
                });
            }
        }
        this.cloud = new CloudClient(this.session, options);
    }
    /**
     * Clear all current cloud sessions in the picker.
     * Optionally pass a cloud source name to only log out of that cloud source.
     * This essentially clears the OAuth authorization codes from the Filestack session.
     * @param name Optional cloud source name.
     */
    Client.prototype.logout = function (name) {
        return this.cloud.logout(name);
    };
    /**
     * Retrieve detailed data of stored files.
     *
     * ### Example
     *
     * ```js
     * client
     *   .metadata('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Metadata](https://www.filestack.com/docs/api/file#metadata).
     * @param handle Valid Filestack handle.
     * @param options Metadata fields to enable on response.
     * @param security Optional security override.
     */
    Client.prototype.metadata = function (handle, options, security) {
        /* istanbul ignore next */
        return metadata(this.session, handle, options, security);
    };
    /**
     * Construct a new picker instance.
     */
    Client.prototype.picker = function (options) {
        /* istanbul ignore next */
        return picker(this, options);
    };
    /**
     * Used for viewing files via Filestack handles or storage aliases, __requires Document Viewer addon to your Filestack application__.
     * Opens document viewer in new window if id option is not provided.
     *
     * ### Example
     *
     * ```js
     * // <div id="preview"></div>
     *
     * client.preview('DCL5K46FS3OIxb5iuKby', { id: 'preview' });
     * ```
     * @param handle Valid Filestack handle.
     * @param options Preview options
     */
    Client.prototype.preview = function (handle, options) {
        /* istanbul ignore next */
        return preview(this.session, handle, options);
    };
    /**
     * Remove a file from storage and the Filestack system.
     *
     * __Requires a valid security policy and signature__. The policy and signature will be pulled from the client session, or it can be overridden with the security parameter.
     *
     * ### Example
     *
     * ```js
     * client
     *   .remove('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Delete](https://www.filestack.com/docs/api/file#delete)
     * @param handle Valid Filestack handle.
     * @param security Optional security override.
     */
    Client.prototype.remove = function (handle, security) {
        /* istanbul ignore next */
        return remove(this.session, handle, false, security);
    };
    /**
     * Remove a file **only** from the Filestack system. The file remains in storage.
     *
     * __Requires a valid security policy and signature__. The policy and signature will be pulled from the client session, or it can be overridden with the security parameter.
     *
     * ### Example
     *
     * ```js
     * client
     *   .removeMetadata('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Delete](https://www.filestack.com/docs/api/file#delete)
     * @param handle Valid Filestack handle.
     * @param security Optional security override.
     */
    Client.prototype.removeMetadata = function (handle, security) {
        /* istanbul ignore next */
        return remove(this.session, handle, true, security);
    };
    /**
     * Store a file from its URL.
     *
     * ### Example
     *
     * ```js
     * client
     *   .storeURL('https://d1wtqaffaaj63z.cloudfront.net/images/NY_199_E_of_Hammertown_2014.jpg')
     *   .then(res => console.log(res));
     * ```
     * @see [File API - Store](https://www.filestack.com/docs/api/file#store)
     * @param url       Valid URL to a file.
     * @param options   Configure file storage.
     * @param token     Optional control token to call .cancel()
     * @param security  Optional security override.
     */
    Client.prototype.storeURL = function (url, options, token, security) {
        /* istanbul ignore next */
        return storeURL(this.session, url, options, token, security);
    };
    /**
     * Access files via their Filestack handles.
     *
     * If head option is provided - request headers are returned in promise
     * If metadata option is provided - metadata object is returned in promise
     * Otherwise file blob is returned
     * Metadata and head options cannot be mixed
     *
     * ### Example
     *
     * ```js
     * client.retrieve('fileHandle', {
     *  metadata: true,
     * }).then((response) => {
     *  console.log(response);
     * }).catch((err) => {
     *  console.error(err);
     * })
     * ```
     *
     * @see [File API - Download](https://www.filestack.com/docs/api/file#download)
     * @param handle    Valid file handle
     * @param options   RetrieveOptions
     * @param security  Optional security override.
     * @throws          Error
     */
    Client.prototype.retrieve = function (handle, options, security) {
        /* istanbul ignore next */
        return retrieve(this.session, handle, options, security);
    };
    /**
     * Interface to the Filestack [Processing API](https://www.filestack.com/docs/api/processing).
     * Convert a URL, handle, or storage alias to another URL which links to the transformed file.
     * You can optionally store the returned URL with client.storeURL.
     *
     * Transform params can be provided in camelCase or snakeCase style ie: partial_pixelate or partialPixelate
     *
     * ### Example
     *
     * ```js
     * const transformedUrl = client.transform(url, {
     *   crop: {
     *     dim: [x, y, width, height],
     *   },
     *   vignette: {
     *     blurmode: 'gaussian',
     *     amount: 50,
     *   },
     *   flip: true,
     *   partial_pixelate: {
     *     objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
     *   },
     * };
     *
     * // optionally store the new URL
     * client.storeURL(transformedUrl).then(res => console.log(res));
     * ```
     * @see [Filestack Processing API](https://www.filestack.com/docs/api/processing)
     * @param url     Valid URL (http(s)://), file handle, or storage alias (src://) to an image.
     * @param options Transformations are applied in the order specified by this object.
     * @returns       A new URL that points to the transformed resource.
     */
    Client.prototype.transform = function (url, options) {
        /* istanbul ignore next */
        return transform(this.session, url, options);
    };
    /**
     * Initiates a multi-part upload flow. Use this for Filestack CIN and FII uploads.
     *
     * In Node runtimes the file argument is treated as a file path.
     * Uploading from a Node buffer is not yet implemented.
     *
     * ### Example
     *
     * ```js
     * const token = {};
     * const onRetry = (obj) => {
     *   console.log(`Retrying ${obj.location} for ${obj.filename}. Attempt ${obj.attempt} of 10.`);
     * };
     *
     * client.upload(file, { onRetry }, { filename: 'foobar.jpg' }, token)
     *   .then(res => console.log(res));
     *
     * token.pause();  // Pause flow
     * token.resume(); // Resume flow
     * token.cancel(); // Cancel flow (rejects)
     * ```
     * @param file           Must be a valid [File](https://developer.mozilla.org/en-US/docs/Web/API/File), Blob, base64 encoded string, or file path in Node.
     * @param uploadOptions  Uploader options.
     * @param storeOptions   Storage options.
     * @param token          A control token that can be used to call cancel(), pause(), and resume().
     * @param security       Optional security policy and signature override.
     *
     * @returns {Promise}
     */
    Client.prototype.upload = function (file, options, storeOptions, token, security) {
        /* istanbul ignore next */
        return upload(this.session, file, options, storeOptions, token, security);
    };
    return Client;
}());
export { Client };
