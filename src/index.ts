import { linkAttributionSDKService } from "./BEService";
import baseConfig from "./config";
import { BranchInitOptions, BranchCallback, BranchResponse, BranchError } from "./types/index";

const parseUrlData = () => {
    if (typeof window === 'undefined') {
        return { domain: '', slug: '', trackData: {
            unid: undefined,
            url: "",
            sdkUsed: undefined
        } };
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    let attributionUrl = urlParams.get('$linkattribution_url') || '';
    if (!attributionUrl.startsWith('http')) {
        attributionUrl = `https://${attributionUrl}`;
    }
  
    let domain = '';
    let slug = '';
    
    try {
        const url = new URL(attributionUrl);
        const pathname = url.pathname;
        const parts = pathname.replace(/^\//, '').split('/');
        
        // Get slug from pathname
        slug = parts[0] || '';
        
        // Get domain from hostname (e.g., "dongo111" from "dongo111.webapp.ai")
        domain = url.hostname.split('.')[0] || '';
        } catch (error) {
            console.error('Failed to parse attribution URL:', error);
    }
  
    const trackData = {
        unid: urlParams.get('$linkattribution_clickid') || undefined,
        url: attributionUrl,
        sdkUsed: urlParams.get('$linkattribution_used') || undefined
    };
  
    return { domain, slug, trackData };
};

const isLinkAttributionUrl = (url: string) => {
    return url.includes(".makelabs.ai")
}

export class LinkAttributionSDK {
    private baseUrl: string;
    private branchKey: string | null;
  
    constructor() {
        this.baseUrl = baseConfig.endpoint;
        this.branchKey = null;
    }
  
    setBaseUrl(url: string): void {
        this.baseUrl = url.replace(/\/$/, '');
    }
  
    async init(branchKey: string, options?: BranchInitOptions | undefined, callback?: BranchCallback) {
        try{
            this.branchKey = branchKey;
        
            const { domain, trackData, slug } = parseUrlData();
            if(!isLinkAttributionUrl(trackData.url)){
                throw new Error('Not a valid attribution URL');
            }
            const linkData = await linkAttributionSDKService.getLinkData(domain || '', slug || '', branchKey)
            if (!linkData) {
                throw new Error('Failed to get link data');
            }

            const branchResponse: BranchResponse = {
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
                callback(null, branchResponse);
            }
        }catch (error) {
            console.error('Branch initialization error:', error);
            if (typeof callback === 'function') {
                const branchError: BranchError = {
                    name: 'BranchError',
                    message: error instanceof Error ? error.message : 'Unknown error',
                    code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
                };
                callback(branchError, null);
            }
        }
    }
}

if (typeof window !== 'undefined') {
    (window as any).linkAttributionSdk = new LinkAttributionSDK();
}
function generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9);
}
  
function generateIdentityId(): string {
    return 'identity_' + Math.random().toString(36).substr(2, 9);
}
export default LinkAttributionSDK;
