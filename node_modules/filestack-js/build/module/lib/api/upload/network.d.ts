import { Context, PartObj, UploadConfig } from './types';
/**
 * @private
 */
export declare const getHost: (host?: string) => string;
/**
 * @private
 */
export declare const getLocationURL: (url: string) => string;
/**
 * Generates multi-part fields for all requests
 * @private
 * @param fields  Object containing form data keys
 * @param config  Upload config
 */
export declare const getFormData: (fields: any, { store }: UploadConfig) => {};
/**
 * Starts the multi-part upload flow (/multipart/start)
 * @private
 * @param file    Valid File instance
 * @param config  Upload config
 * @returns {Promise}
 */
export declare const start: ({ config, file }: Context) => Promise<any>;
/**
 * Gets the S3 upload params for current part (/multipart/upload)
 * @private
 * @param startParams   Parameters returned from start call
 * @param partNumber    Current part number (1 - 10000)
 * @param size          Size of current part in bytes
 * @param md5           MD5 hash of part
 * @param config        Upload config
 * @param offset        Current offset if chunking a part.
 */
export declare const getS3PartData: (part: PartObj, { config, params }: Context) => Promise<any>;
/**
 * Uploads bytes directly to S3 with HTTP PUT
 * @private
 * @param part        ArrayBuffer with part data
 * @param params      Params for this part returned by getS3PartData response
 * @param onProgress  A function to be called on progress event for this part
 * @param config
 */
export declare const uploadToS3: (part: ArrayBuffer, params: any, onProgress: any, cfg: UploadConfig) => Promise<any>;
/**
 * Completes upload flow (/multipart/complete)
 * @private
 * @param file          File being uploaded
 * @param etags         An array of etags from each S3 part
 * @param startParams   Parameters returned from start call
 * @param config        Upload config
 */
export declare const complete: (etags: string, { config, file, params }: Context) => Promise<any>;
