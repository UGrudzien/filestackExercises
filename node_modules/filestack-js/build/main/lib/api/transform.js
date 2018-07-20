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
var t = require("tcomb-validation");
var index_1 = require("./../utils/index");
/**
 * @private
 */
var toSnakeCase = function (original) {
    var snakeCased = {};
    var keys = Object.keys(original);
    for (var i = 0; i < keys.length; i++) {
        var newKey = keys[i].split(/(?=[A-Z])/).join('_').toLowerCase();
        if (typeof original[keys[i]] === 'object'
            && !Array.isArray(original[keys[i]])) {
            snakeCased[newKey] = toSnakeCase(original[keys[i]]);
        }
        else {
            snakeCased[newKey] = original[keys[i]];
        }
    }
    return snakeCased;
};
/**
 * Align enum
 */
var EAlignOptions;
(function (EAlignOptions) {
    EAlignOptions["left"] = "left";
    EAlignOptions["right"] = "right";
    EAlignOptions["center"] = "center";
    EAlignOptions["bottom"] = "bottom";
    EAlignOptions["top"] = "top";
})(EAlignOptions = exports.EAlignOptions || (exports.EAlignOptions = {}));
/**
 * Align enum with faces option
 */
var EAlignFacesOptions;
(function (EAlignFacesOptions) {
    EAlignFacesOptions["left"] = "left";
    EAlignFacesOptions["right"] = "right";
    EAlignFacesOptions["center"] = "center";
    EAlignFacesOptions["bottom"] = "bottom";
    EAlignFacesOptions["top"] = "top";
    EAlignFacesOptions["faces"] = "faces";
})(EAlignFacesOptions = exports.EAlignFacesOptions || (exports.EAlignFacesOptions = {}));
/**
 * Fit enum
 */
var EFitOptions;
(function (EFitOptions) {
    EFitOptions["clip"] = "clip";
    EFitOptions["crop"] = "crop";
    EFitOptions["scale"] = "scale";
    EFitOptions["max"] = "max";
})(EFitOptions = exports.EFitOptions || (exports.EFitOptions = {}));
/**
 * Blur enum
 */
var EBlurMode;
(function (EBlurMode) {
    EBlurMode["linear"] = "linear";
    EBlurMode["gaussian"] = "gaussian";
})(EBlurMode = exports.EBlurMode || (exports.EBlurMode = {}));
/**
 * Shapes enum
 */
var EShapeType;
(function (EShapeType) {
    EShapeType["oval"] = "oval";
    EShapeType["rect"] = "rect";
})(EShapeType = exports.EShapeType || (exports.EShapeType = {}));
/**
 * Noise type enum
 */
var ENoiseType;
(function (ENoiseType) {
    ENoiseType["none"] = "none";
    ENoiseType["low"] = "low";
    ENoiseType["medium"] = "medium";
    ENoiseType["high"] = "high";
})(ENoiseType = exports.ENoiseType || (exports.ENoiseType = {}));
/**
 * Style type enum
 */
var EStyleType;
(function (EStyleType) {
    EStyleType["artwork"] = "artwork";
    EStyleType["photo"] = "photo";
})(EStyleType = exports.EStyleType || (exports.EStyleType = {}));
/**
 * Color space enum
 */
var EColorspaceType;
(function (EColorspaceType) {
    EColorspaceType["RGB"] = "RGB";
    EColorspaceType["CMYK"] = "CMYK";
    EColorspaceType["Input"] = "Input";
})(EColorspaceType = exports.EColorspaceType || (exports.EColorspaceType = {}));
/**
 * Crop faces options enum
 */
var ECropfacesType;
(function (ECropfacesType) {
    ECropfacesType["thumb"] = "thumb";
    ECropfacesType["crop"] = "crop";
    ECropfacesType["fill"] = "fill";
})(ECropfacesType = exports.ECropfacesType || (exports.ECropfacesType = {}));
/**
 * Convert to format
 */
