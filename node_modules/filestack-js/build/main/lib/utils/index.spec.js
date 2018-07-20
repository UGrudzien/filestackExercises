"use strict";
/*
 * Copyright (c) 2018 by Filestack.
 * Some rights reserved.
 *
 * Original implementation of throat by Forbes Lindesay
 * https://github.com/ForbesLindesay/throat
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
var t = require("tcomb-validation");
var index_1 = require("./index");
var session = ENV.session;
describe('resolveCdnUrl', function () {
    it('should return cdnUrl without handle', function () {
        assert.equal(index_1.resolveCdnUrl(session, ''), 'https://process-stage.filestackapi.com');
    });
    it('should throw exception when using http or src handle and there is no apiKey', function () {
        var sessionClone = JSON.parse(JSON.stringify(session));
        delete sessionClone.apikey;
        assert.throws(function () { return index_1.resolveCdnUrl(sessionClone, 'http://test.com'); });
        assert.throws(function () { return index_1.resolveCdnUrl(sessionClone, 'src://test.com'); });
    });
});
describe('checkOptions', function () {
    it('should throw exception when wrong option is provided', function () {
        var allowed = [
            { name: 'test', type: t.Boolean },
        ];
        var options = {
            notAllowed: 123,
        };
        assert.throws(function () { return index_1.checkOptions('retrieveOptions', allowed, options); });
    });
    it('should throw exception when wrong option value is provided', function () {
        var allowed = [
            { name: 'test', type: t.Boolean },
        ];
        var options = {
            test: 123,
        };
        assert.throws(function () { return index_1.checkOptions('retrieveOptions', allowed, options); });
    });
});
describe('removeEmpty', function () {
    it('should remove empty values from object', function () {
        var testObj = {
            test: 123,
            empty: null,
        };
        assert.equal(JSON.stringify(index_1.removeEmpty(testObj)), JSON.stringify({ test: 123, }));
    });
});
