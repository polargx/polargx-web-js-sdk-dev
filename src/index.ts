import { linkAttributionSDKService } from "./BEService";
import baseConfig from "./config";

interface BranchInitOptions {
    baseUrl?: string;
    [key: string]: any;
}

interface BranchResponse {
    data_parsed?: {
      bp_action?: string;
      [key: string]: any;
    };
    session_id?: string;
    identity_id?: string;
    link?: string;
    [key: string]: any;
}

interface BranchError extends Error {
    code?: string;
    message: string;
}

type BranchCallback = (error: BranchError | null, data?: BranchResponse | null) => void;


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
        
            const urlParams = new URLSearchParams(
                typeof window !== 'undefined' ? window.location.search : ''
            );
            const domain = urlParams.get('domain') || '';
            const slug = urlParams.get('slug') || '';

            const linkData = await linkAttributionSDKService.getLinkData(urlParams.get('domain') || '', urlParams.get('slug') || '', branchKey)
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