var EVideoTypes;
(function (EVideoTypes) {
    EVideoTypes["h264"] = "h264";
    EVideoTypes["h264_hi"] = "h264.hi";
    EVideoTypes["webm"] = "webm";
    EVideoTypes["webm-hi"] = "webm.hi";
    EVideoTypes["ogg"] = "ogg";
    EVideoTypes["ogg-hi"] = "ogg.hi";
    EVideoTypes["hls-variant"] = "hls.variant";
    EVideoTypes["mp3"] = "mp3";
    EVideoTypes["oga"] = "oga";
    EVideoTypes["m4a"] = "m4a";
    EVideoTypes["aac"] = "aac";
    EVideoTypes["hls"] = "hls.variant.audio";
})(EVideoTypes = exports.EVideoTypes || (exports.EVideoTypes = {}));
/**
 * Video storage location
 */
var EVideoLocations;
(function (EVideoLocations) {
    EVideoLocations["s3"] = "s3";
    EVideoLocations["azure"] = "azure";
    EVideoLocations["gcs"] = "gcs";
    EVideoLocations["rackspace"] = "rackspace";
    EVideoLocations["dropbox"] = "dropbox";
})(EVideoLocations = exports.EVideoLocations || (exports.EVideoLocations = {}));
var EVideoAccess;
(function (EVideoAccess) {
    EVideoAccess["private"] = "private";
    EVideoAccess["public"] = "public";
})(EVideoAccess = exports.EVideoAccess || (exports.EVideoAccess = {}));
var EVideoAccessMode;
(function (EVideoAccessMode) {
    EVideoAccessMode["preserve"] = "preserve";
    EVideoAccessMode["constrain"] = "constrain";
    EVideoAccessMode["letterbox"] = "letterbox";
    EVideoAccessMode["pad"] = "pad";
    EVideoAccessMode["crop"] = "crop";
})(EVideoAccessMode = exports.EVideoAccessMode || (exports.EVideoAccessMode = {}));
// ===== Custom Validators =====
/**
 * @private
 */
var vRange = function (start, end) {
    var validator = t.refinement(t.Integer, function (n) { return n >= start && n <= end; });
    validator['displayName'] = "Value is not in allowed range(" + start + "-" + end + ")";
    return validator;
};
/**
 * @private
 */
var vFloat = function () {
    return t.refinement(t.Number, function (n) { return n > 0 && n < 1; });
};
/**
 * @private
 */
var vFloatOrRange = function (start, end) {
    return t.union([vFloat(), vRange(start, end)]);
};
/**
 * @private
 */
var vNumberOrAll = function () {
    return t.union([t.Integer, t.enums.of('all')]);
};
/**
 * @private
 */
var vAlignment = t.enums.of('top left right bottom center');
/**
 * @private
 */
var vBlurMode = t.enums.of('linear gaussian');
/**
 * @private
 */
var vColor = t.String;
/**
 * @private
 */
var vRotate = t.union([t.enums.of('exif'), vRange(1, 359)]);
/**
 * @private
 */
var vShapeType = t.enums.of('rect oval');
/**
 * @private
 */
var vFit = t.enums.of('clip crop scale max');
/**
 * @private
 */
var vColorspace = t.enums.of('RGB CMYK Input');
/**
 * @private
 */
var vCropfaces = t.enums.of('thumb crop fill');
/**
 * @private
 * Apply tcomb validators to object
 *
 * @private
 * @param validators
 * @param canBeBoolean
 * @param maybe
 */
var applySchemaValidators = function (validators, canBeBoolean, maybe) {
    if (canBeBoolean === void 0) { canBeBoolean = false; }
    if (maybe === void 0) { maybe = false; }
    // single validator
    if (typeof validators === 'function') {
        return maybe ? t.maybe(validators) : validators;
    }
    var defaultValidators = t.struct(validators);
    if (!canBeBoolean) {
        return maybe ? t.maybe(defaultValidators) : defaultValidators;
    }
    var vBoolean = t.Boolean;
    var isValid = t.union([vBoolean, defaultValidators], 'canBeBoolean');
    isValid.dispatch = function (x) {
        return (typeof x === 'boolean') ? vBoolean : defaultValidators;
    };
    return maybe ? t.maybe(isValid) : isValid;
};
/**
 * Convert custom schema for tcomb-validation with maybe function (not required param)
 *
 * @private
 * @param schema
 */
