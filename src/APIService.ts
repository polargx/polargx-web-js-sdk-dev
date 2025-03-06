import configs from "./configs.js";

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

class APIService {
    async getLinkData(domain: string, slug: string, apiKey: string): Promise<LinkResponse | undefined> {
        try {
            // Fix URL parameters format
            const url = new URL(`${configs.env.server}/sdk/v1/links/data`);
            url.searchParams.append('domain', domain);
            url.searchParams.append('slug', slug);

            const response = await fetch(url.toString(), {
                headers: {
                    "x-api-key": apiKey
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
const apiService = new APIService();

export { apiService };
export default APIService;