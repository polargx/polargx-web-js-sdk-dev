import APIService from "./APIService";
import getConfigs, { Configs } from "./configs";
import { parsePolarParamsInQuery } from "./parser";
import { PolarInitOptions, PolarCallback, PolarResponse, PolarError } from "./types/index";



export class PolarSDK {
    private apiKey: string | null;

    configs!: Configs
    apiService!: APIService
    
    constructor() {
        this.apiKey = null;
    }
  
    async init(apiKey: string, options?: PolarInitOptions | undefined, callback?: PolarCallback) {
        try{
            let isDev = false
            let correctApiKey = apiKey
            if (apiKey.startsWith('dev_')) {
                isDev = true
                correctApiKey = apiKey.substring(4)
            }
            this.apiKey = correctApiKey;
            this.configs = getConfigs(isDev)
            this.apiService = new APIService(this.configs)
        
            const { domain, slug, clickUnid } = parsePolarParamsInQuery();
            if(!domain || !slug || !clickUnid){
                return
            }
            const linkData = await this.apiService.getLinkData(domain, slug, this.apiKey)
            if (!linkData?.data?.sdkLinkData) {
                throw new Error('Link is not found!');
            }

            await this.apiService.updateLinkClick(clickUnid, true, this.apiKey)

            const polarResponse = linkData.data.sdkLinkData as PolarResponse

            if (typeof callback === 'function') {
                callback(null, polarResponse);
            }
        }catch (error) {
            console.error('PolarSDK failed: ', error);
            console.trace('PolarSDK failed: ', error);
            if (typeof callback === 'function') {
                const polarError: PolarError = {
                    name: 'PolarError',
                    message: error instanceof Error ? error.message : 'Unknown error',
                    code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
                };
                callback(polarError, null);
            }
        }
    }

    isPolarUrl = (url: string): boolean => {
        const host = (new URL(url)).host
        var count = 0;
        this.configs.env.supportedBaseDomains.forEach((baseDomain) => {
            if (host.endsWith('.' + baseDomain)) {
                count++;
            }
        })
        return count > 0
    }
}

if (typeof window !== 'undefined') {
    (window as any).polarSDK = new PolarSDK();
}
  
function generateIdentityId(): string {
    return 'identity_' + Math.random().toString(36).substr(2, 9);
}
export default PolarSDK;

export {PolarCallback, PolarError, PolarInitOptions, PolarResponse} from './types/index'