var toTcombSchema = function (schema) {
    var result = {};
    if (!Array.isArray(schema) && typeof schema === 'object') {
        Object.keys(schema).map(function (key) {
            result[key] = t.maybe(schema[key]);
        });
        return result;
    }
    schema.forEach(function (el) {
        if (el.props) {
            result[el.name] = applySchemaValidators(toTcombSchema(el.props), el.canBeBoolean, !el.required);
            return;
        }
        result[el.name] = applySchemaValidators(el.validator, el.canBeBoolean, !el.required);
    });
    return t.struct(result);
};
/**
 * @private
 */
var validationSchema = [
    {
        name: 'flip',
        validator: t.Boolean,
    }, {
        name: 'compress',
        validator: t.Boolean,
    }, {
        name: 'flop',
        validator: t.Boolean,
    }, {
        name: 'tags',
        validator: t.Boolean,
    }, {
        name: 'sfw',
        validator: t.Boolean,
    }, {
        name: 'monochrome',
        validator: t.Boolean,
    }, {
        name: 'enhance',
        validator: t.Boolean,
    }, {
        name: 'redeye',
        validator: t.Boolean,
    }, {
        name: 'negative',
        validator: t.Boolean,
    }, {
        name: 'resize',
        props: {
            width: t.Integer,
            height: t.Integer,
            fit: vFit,
            align: vAlignment,
        },
    }, {
        name: 'crop',
        props: {
            dim: t.tuple([t.Integer, t.Integer, t.Integer, t.Integer]),
        },
    }, {
        name: 'resize',
        props: {
            width: t.Integer,
            height: t.Integer,
            fit: vFit,
            align: vAlignment,
        },
    }, {
        name: 'rotate',
        props: {
            deg: vRotate,
            colour: vColor,
            background: vColor,
        },
    }, {
        name: 'rounded_corners',
        canBeBoolean: true,
        props: {
            radius: vRange(1, 10000),
            blur: vRange(0, 20),
            background: vColor,
        },
    }, {
        name: 'vignette',
        props: {
            amount: vRange(0, 100),
            blurmode: vBlurMode,
            background: vColor,
        },
    }, {
        name: 'polaroid',
        canBeBoolean: true,
        props: {
            color: vColor,
            rotate: vRotate,
            background: vColor,
        },
    }, {
        name: 'torn_edges',
        canBeBoolean: true,
        props: {
            spread: t.tuple([vRange(1, 10000), vRange(1, 10000)]),
            background: vColor,
        },
    }, {
        name: 'shadow',
        canBeBoolean: true,
        props: {
            blur: vRange(0, 20),
            opacity: vRange(0, 100),
            vector: t.tuple([vRange(-1000, 1000), vRange(-1000, 1000)]),
            color: vColor,
            background: vColor,
        },
    }, {
        name: 'circle',
        canBeBoolean: true,
        props: {
            background: vColor,
        },
    }, {
        name: 'border',
        canBeBoolean: true,
        props: {
            width: vRange(1, 1000),
            color: vColor,
            background: vColor,
        },
    }, {
        name: 'sharpen',
        canBeBoolean: true,
        props: {
            amount: vRange(1, 20),
        },
    }, {
        name: 'blackwhite',
        canBeBoolean: true,
        props: {
            threshold: vRange(0, 100),
        },
    }, {
        name: 'blur',
        canBeBoolean: true,
        props: [{
                name: 'amount',
                validator: vRange(2, 20),
                required: true,
            }],
    }, {
        name: 'sepia',
        canBeBoolean: true,
        props: {
            tone: vRange(1, 100),
        },
    }, {
        name: 'pixelate',
        canBeBoolean: true,
        props: [{
                name: 'amount',
                validator: vRange(2, 100),
                required: true,
            }],
    }, {
        name: 'oil_paint',
        canBeBoolean: true,
        props: {
            amount: vRange(1, 10),
        },
    }, {
        name: 'modulate',
        canBeBoolean: true,
        props: {
            brightness: vRange(0, 10000),
            hue: vRange(0, 359),
            saturation: vRange(0, 10000),
        },
    }, {
        name: 'partial_pixelate',
        props: {
            amount: vRange(2, 100),
            blur: vRange(0, 20),
            type: vShapeType,
            objects: t.list(t.tuple([t.Integer, t.Integer, t.Integer, t.Integer])),
        },
    }, {
        name: 'partial_blur',
        props: {
            amount: vRange(2, 100),
            blur: vRange(0, 20),
            type: vShapeType,
            objects: t.list(t.tuple([t.Integer, t.Integer, t.Integer, t.Integer])),
        },
    }, {
        name: 'collage',
        props: {
            files: t.list(t.String),
            margin: t.Integer,
            width: t.Integer,
            height: t.Integer,
            color: vColor,
            fit: vFit,
            autorotate: t.Boolean,
        },
    }, {
        name: 'upscale',
        canBeBoolean: true,
        props: {
            upscale: t.Boolean,
            noise: t.enums.of('none low medium high'),
            style: t.enums.of('artwork photo'),
        },
    }, {
        name: 'ascii',
        canBeBoolean: true,
        props: {
            background: vColor,
            foreground: vColor,
            colored: t.Boolean,
            size: vRange(10, 100),
            reverse: t.Boolean,
        },
    }, {
        name: 'quality',
        props: {
            value: t.Number,
        },
    }, {
        name: 'security',
        props: {
            policy: t.String,
            signature: t.String,
        },
    }, {
        name: 'cache',
        canBeBoolean: true,
        props: {
            cache: t.Boolean,
            expiry: t.Integer,
        },
    }, {
        name: 'output',
        props: {
            format: t.String,
            colorspace: vColorspace,
            strip: t.Boolean,
            quality: vRange(1, 100),
            page: vRange(1, 10000),
            compress: t.Boolean,
            density: vRange(1, 500),
            background: vColor,
            secure: t.Boolean,
            docinfo: t.Boolean,
            pageformat: t.enums.of('a3 A3 a4 A4 a5 A5 b4 B4 b5 B5 letter legal tabloid'),
            pageorientation: t.enums.of('portrait landscape'),
        },
    }, {
        name: 'crop_faces',
        props: {
            mode: vCropfaces,
            width: t.Integer,
            height: t.Integer,
            faces: vNumberOrAll(),
            buffer: t.Integer,
        },
    }, {
        name: 'detect_faces',
        canBeBoolean: true,
        props: {
            minsize: vFloatOrRange(0, 10000),
            maxsize: vFloatOrRange(0, 10000),
            color: vColor,
            export: t.Boolean,
        },
    }, {
        name: 'pixelate_faces',
        props: {
            faces: vNumberOrAll(),
            minsize: vFloatOrRange(0, 10000),
            maxsize: vFloatOrRange(0, 10000),
            buffer: vRange(0, 1000),
            amount: vRange(2, 100),
            blur: vRange(0, 20),
            type: vShapeType,
        },
    }, {
        name: 'blur_faces',
        props: {
            faces: vNumberOrAll(),
            minsize: vFloatOrRange(0, 10000),
            maxsize: vFloatOrRange(0, 10000),
            buffer: vRange(0, 1000),
            amount: vRange(2, 100),
            blur: vRange(0, 20),
            type: vShapeType,
        },
    }, {
        name: 'video_convert',
        props: {
            preset: t.enums.of('h264 h264.hi webm webm.hi ogg ogg.hi hls.variant mp3 oga m4a aac hls.variant.audio'),
            force: t.Boolean,
            title: t.String,
            extname: t.String,
            filename: t.String,
            location: t.enums.of('S3 s3 azure gcs rackspace dropbox'),
            path: t.String,
            access: t.enums.of('private public'),
            container: t.String,
            audio_bitrate: vRange(0, 999),
            video_bitrate: vRange(1, 5000),
            audio_sample_rate: vRange(0, 99999),
            audio_channels: vRange(1, 12),
            upscale: t.Boolean,
            aspect_mode: t.enums.of('preserve constrain letterbox pad crop'),
            clip_length: t.String,
            clip_offset: t.String,
            width: t.Number,
            height: t.Number,
            two_pass: t.Boolean,
            fps: vRange(1, 300),
            keyframe_interval: vRange(1, 300),
            watermark_url: t.String,
            watermark_top: t.Number,
            watermark_bottom: t.Number,
            watermark_right: t.Number,
            watermark_left: t.Number,
            watermark_width: t.Number,
            watermark_height: t.Number,
        },
    },
];
/**
 * Converts nested arrays to string
 *
 * @private
 * @example [1,2, [2,3]] => "[1,2, [2,3]]"
 * @param arr - any array
 */
