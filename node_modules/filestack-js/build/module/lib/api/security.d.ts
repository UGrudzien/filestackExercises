import { Security } from '../client';
/**
 * Configures a security policy
 *
 * @see https://www.filestack.com/docs/concepts/security
 */
export interface SecurityOptions {
    expiry?: number;
    call?: any[];
    handle?: string;
    url?: string;
    maxSize?: number;
    minSize?: number;
    path?: string;
    container?: string;
}
/**
 * Returns Filestack base64 policy and HMAC-SHA256 signature
 *
 * ### Example
 *
 * ```js
 * import * as filestack from 'filestack-js';
 *
 * const jsonPolicy = { 'expiry': 253381964415 };
 * const security = filestack.getSecurity(jsonPolicy, '<YOUR_APP_SECRET>');
 * ```
 *
 * @param policyOptions
 * @param appSecret
 */
export declare const getSecurity: (policyOptions: SecurityOptions, appSecret: string) => Security;
