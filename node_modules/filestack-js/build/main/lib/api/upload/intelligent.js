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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var request_1 = require("../request");
var network_1 = require("./network");
var md5_1 = require("./md5");
var utils_1 = require("../../utils");
/**
 * Slice a part into smaller chunks
 * @private
 * @param part  Part buffer to slice.
 * @param size  Size of slices.
 * @returns     List of chunks.
 */
exports.slicePartIntoChunks = function (part, size) {
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
            md5: md5_1.calcMD5(buf),
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
exports.uploadChunk = function (chunk, ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s3Data, onProgress;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, network_1.getS3PartData(chunk, ctx)];
            case 1:
                s3Data = (_a.sent()).body;
                if (ctx.config.onProgress) {
                    /* istanbul ignore next */
                    onProgress = utils_1.throttle(function (evt) {
                        /* istanbul ignore next */
                        if (evt.loaded > chunk.loaded) {
                            chunk.loaded = evt.loaded;
                        }
                    }, ctx.config.progressInterval);
                }
                chunk.request = network_1.uploadToS3(chunk.buffer, s3Data, onProgress, ctx.config);
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
exports.commitPart = function (part, ctx) {
    var cfg = ctx.config;
    /* istanbul ignore next */
    var host = network_1.getHost(cfg.host) || network_1.getLocationURL(ctx.params.location_url);
    var fields = tslib_1.__assign({ apikey: cfg.apikey, part: part.number + 1, size: ctx.file.size }, ctx.params);
    var formData = network_1.getFormData(fields, cfg);
    return request_1.requestWithSource('post', host + "/multipart/commit")
        .timeout(cfg.timeout)
        .field(formData);
};
