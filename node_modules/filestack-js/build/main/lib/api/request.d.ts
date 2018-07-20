import * as agent from 'superagent';
/**
 * @private
 */
export interface CustomReq extends agent.SuperAgentStatic {
    [method: string]: any;
}
/**
 *
 * @private
 * @param method
 * @param url
 */
declare const requestWithSource: (method: string, url: string) => CustomReq;
/**
 * @private
 */
declare const request: agent.SuperAgentStatic;
export { request, requestWithSource };
