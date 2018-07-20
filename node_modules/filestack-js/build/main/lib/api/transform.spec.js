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
var assert = require("assert");
var t = require("./transform");
var session = ENV.session;
var secureSession = ENV.secureSession;
var processURL = session.urls.processApiUrl;
var cdnUrl = session.urls.cdnUrl;
describe('transform', function () {
    var transform = function (url, options) { return t.transform(session, url, options); };
    var transformSecure = function (url, options) { return t.transform(secureSession, url, options); };
    var url = ENV.filelink;
    it('should throw an error if invalid options are provided', function () {
        assert.throws(function () { return transform(url, { invalidKey: 'ignored' }); });
    });
    it('should construct URL parameters from specified transforms', function () {
        var testConfig = {
            vignette: {
                amount: 100,
                blurmode: 'linear',
            },
            shadow: {
                blur: 10,
                opacity: 35,
                vector: [25, 25],
            },
        };
        var result = transform(url, testConfig);
        var expected = cdnUrl + "/vignette=amount:100,blurmode:linear/shadow=blur:10,opacity:35,vector:[25,25]/" + url;
        assert.equal(result, expected);
    });
    it('should construct URL parameters properly with primitive options', function () {
        var testConfig = {
            polaroid: true,
            flip: false,
            flop: true,
            compress: false,
        };
        var result = transform(url, testConfig);
        var expected = cdnUrl + "/polaroid/flop/" + url;
        assert.equal(result, expected);
    });
    it('should construct URL with security properly', function () {
        var testConfig = {
            polaroid: true,
        };
        var result = transformSecure(url, testConfig);
        var expected = processURL + "/polaroid/security=policy:" + secureSession.policy + ",signature:" + secureSession.signature + "/" + url;
        assert.equal(result, expected);
    });
    it('should return base url if there are no transforms', function () {
        var testConfig = {};
        var result = transform(url, testConfig);
        assert.equal(result, processURL + "/" + url);
    });
    it('should return flatten nested options array', function () {
        var testConfig = {
            partial_pixelate: {
                objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
            },
        };
        var result = transform(url, testConfig);
        var expected = cdnUrl + "/partial_pixelate=objects:[[10,20,200,250],[275,91,500,557]]/" + url;
        assert.equal(result, expected);
    });
    it('should handle camelCased params', function () {
        var testConfig = {
            partialPixelate: {
                objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
            },
        };
        var result = transform(url, testConfig);
        var expected = cdnUrl + "/partial_pixelate=objects:[[10,20,200,250],[275,91,500,557]]/" + url;
        assert.equal(result, expected);
    });
    it('should handle storage with url handle', function () {
        var storeAlias = 'https://test.com/file.js';
        var testConfig = {
            polaroid: true,
            flip: false,
            flop: true,
        };
        var result = transform(storeAlias, testConfig);
        var expected = processURL + "/" + session.apikey + "/polaroid/flop/" + storeAlias;
        assert.equal(result, expected);
    });
    it('should handle storage with http url handle', function () {
        var storeAlias = 'http://test.com/file.js';
        var testConfig = {
            polaroid: true,
            flip: false,
            flop: true,
        };
        var result = transform(storeAlias, testConfig);
        var expected = processURL + "/" + session.apikey + "/polaroid/flop/" + storeAlias;
        assert.equal(result, expected);
    });
    it('should throw exception when storage alias is provided without apikey', function () {
        var sessionCopy = JSON.parse(JSON.stringify(session));
        sessionCopy.apikey = null;
        var testConfig = {};
        assert.throws(function () { return t.transform(sessionCopy, 'src:test', testConfig); });
    });
    it('should handle store aliases', function () {
        var storeAlias = 'src://my-s3/mydoc.pdf';
        var testConfig = {
            polaroid: true,
            flip: false,
            flop: true,
        };
        var result = transform(storeAlias, testConfig);
        var expected = cdnUrl + "/" + session.apikey + "/polaroid/flop/" + storeAlias;
        assert.equal(result, expected);
    });
    it('should validate float ranges in options', function () {
        var testConfig = {
            detect_faces: {
                minsize: 0.2,
            },
        };
        var result = transform(url, testConfig);
        var expected = cdnUrl + "/detect_faces=minsize:0.2/" + url;
        assert.equal(result, expected);
    });
    it('should return base url with handle if there is empty transform option', function () {
        var testConfig = {
            polaroid: {},
        };
        var result = transform(url, testConfig);
        assert.equal(result, processURL + "/" + url);
    });
    describe('blackwhite', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                blackwhite: {
                    threshold: 100,
                },
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/blackwhite=threshold:100/" + url;
            assert.equal(result, expected);
        });
    });
    describe('crop', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                crop: {
                    dim: [0, 0, 200, 200],
                },
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/crop=dim:[0,0,200,200]/" + url;
            assert.equal(result, expected);
        });
    });
    describe('rotate', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                rotate: {
                    deg: 'exif',
                },
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/rotate=deg:exif/" + url;
            assert.equal(result, expected);
        });
    });
    describe('output', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                output: {
                    background: 'black',
                    density: 250,
                    compress: true,
                },
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/output=background:black,density:250,compress:true/" + url;
            assert.equal(result, expected);
        });
    });
    describe('cache', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                cache: false,
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/cache=false/" + url;
            assert.equal(result, expected);
            var testConfig2 = {
                cache: {
                    expiry: 12345,
                },
            };
            var result2 = transform(url, testConfig2);
            var expected2 = cdnUrl + "/cache=expiry:12345/" + url;
            assert.equal(result2, expected2);
        });
    });
    describe('compress', function () {
        it('should construct valid parameters', function () {
            var testConfig = {
                compress: true,
            };
            var result = transform(url, testConfig);
            var expected = cdnUrl + "/compress/" + url;
            assert.equal(result, expected);
        });
    });
});
