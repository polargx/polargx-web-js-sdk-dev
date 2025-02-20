import baseConfig from "./config.js";
class LinkAttributionSDKService {
    async getLinkData(domain, slug, branchKey) {
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
            const responseData = await response.json();
            return responseData;
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
