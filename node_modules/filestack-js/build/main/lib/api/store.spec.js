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
var store_1 = require("./store");
var session = ENV.session;
var secureSession = ENV.secureSession;
describe('storeURL', function storeFunc() {
    this.timeout(30000);
    it('should throw an error if no url is set', function () {
        assert.throws(function () { return store_1.storeURL(session); });
    });
    it('should support uppercase string options', function (done) {
        var options = { location: 'S3' };
        store_1.storeURL(session, ENV.urls.testImageUrl, options)
            .then(function (res) {
            assert.ok(res);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid url', function (done) {
        store_1.storeURL(session, ENV.urls.testImageUrl)
            .then(function (res) {
            assert.ok(res);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid url and security', function (done) {
        store_1.storeURL(secureSession, ENV.urls.testImageUrl)
            .then(function (res) {
            assert.ok(res);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should return the handle and mimetype as part of the response', function (done) {
        store_1.storeURL(session, ENV.urls.testImageUrl)
            .then(function (res) {
            assert.ok(res.handle);
            assert.equal(res.url.split('/').pop(), res.handle);
            assert.equal(res.mimetype, res.type);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should reject on request error', function (done) {
        var sessionCopy = JSON.parse(JSON.stringify(session));
        sessionCopy.urls.storeApiUrl = 'http://www.somebadurl.com';
        store_1.storeURL(sessionCopy, ENV.urls.testImageUrl)
            .then(function () {
            done(new Error('Success shouldnt be called'));
        })
            .catch(function (err) {
            assert.ok(err instanceof Error);
            done();
        });
    });
    it('should cancel request', function (done) {
        var token = {
            cancel: function () { return console.log('cancel not implemented'); },
        };
        setTimeout(function () {
            store_1.storeURL(session, ENV.urls.testImageUrl, {}, token)
                .then(function () {
                done(new Error('Success shouldnt be called'));
            })
                .catch(function (err) {
                assert.ok(err instanceof Error);
                done();
            });
        }, 10);
        setTimeout(function () { return token.cancel(); }, 12);
    });
});
