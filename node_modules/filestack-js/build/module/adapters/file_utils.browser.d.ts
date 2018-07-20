import { Context, PartObj } from '../lib/api/upload/types';
/**
 * Reads a slice of a file based on the current part.
 * @private
 */
export declare const getPart: (part: PartObj, ctx: Context) => Promise<{
    buffer: any;
    size: any;
    md5: string;
    chunks: any[];
    chunkSize: number;
    intelligentOverride: boolean;
    loaded: number;
    number: number;
    request: any;
    offset?: number;
}>;
/**
 * Get a Blob from a File or string.
 * @private
 */
export declare const getFile: (fileOrString: any) => Promise<Blob>;
/**
 * This is a noop in browsers
 */
export declare const closeFile: () => any;
