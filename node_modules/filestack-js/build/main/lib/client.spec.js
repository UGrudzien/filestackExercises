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
var client_1 = require("./client");
describe('client', function () {
    it('should exist', function () {
        assert.ok(new client_1.Client('apikey'));
    });
    it('should throw exception when there is not api key provided', function () {
        assert.throws(function () { return new client_1.Client(''); });
    });
});
