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
  PolarSDK: () => PolarSDK,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/APIService.ts
var APIService = class {
  constructor(configs) {
    this.configs = configs;
  }
  async getLinkData(domain, slug, apiKey) {
    try {
      const url = new URL(`${this.configs.env.server}/sdk/v1/links/data`);
      url.searchParams.append("domain", domain);
      url.searchParams.append("slug", slug);
      const response = await fetch(url.toString(), {
        headers: {
          "x-api-key": apiKey
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
var APIService_default = APIService;

// src/configs.ts
var getConfigs = (isDev) => {
  return {
    brand: "Polar",
    env: isDev ? {
      name: "Development",
      server: "https://lydxigat68.execute-api.us-east-1.amazonaws.com/dev",
      supportedBaseDomains: ["makelabs.ai"]
    } : {
      name: "Production",
      server: "https://lydxigat68.execute-api.us-east-1.amazonaws.com/prod",
      supportedBaseDomains: ["gxlnk.com"]
    }
  };
};
var configs_default = getConfigs;

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
  let clickUrl = urlParams.get("__clurl") || "";
  if (!clickUrl.startsWith("http")) {
    clickUrl = `https://${clickUrl}`;
  }
  let domain = "";
  let slug = "";
  try {
    const url = new URL(clickUrl);
    const pathname = url.pathname;
    const parts = pathname.replace(/^\//, "").split("/");
    slug = parts[0] || "";
    domain = url.hostname.split(".")[0] || "";
  } catch (error) {
    console.error("Failed to parse Click URL:", error);
  }
  const trackData = {
    unid: urlParams.get("__clid") || void 0,
    url: clickUrl,
    sdkUsed: urlParams.get("__clsdkused") || void 0
  };
  return { domain, slug, trackData };
};
var PolarSDK = class {
  constructor() {
    this.configs = configs_default(false);
    this.apiService = new APIService_default(this.configs);
    this.isPolarUrl = (url) => {
      const host = new URL(url).host;
      var count = 0;
      this.configs.env.supportedBaseDomains.forEach((baseDomain) => {
        if (host.endsWith("." + baseDomain)) {
          count++;
        }
      });
      return count > 0;
    };
    this.apiKey = null;
  }
  setDevelopmentMode() {
    this.configs = configs_default(true);
    this.apiService = new APIService_default(this.configs);
  }
  async init(apiKey, options, callback) {
    try {
      this.apiKey = apiKey;
      const { domain, trackData, slug } = parseUrlData();
      if (!this.isPolarUrl(trackData.url)) {
        return;
      }
      const linkData = await this.apiService.getLinkData(domain || "", slug || "", apiKey);
      if (!linkData) {
        throw new Error("Failed to get link data");
      }
      const polarResponse = {
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
        callback(null, polarResponse);
      }
    } catch (error) {
      console.error("Polar initialization error:", error);
      if (typeof callback === "function") {
        const polarError = {
          name: "PolarError",
          message: error instanceof Error ? error.message : "Unknown error",
          code: error instanceof Error ? error.name : "UNKNOWN_ERROR"
        };
        callback(polarError, null);
      }
    }
  }
};
PolarSDK.isDevelopmentEnabled = false;
if (typeof window !== "undefined") {
  window.polarSDK = new PolarSDK();
}
function generateSessionId() {
  return "session_" + Math.random().toString(36).substr(2, 9);
}
function generateIdentityId() {
  return "identity_" + Math.random().toString(36).substr(2, 9);
}
var src_default = PolarSDK;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PolarSDK
});
//# sourceMappingURL=index.js.map