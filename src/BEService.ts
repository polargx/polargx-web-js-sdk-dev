import baseConfig from "./config.js";

interface AnalyticsTags {
    campaign: string;
    channel: string;
    feature: string;
    tags: string;
}

interface SocialMediaTags {
    description: string;
    title: string;
}

interface AdditionalData {
    [key: string]: string;  // For dynamic properties
}

interface SdkLinkData {
    analyticsTags: AnalyticsTags;
    data: AdditionalData;
    slug: string;
    socialMediaTags: SocialMediaTags;
    url: string;
}

export interface LinkResponse {
    data: {
        sdkLinkData: SdkLinkData;
    };
}

class LinkAttributionSDKService {
    async getLinkData(domain: string, slug: string, branchKey: string): Promise<LinkResponse | undefined> {
        try {
            // Fix URL parameters format
            const url = new URL(`${baseConfig.endpoint}/sdk/v1/links/data`);
            url.searchParams.append('domain', domain);
            url.searchParams.append('slug', slug);

            const response = await fetch(url.toString(), {
                headers: {
                    "x-api-key": branchKey
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Await the JSON parsing
            const responseData: LinkResponse = await response.json();
            return responseData
        }
        catch (err) {
            console.error('getLinkData error:', err);
            return undefined;
        }
    }
}

// Create singleton instance
const linkAttributionSDKService = new LinkAttributionSDKService();

export { linkAttributionSDKService };
export default LinkAttributionSDKService;