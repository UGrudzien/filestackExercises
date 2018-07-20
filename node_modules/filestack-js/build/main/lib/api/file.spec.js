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
var file_1 = require("./file");
var store_1 = require("./store");
var session = ENV.session;
var secureSession = ENV.secureSession;
var filelink = ENV.filelink;
var secureFilelink = ENV.secureFilelink;
describe('metadata', function metadataFunc() {
    this.timeout(60000);
    it('should throw an error if no handle is set', function () {
        assert.throws(function () { return file_1.metadata(session); });
    });
    it('should get an ok response with a valid handle', function (done) {
        file_1.metadata(session, filelink)
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid handle and options', function (done) {
        file_1.metadata(session, filelink, { md5: true, sourceUrl: true })
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid secure handle and options', function (done) {
        file_1.metadata(secureSession, secureFilelink)
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should call promise catch with error', function (done) {
        var sessionClone = JSON.parse(JSON.stringify(session));
        sessionClone.urls.fileApiUrl = 'http://www.somebadurl.com';
        file_1.metadata(sessionClone, filelink)
            .then(function () {
            done(new Error('Request passed'));
        })
            .catch(function (err) {
            assert.ok(err instanceof Error);
            done();
        });
    });
});
describe('retrieve', function metadataFunc() {
    this.timeout(60000);
    it('should throw an error if no handle is set', function () {
        assert.throws(function () { return file_1.retrieve(session, ''); });
    });
    it('should throw an error metadata and head options are provided', function () {
        assert.throws(function () { return file_1.retrieve(session, filelink, {
            metadata: true,
            head: true,
        }); });
    });
    it('should get an ok response with a valid handle', function (done) {
        file_1.retrieve(session, filelink)
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid handle and options', function (done) {
        file_1.retrieve(session, filelink, { metadata: true })
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a valid secure handle and options', function (done) {
        file_1.retrieve(secureSession, secureFilelink, { metadata: true })
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a head option', function (done) {
        file_1.retrieve(session, filelink, { head: true })
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response with a extension option', function (done) {
        file_1.retrieve(session, filelink, { extension: 'someextension.txt' })
            .then(function (result) {
            assert.ok(result);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should call promise catch with error', function (done) {
        var sessionClone = JSON.parse(JSON.stringify(session));
        sessionClone.urls.fileApiUrl = 'somebadurl';
        file_1.retrieve(sessionClone, filelink, { extension: 'someextension.txt' })
            .then(function () {
            done(new Error('Request passed'));
        })
            .catch(function (err) {
            assert.ok(err instanceof Error);
            done();
        });
    });
});
describe('remove', function removeFunc() {
    this.timeout(60000);
    it('should throw an error if no handle is set', function () {
        assert.throws(function () { return file_1.remove(secureSession); });
    });
    it('should throw an error if client is not secured', function () {
        assert.throws(function () { return file_1.remove(session, 'fakehandle'); });
    });
    it('should get an ok response with a valid handle', function (done) {
        // have to create a file before we can test deleting it
        store_1.storeURL(secureSession, ENV.urls.testImageUrl)
            .then(function (res) {
            var handle = res.handle;
            file_1.remove(secureSession, handle)
                .then(function (result) {
                assert.equal(result.statusCode, 200);
                done();
            })
                .catch(function (err) {
                done(err);
            });
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should get an ok response when skip_storage is true', function (done) {
        // have to create a file before we can test deleting it
        store_1.storeURL(secureSession, ENV.urls.testImageUrl)
            .then(function (res) {
            var handle = res.handle;
            file_1.remove(secureSession, handle, true)
                .then(function (result) {
                assert.equal(result.statusCode, 200);
                done();
            })
                .catch(function (err) {
                done(err);
            });
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should call promise catch with error', function (done) {
        var sessionClone = JSON.parse(JSON.stringify(secureSession));
        sessionClone.urls.fileApiUrl = 'somebadurl';
        store_1.storeURL(secureSession, ENV.urls.testImageUrl)
            .then(function (res) {
            var handle = res.handle;
            file_1.remove(sessionClone, handle)
                .then(function () {
                done(new Error('Request passed'));
            })
                .catch(function (err) {
                assert.ok(err instanceof Error);
                done();
            });
        })
            .catch(function (err) {
            done(err);
        });
    });
});
