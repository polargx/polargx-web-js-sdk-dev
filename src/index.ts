import APIService from "./APIService";
import getConfigs from "./configs";
import { PolarInitOptions, PolarCallback, PolarResponse, PolarError } from "./types/index";

const parseUrlData = () => {
    if (typeof window === 'undefined') {
        return { domain: '', slug: '', trackData: {
            unid: undefined,
            url: "",
            sdkUsed: undefined
        } };
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    let clickUrl = urlParams.get('__clurl') || '';
    if (!clickUrl.startsWith('http')) {
        clickUrl = `https://${clickUrl}`;
    }
  
    let domain = '';
    let slug = '';
    
    try {
        const url = new URL(clickUrl);
        const pathname = url.pathname;
        const parts = pathname.replace(/^\//, '').split('/');
        
        // Get slug from pathname
        slug = parts[0] || '';
        
        // Get domain from hostname (e.g., "dongo111" from "dongo111.webapp.ai")
        domain = url.hostname.split('.')[0] || '';
    } catch (error) {
            console.error('Failed to parse Click URL:', error);
    }
  
    const trackData = {
        unid: urlParams.get('__clid') || undefined,
        url: clickUrl,
        sdkUsed: urlParams.get('__clsdkused') || undefined
    };
  
    return { domain, slug, trackData };
};

export class PolarSDK {
    private apiKey: string | null;

    configs = getConfigs(false);
    apiService = new APIService(this.configs)

    static isDevelopmentEnabled = false
  
    constructor() {
        this.apiKey = null;
    }

    setDevelopmentMode() {
        this.configs = getConfigs(true)
        this.apiService = new APIService(this.configs)
    }
  
    async init(apiKey: string, options?: PolarInitOptions | undefined, callback?: PolarCallback) {
        try{
            this.apiKey = apiKey;
        
            const { domain, trackData, slug } = parseUrlData();
            if(!this.isPolarUrl(trackData.url)){
                return
            }
            const linkData = await this.apiService.getLinkData(domain || '', slug || '', apiKey)
            if (!linkData) {
                throw new Error('Failed to get link data');
            }

            const polarResponse: PolarResponse = {
                data_parsed: {
                    analytics_tags: linkData.data.sdkLinkData.analyticsTags,
                    ...linkData.data.sdkLinkData.data
                },
                session_id: generateSessionId(),
                identity_id: generateIdentityId(),
                link: linkData.data.sdkLinkData.url,
                slug: linkData.data.sdkLinkData.slug
            };

            if (typeof callback === 'function') {
                callback(null, polarResponse);
            }
        }catch (error) {
            console.error('Polar initialization error:', error);
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
function generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9);
}
  
function generateIdentityId(): string {
    return 'identity_' + Math.random().toString(36).substr(2, 9);
}
export default PolarSDK;
