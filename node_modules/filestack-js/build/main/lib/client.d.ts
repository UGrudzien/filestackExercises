import { Hosts } from '../config';
import { MetadataOptions, RetrieveOptions } from './api/file';
import { TransformOptions } from './api/transform';
import { UploadOptions } from './api/upload';
import { PreviewOptions } from './api/preview';
import { PickerInstance, PickerOptions } from './picker';
export interface Session {
    apikey: string;
    urls: Hosts;
    cname?: string;
    policy?: string;
    signature?: string;
}
export interface Security {
    policy: string;
    signature: string;
}
export interface StoreOptions {
    /**
     * Filename for stored file
     */
    filename?: string;
    /**
     * Location for stored file. One of 's3', 'gcs', 'azure', 'rackspace', or 'dropbox'.
     */
    location?: string;
    /**
     * Set container path.
     */
    path?: string;
    /**
     * Specify S3 region.
     */
    region?: string;
    /**
     * Specify storage container.
     */
    container?: string;
    /**
     * S3 container access. 'public' or 'private'.
     */
    access?: string;
}
export interface ClientOptions {
    [option: string]: any;
    /**
     * Security object with policy and signature keys.
     * Can be used to limit client capabilities and protect public URLs.
     * It is intended to be used with server-side policy and signature generation.
     * Read about [security policies](https://www.filestack.com/docs/concepts/security).
     */
    security?: Security;
    /**
     * Domain to use for all URLs. __Requires the custom CNAME addon__.
     * If this is enabled then you must also set up your own OAuth applications
     * for each cloud source you wish to use in the picker.
     */
    cname?: string;
    /**
     * Enable/disable caching of the cloud session token. Default is false.
     * This ensures that users will be remembered on your domain when calling the cloud API from the browser.
     * Please be aware that tokens stored in localStorage are accessible by other scripts on the same domain.
     */
    sessionCache?: boolean;
}
/**
 * The Filestack client, the entry point for all public methods. Encapsulates session information.
 *
 * ### Example
 * ```js
 * // ES module
 * import * as filestack from 'filestack-js';
 * const client = filestack.init('apikey');
 * ```
 *
 * ```js
 * // UMD module in browser
 * <script src="https://static.filestackapi.com/filestack-js/1.x.x/filestack.min.js"></script>
 * const client = filestack.init('apikey');
 * ```
 */
