import { ClientOptions, Session, StoreOptions } from '../client';
/**
 * @private
 */
export declare const PICKER_KEY = "__fs_picker_token";
/**
 * @private
 */
export declare class CloudClient {
    session: Session;
    cloudApiUrl: string;
    private cache;
    private _token;
    constructor(session: Session, options?: ClientOptions);
    token: string;
    prefetch(): any;
    list(clouds: any, token?: any): Promise<{}>;
    store(name: string, path: string, options?: StoreOptions, customSource?: any, token?: any): Promise<{}>;
    link(name: string, path: string, customSource?: any, token?: any): Promise<{}>;
    logout(name?: string): Promise<{}>;
    metadata(url: string): Promise<{}>;
    tokInit(type: string): Promise<{}>;
    tokStart(type: string, key: string, sessionId: string): Promise<{}>;
    tokStop(type: string, key: string, sessionId: string, archiveId: string): Promise<{}>;
}
