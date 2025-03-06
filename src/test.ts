import ApiService from "./APIService.js";

const testFunction = (domain: string, slug: string, apiKey: string) => {
    const apiService = new ApiService();
    apiService.getLinkData(domain, slug, apiKey);
}

testFunction("do111", "ntri9pobreu" , "PfqwyccQmO5X6uOWZRHrBakLA7dvbEpP59xPuGcL")