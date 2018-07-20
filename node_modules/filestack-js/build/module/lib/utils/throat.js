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
/**
 * @private
 */
var Delayed = /** @class */ (function () {
    function Delayed(resolve, fn, self, args) {
        this.resolve = resolve;
        this.fn = fn;
        this.self = self || null;
        this.args = args;
    }
    return Delayed;
}());
/**
 * @private
 */
var Queue = /** @class */ (function () {
    function Queue() {
        this._s1 = [];
        this._s2 = [];
    }
    Queue.prototype.push = function (value) {
        this._s1.push(value);
    };
    Queue.prototype.shift = function () {
        var s2 = this._s2;
        if (s2.length === 0) {
            var s1 = this._s1;
            if (s1.length === 0) {
                return;
            }
            this._s1 = s2;
            s2 = this._s2 = s1.reverse();
        }
        return s2.pop();
    };
    Queue.prototype.isEmpty = function () {
        return !this._s1.length && !this._s2.length;
    };
    return Queue;
}());
/**
 *
 * @private
 * @param size
 * @param fn
 */
export default function throat(size, fn) {
    var queue = new Queue();
    function run(fn, self, args) {
        if (size) {
            size--;
            var result = new Promise(function (resolve) {
                resolve(fn.apply(self, args));
            });
            result.then(release, release);
            return result;
        }
        else {
            return new Promise(function (resolve) {
                queue.push(new Delayed(resolve, fn, self, args));
            });
        }
    }
    function release() {
        size++;
        if (!queue.isEmpty()) {
            var next = queue.shift();
            next.resolve(run(next.fn, next.self, next.args));
        }
    }
    if (fn !== undefined && typeof fn !== 'function') {
        throw new TypeError('Expected throat fn to be a function but got ' + typeof fn);
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return run(fn, this, args);
    };
}
