/**
 *
 * @private
 * @param size
 * @param fn
 */
export default function throat(size: number, fn: any): (this: any, ...args: any[]) => Promise<{}>;
