import { UploadOptions } from './types';
import { Security, Session, StoreOptions } from '../../client';
/**
 * User facing method to upload a single file
 * @private
 * @param session Session object that contains apikey
 * @param file A valid file path (in Node). In browsers a File, Blob, or base64 encoded string
 * @param options Configures the uploader
 * @param storeOptions Storage options for the backend
 * @param token Control token
 */
export declare const upload: (session: Session, fileOrString: any, options?: UploadOptions, storeOptions?: StoreOptions, token?: any, security?: Security) => Promise<any>;
