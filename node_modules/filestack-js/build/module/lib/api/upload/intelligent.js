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
var _this = this;
import * as tslib_1 from "tslib";
import { requestWithSource } from '../request';
import { getLocationURL, getFormData, getHost, getS3PartData, uploadToS3 } from './network';
import { calcMD5 } from './md5';
import { throttle } from '../../utils';
/**
 * Slice a part into smaller chunks
 * @private
 * @param part  Part buffer to slice.
 * @param size  Size of slices.
 * @returns     List of chunks.
 */
export var slicePartIntoChunks = function (part, size) {
    var offset = 0;
    var chunks = [];
    while (offset < part.size) {
        var end = Math.min(offset + size, part.size);
        var buf = part.buffer.slice(offset, end);
        var chunk = {
            buffer: buf,
            offset: offset,
            size: buf.byteLength,
            number: part.number,
            md5: calcMD5(buf),
        };
        chunks.push(chunk);
        offset += size;
    }
    return chunks;
};
/**
 * Get chunk (of part) metadata and PUT chunk to S3
 * @private
 * @param chunk Chunk object, has offset information
 * @param startParams Parameters returned from start call
 * @param config Upload config
 * @returns {Promise}
 */
export var uploadChunk = function (chunk, ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s3Data, onProgress;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getS3PartData(chunk, ctx)];
            case 1:
                s3Data = (_a.sent()).body;
                if (ctx.config.onProgress) {
                    /* istanbul ignore next */
                    onProgress = throttle(function (evt) {
                        /* istanbul ignore next */
                        if (evt.loaded > chunk.loaded) {
                            chunk.loaded = evt.loaded;
                        }
                    }, ctx.config.progressInterval);
                }
                chunk.request = uploadToS3(chunk.buffer, s3Data, onProgress, ctx.config);
                return [4 /*yield*/, chunk.request];
            case 2:
                _a.sent();
                chunk.loaded = chunk.size;
                return [2 /*return*/, chunk.request];
        }
    });
}); };
/**
 * Commits single part (/commit) for intelligent ingestion (only called after all chunks have been uploaded)
 * @private
 * @param file        File being uploaded
 * @param part        Part object
 * @param startParams Parameters returned from start call
 * @param config      Upload config
 * @returns {Promise}
 */
export var commitPart = function (part, ctx) {
    var cfg = ctx.config;
    /* istanbul ignore next */
    var host = getHost(cfg.host) || getLocationURL(ctx.params.location_url);
    var fields = tslib_1.__assign({ apikey: cfg.apikey, part: part.number + 1, size: ctx.file.size }, ctx.params);
    var formData = getFormData(fields, cfg);
    return requestWithSource('post', host + "/multipart/commit")
        .timeout(cfg.timeout)
        .field(formData);
};
