import { linkAttributionSDKService } from "./BEService";
import baseConfig from "./config";
export class LinkAttributionSDK {
    constructor() {
        this.baseUrl = baseConfig.endpoint;
        this.branchKey = null;
    }
 
    async init(branchKey, options, callback) {
        try {
            this.branchKey = branchKey;
            const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
            const domain = urlParams.get('domain') || '';
            const slug = urlParams.get('slug') || '';
            const linkData = await linkAttributionSDKService.getLinkData(urlParams.get('domain') || '', urlParams.get('slug') || '', branchKey);
            if (!linkData) {
                throw new Error('Failed to get link data');
            }
            const branchResponse = {
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
        }
        catch (error) {
            console.error('Branch initialization error:', error);
            if (typeof callback === 'function') {
                const branchError = {
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
    window.linkAttributionSdk = new LinkAttributionSDK();
}
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
}
function generateIdentityId() {
    return 'identity_' + Math.random().toString(36).substr(2, 9);
}
export default LinkAttributionSDK;
