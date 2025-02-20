import LinkAttributionSDKService from "./BEService.js";
const testFunction = (domain, slug, branchKey) => {
    const linkAttributionSDKService = new LinkAttributionSDKService();
    linkAttributionSDKService.getLinkData(domain, slug, branchKey);
};
testFunction("do111", "ntri9pobreu", "PfqwyccQmO5X6uOWZRHrBakLA7dvbEpP59xPuGcL");
