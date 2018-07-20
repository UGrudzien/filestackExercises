/**
 * @private
 */
export interface Hosts {
    [url: string]: string;
    storeApiUrl: string;
    fileApiUrl: string;
    uploadApiUrl: string;
    cloudApiUrl: string;
    cdnUrl: string;
    processApiUrl: string;
    pickerUrl: string;
}
/**
 * @private
 */
export interface Config {
    urls: Hosts;
}
/**
 * @private
 */
export declare let config: Config;
