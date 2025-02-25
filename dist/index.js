"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  LinkAttributionSDK: () => LinkAttributionSDK,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/config.ts
var baseConfig = {
  endpoint: "https://jw4xix6q44.execute-api.us-east-1.amazonaws.com/dev"
};
var config_default = baseConfig;

// src/BEService.ts
var LinkAttributionSDKService = class {
  async getLinkData(domain, slug, branchKey) {
    try {
      const url = new URL(`${config_default.endpoint}/sdk/v1/links/data`);
      url.searchParams.append("domain", domain);
      url.searchParams.append("slug", slug);
      const response = await fetch(url.toString(), {
        headers: {
          "x-api-key": branchKey
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      return responseData;
    } catch (err) {
      console.error("getLinkData error:", err);
      return void 0;
    }
  }
};
var linkAttributionSDKService = new LinkAttributionSDKService();

// src/index.ts
var parseUrlData = () => {
  if (typeof window === "undefined") {
    return { domain: "", slug: "", trackData: {
      unid: void 0,
      url: "",
      sdkUsed: void 0
    } };
  }
  const urlParams = new URLSearchParams(window.location.search);
  let attributionUrl = urlParams.get("$linkattribution_url") || "";
  if (!attributionUrl.startsWith("http")) {
    attributionUrl = `https://${attributionUrl}`;
  }
  let domain = "";
  let slug = "";
  try {
    const url = new URL(attributionUrl);
    const pathname = url.pathname;
    const parts = pathname.replace(/^\//, "").split("/");
    slug = parts[0] || "";
    domain = url.hostname.split(".")[0] || "";
  } catch (error) {
    console.error("Failed to parse attribution URL:", error);
  }
  const trackData = {
    unid: urlParams.get("$linkattribution_clickid") || void 0,
    url: attributionUrl,
    sdkUsed: urlParams.get("$linkattribution_used") || void 0
  };
  return { domain, slug, trackData };
};
var isLinkAttributionUrl = (url) => {
  return url.includes(".makelabs.ai");
};
var LinkAttributionSDK = class {
  constructor() {
    this.baseUrl = config_default.endpoint;
    this.branchKey = null;
  }
  setBaseUrl(url) {
    this.baseUrl = url.replace(/\/$/, "");
  }
  async init(branchKey, options, callback) {
    try {
      this.branchKey = branchKey;
      const { domain, trackData, slug } = parseUrlData();
      if (!isLinkAttributionUrl(trackData.url)) {
        throw new Error("Not a valid attribution URL");
      }
      const linkData = await linkAttributionSDKService.getLinkData(domain || "", slug || "", branchKey);
      if (!linkData) {
        throw new Error("Failed to get link data");
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
      if (typeof callback === "function") {
        callback(null, branchResponse);
      }
    } catch (error) {
      console.error("Branch initialization error:", error);
      if (typeof callback === "function") {
        const branchError = {
          name: "BranchError",
          message: error instanceof Error ? error.message : "Unknown error",
          code: error instanceof Error ? error.name : "UNKNOWN_ERROR"
        };
        callback(branchError, null);
      }
    }
  }
};
if (typeof window !== "undefined") {
  window.linkAttributionSdk = new LinkAttributionSDK();
}
function generateSessionId() {
  return "session_" + Math.random().toString(36).substr(2, 9);
}
function generateIdentityId() {
  return "identity_" + Math.random().toString(36).substr(2, 9);
}
var src_default = LinkAttributionSDK;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LinkAttributionSDK
});
//# sourceMappingURL=index.js.map