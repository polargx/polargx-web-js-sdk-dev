import { Configs } from "./configs.js";

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
    configs: Configs

    constructor(configs: Configs) {
        this.configs = configs
    }

    async getLinkData(domain: string, slug: string, apiKey: string): Promise<LinkResponse | undefined> {
        // Fix URL parameters format
        const url = new URL(`${this.configs.env.server}/api/v1/links/resolve`);
        url.searchParams.append('domain', domain);
        url.searchParams.append('slug', slug);

        const response = await fetch(url.toString(), {
            method: "GET",
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

    async updateLinkClick(clickUnid: string, sdkUsed: boolean, apiKey: string): Promise<undefined> {
        // Fix URL parameters format
        const url = new URL(`${this.configs.env.server}/api/v1/links/clicks/${clickUnid}`);
        const response = await fetch(url.toString(), {
            method: "PUT",
            headers: {
                "x-api-key": apiKey
            },
            body: JSON.stringify({
                SdkUsed: sdkUsed
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
}

export default APIService;