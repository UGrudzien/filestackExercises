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
var sinon = require("sinon");
var preview_1 = require("./preview");
var session = ENV.session;
var secureSession = ENV.secureSession;
var filelink = ENV.filelink;
describe('preview', function () {
    var appendChildSpy;
    var createElementSpy;
    var documentSpy;
    var windowOpenSpy;
    beforeEach(function () {
        appendChildSpy = sinon.spy();
        createElementSpy = sinon.stub(document, 'createElement').returns({});
        documentSpy = sinon.stub(document, 'getElementById').returns({
            appendChild: appendChildSpy,
        });
        windowOpenSpy = sinon.stub(window, 'open');
    });
    afterEach(function () {
        createElementSpy.restore();
        windowOpenSpy.restore();
        documentSpy.restore();
    });
    it('should throw exception when handle is not provided', function () {
        assert.throws(function () { return preview_1.preview(session); });
    });
    it('should open window when no id specified', function () {
        preview_1.preview(session, filelink);
        assert.ok(windowOpenSpy.calledWith(session.urls.cdnUrl + "/preview/" + filelink, filelink));
    });
    it('should render to specified element', function () {
        preview_1.preview(session, filelink, {
            id: 'someId',
        });
        assert.ok(createElementSpy.calledWith('iframe'));
        assert.ok(documentSpy.calledWith('someId'));
        assert.ok(appendChildSpy.calledWith({
            src: session.urls.cdnUrl + "/preview/" + filelink,
            width: '100%',
            height: '100%',
        }));
    });
    it('should throw error when element with given id is not found', function () {
        documentSpy.restore();
        documentSpy = sinon.stub(document, 'getElementById').returns(undefined);
        assert.throws(function () { return preview_1.preview(session, filelink, {
            id: 'someId',
        }); });
    });
    it('should add api key to url when storage alias is passed', function () {
        var link = 'src:test';
        preview_1.preview(session, link);
        assert.ok(windowOpenSpy.calledWith(session.urls.cdnUrl + "/" + session.apikey + "/preview/" + link, link));
    });
    it('should work with security {signature, policy}', function () {
        preview_1.preview(secureSession, filelink);
        var urlSecure = "security=policy:" + secureSession.policy + ",signature:" + secureSession.signature;
        assert.ok(windowOpenSpy.calledWith(session.urls.cdnUrl + "/preview/" + urlSecure + "/" + filelink, filelink));
    });
});