var arrayToString = function (arr) {
    var toReturn = arr.map(function (el) {
        if (Array.isArray(el)) {
            return arrayToString(el);
        }
        return el;
    });
    return "[" + toReturn + "]";
};
/**
 * Flatten transformation option to string
 *
 * @private
 * @example {resize:{width: 100,height: 200}} => resize=width:100,height:200
 * @param key - option key
 * @param values - option params
 */
var optionToString = function (key, values) {
    var optionsString = [];
    // if we just want to enable feature
    if (typeof values === 'boolean') {
        if (!values && key === 'cache') {
            return key + "=false";
        }
        if (!values) {
            return '';
        }
        return key;
    }
    if (typeof values === 'object' && !Object.keys(values).length) {
        return '';
    }
    Object.keys(values).forEach(function (i) {
        if (Array.isArray(values[i])) {
            optionsString.push(i + ":" + arrayToString(values[i]));
            return;
        }
        optionsString.push(i + ":" + values[i]);
    });
    return key + "=" + optionsString.join(',');
};
/**
 * Creates filestack transform url.
 * Transform params can be provided in camelCase or snakeCase style
 *
 * @example
 * ```js
 * // camelCase
 * console.log(transform(session, {
 *    partialPixelate: {
 *      objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
 *    },
 *  }, 'testfile'));
 * ```
 * result => https://cdn.filestackcontent.com/partial_pixelate=objects:[[10,20,200,250],[275,91,500,557]]/testfile
 *
 * ```js
 * // snakeCase
 * console.log(transform(session, {
 *    partial_pixelate: {
 *      objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
 *    },
 *  }, 'testfile'));
 * ```
 * result => https://cdn.filestackcontent.com/partial_pixelate=objects:[[10,20,200,250],[275,91,500,557]]/testfile
 *
 * @private
 * @throws Error
 * @param options Transformation options
 */
exports.transform = function (session, url, options) {
    if (options === void 0) { options = {}; }
    options = toSnakeCase(options);
    // strict will not allow additional params
    var validate = t.validate(options, toTcombSchema(validationSchema), { strict: true });
    if (!validate.isValid()) {
        var firstError = validate.firstError();
        throw new Error("Wrong options provided: " + (firstError ? firstError.message : 'unknown'));
    }
    var transformsArray = [];
    if (session.policy && session.signature) {
        options.security = {
            policy: session.policy,
            signature: session.signature,
        };
    }
    Object.keys(options).forEach(function (key) {
        transformsArray.push(optionToString(key, options[key]));
    });
    // remove empty transform entries
    transformsArray = transformsArray.filter(function (val) {
        return val.length;
    });
    // See URL format: https://www.filestack.com/docs/image-transformations
    var baseURL = index_1.resolveCdnUrl(session, url);
    if (!transformsArray.length) {
        return baseURL + "/" + url;
    }
    var transformString = transformsArray.join('/');
    return baseURL + "/" + transformString + "/" + url;
};
