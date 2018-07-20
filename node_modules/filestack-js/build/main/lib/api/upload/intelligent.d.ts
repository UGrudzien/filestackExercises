import { PartObj, Context } from './types';
/**
 * Slice a part into smaller chunks
 * @private
 * @param part  Part buffer to slice.
 * @param size  Size of slices.
 * @returns     List of chunks.
 */
export declare const slicePartIntoChunks: (part: PartObj, size: number) => any[];
/**
 * Get chunk (of part) metadata and PUT chunk to S3
 * @private
 * @param chunk Chunk object, has offset information
 * @param startParams Parameters returned from start call
 * @param config Upload config
 * @returns {Promise}
 */
export declare const uploadChunk: (chunk: any, ctx: Context) => Promise<any>;
/**
 * Commits single part (/commit) for intelligent ingestion (only called after all chunks have been uploaded)
 * @private
 * @param file        File being uploaded
 * @param part        Part object
 * @param startParams Parameters returned from start call
 * @param config      Upload config
 * @returns {Promise}
 */
export declare const commitPart: (part: PartObj, ctx: Context) => Promise<any>;
