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
var cloud_1 = require("./cloud");
var session = ENV.cloudSession;
var secureSession = ENV.secureCloudSession;
var mockClouds = {
    facebook: {
        path: '/',
    },
};
describe.skip('cloud', function cloud() {
    this.timeout(60000);
    it('should construct an instance of CloudClient', function () {
        var client = new cloud_1.CloudClient(session);
        assert.ok(client.session = session);
        assert.ok(client instanceof cloud_1.CloudClient);
    });
    it('should call prefetch for application profile', function (done) {
        var client = new cloud_1.CloudClient(session);
        client.prefetch()
            .then(function (res) {
            assert.ok(res);
            assert.ok(res.whitelabel);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should call list with security', function (done) {
        var client = new cloud_1.CloudClient(secureSession);
        client.list(mockClouds)
            .then(function (res) {
            assert.ok(res);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
    it('should save token if sessionCache is true -- BROWSER ONLY', function (done) {
        var client = new cloud_1.CloudClient(session, { sessionCache: true });
        client.list(mockClouds)
            .then(function (res) {
            assert.ok(res);
            var cached = localStorage.getItem(cloud_1.PICKER_KEY);
            assert.ok(cached === res.token);
            done();
        })
            .catch(function (err) {
            done(err);
        });
    });
});