export declare class Client {
    session: Session;
    private cloud;
    constructor(apikey: string, options?: ClientOptions);
    /**
     * Clear all current cloud sessions in the picker.
     * Optionally pass a cloud source name to only log out of that cloud source.
     * This essentially clears the OAuth authorization codes from the Filestack session.
     * @param name Optional cloud source name.
     */
    logout(name?: string): Promise<{}>;
    /**
     * Retrieve detailed data of stored files.
     *
     * ### Example
     *
     * ```js
     * client
     *   .metadata('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Metadata](https://www.filestack.com/docs/api/file#metadata).
     * @param handle Valid Filestack handle.
     * @param options Metadata fields to enable on response.
     * @param security Optional security override.
     */
    metadata(handle: string, options?: MetadataOptions, security?: Security): Promise<any>;
    /**
     * Construct a new picker instance.
     */
    picker(options?: PickerOptions): PickerInstance;
    /**
     * Used for viewing files via Filestack handles or storage aliases, __requires Document Viewer addon to your Filestack application__.
     * Opens document viewer in new window if id option is not provided.
     *
     * ### Example
     *
     * ```js
     * // <div id="preview"></div>
     *
     * client.preview('DCL5K46FS3OIxb5iuKby', { id: 'preview' });
     * ```
     * @param handle Valid Filestack handle.
     * @param options Preview options
     */
    preview(handle: string, options?: PreviewOptions): Window | HTMLIFrameElement;
    /**
     * Remove a file from storage and the Filestack system.
     *
     * __Requires a valid security policy and signature__. The policy and signature will be pulled from the client session, or it can be overridden with the security parameter.
     *
     * ### Example
     *
     * ```js
     * client
     *   .remove('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Delete](https://www.filestack.com/docs/api/file#delete)
     * @param handle Valid Filestack handle.
     * @param security Optional security override.
     */
    remove(handle: string, security?: Security): Promise<any>;
    /**
     * Remove a file **only** from the Filestack system. The file remains in storage.
     *
     * __Requires a valid security policy and signature__. The policy and signature will be pulled from the client session, or it can be overridden with the security parameter.
     *
     * ### Example
     *
     * ```js
     * client
     *   .removeMetadata('DCL5K46FS3OIxb5iuKby')
     *   .then((res) => {
     *     console.log(res);
     *   })
     *   .catch((err) => {
     *     console.log(err);
     *   }));
     * ```
     * @see [File API - Delete](https://www.filestack.com/docs/api/file#delete)
     * @param handle Valid Filestack handle.
     * @param security Optional security override.
     */
    removeMetadata(handle: string, security?: Security): Promise<any>;
    /**
     * Store a file from its URL.
     *
     * ### Example
     *
     * ```js
     * client
     *   .storeURL('https://d1wtqaffaaj63z.cloudfront.net/images/NY_199_E_of_Hammertown_2014.jpg')
     *   .then(res => console.log(res));
     * ```
     * @see [File API - Store](https://www.filestack.com/docs/api/file#store)
     * @param url       Valid URL to a file.
     * @param options   Configure file storage.
     * @param token     Optional control token to call .cancel()
     * @param security  Optional security override.
     */
    storeURL(url: string, options?: StoreOptions, token?: any, security?: Security): Promise<Object>;
    /**
     * Access files via their Filestack handles.
     *
     * If head option is provided - request headers are returned in promise
     * If metadata option is provided - metadata object is returned in promise
     * Otherwise file blob is returned
     * Metadata and head options cannot be mixed
     *
     * ### Example
     *
     * ```js
     * client.retrieve('fileHandle', {
     *  metadata: true,
     * }).then((response) => {
     *  console.log(response);
     * }).catch((err) => {
     *  console.error(err);
     * })
     * ```
     *
     * @see [File API - Download](https://www.filestack.com/docs/api/file#download)
     * @param handle    Valid file handle
     * @param options   RetrieveOptions
     * @param security  Optional security override.
     * @throws          Error
     */
    retrieve(handle: string, options?: RetrieveOptions, security?: Security): Promise<Object | Blob>;
    /**
     * Interface to the Filestack [Processing API](https://www.filestack.com/docs/api/processing).
     * Convert a URL, handle, or storage alias to another URL which links to the transformed file.
     * You can optionally store the returned URL with client.storeURL.
     *
     * Transform params can be provided in camelCase or snakeCase style ie: partial_pixelate or partialPixelate
     *
     * ### Example
     *
     * ```js
     * const transformedUrl = client.transform(url, {
     *   crop: {
     *     dim: [x, y, width, height],
     *   },
     *   vignette: {
     *     blurmode: 'gaussian',
     *     amount: 50,
     *   },
     *   flip: true,
     *   partial_pixelate: {
     *     objects: [[10, 20, 200, 250], [275, 91, 500, 557]],
     *   },
     * };
     *
     * // optionally store the new URL
     * client.storeURL(transformedUrl).then(res => console.log(res));
     * ```
     * @see [Filestack Processing API](https://www.filestack.com/docs/api/processing)
     * @param url     Valid URL (http(s)://), file handle, or storage alias (src://) to an image.
     * @param options Transformations are applied in the order specified by this object.
     * @returns       A new URL that points to the transformed resource.
     */
    transform(url: string, options: TransformOptions): string;
    /**
     * Initiates a multi-part upload flow. Use this for Filestack CIN and FII uploads.
     *
     * In Node runtimes the file argument is treated as a file path.
     * Uploading from a Node buffer is not yet implemented.
     *
     * ### Example
     *
     * ```js
     * const token = {};
     * const onRetry = (obj) => {
     *   console.log(`Retrying ${obj.location} for ${obj.filename}. Attempt ${obj.attempt} of 10.`);
     * };
     *
     * client.upload(file, { onRetry }, { filename: 'foobar.jpg' }, token)
     *   .then(res => console.log(res));
     *
     * token.pause();  // Pause flow
     * token.resume(); // Resume flow
     * token.cancel(); // Cancel flow (rejects)
     * ```
     * @param file           Must be a valid [File](https://developer.mozilla.org/en-US/docs/Web/API/File), Blob, base64 encoded string, or file path in Node.
     * @param uploadOptions  Uploader options.
     * @param storeOptions   Storage options.
     * @param token          A control token that can be used to call cancel(), pause(), and resume().
     * @param security       Optional security policy and signature override.
     *
     * @returns {Promise}
     */
    upload(file: any, options?: UploadOptions, storeOptions?: StoreOptions, token?: any, security?: Security): Promise<any>;
}
