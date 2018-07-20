import throatImpl from './throat';
import { Session } from '../client';
export declare const throat: typeof throatImpl;
/**
 * Resolve cdn url based on handle type
 *
 * @private
 * @param session session object
 * @param handle file handle (hash, src://alias, url)
 */
export declare const resolveCdnUrl: (session: Session, handle: string) => string;
/**
 * Check config options
 *
 * @private
 * @param name
 * @param allowed
 * @param options
 */
export declare const checkOptions: (name: string, allowed: any, options?: any) => {};
/**
 * Removes empty options from object
 *
 * @private
 * @param obj
 */
export declare const removeEmpty: (obj: any) => any;
/**
 *
 * @private
 * @param fn
 * @param interval
 * @param callFirst
 */
export declare const throttle: (fn: any, interval: number, callFirst?: boolean) => (this: any, ...args: any[]) => any;
/**
 *
 * @private
 * @param start
 * @param stop
 * @param step
 */
export declare const range: (start: number, stop: number, step?: number) => any[];
