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
    const url = new URL(`${this.configs.env.server}/api/v1/links/resolve`);
    url.searchParams.append("domain", domain);
    url.searchParams.append("slug", slug);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-api-key": apiKey
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  }
  async updateLinkClick(clickUnid, sdkUsed, apiKey) {
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
};
var APIService_default = APIService;

// src/configs.ts
var getConfigs = (isDev) => {
  return {
    brand: "Polar",
    env: isDev ? {
      name: "Development",
      server: "https://8mr6rftgmb.execute-api.us-east-1.amazonaws.com/dev",
      supportedBaseDomains: ["biglittlecookies.com"]
    } : {
      name: "Production",
      server: "https://8mr6rftgmb.execute-api.us-east-1.amazonaws.com/prod",
      supportedBaseDomains: ["gxlnk.com"]
    }
  };
};
var configs_default = getConfigs;

// src/parser.ts
var parsePolarParamsInQuery = () => {
  var _a, _b, _c;
  if (typeof window === "undefined") {
    return {};
  }
  const urlParams = new URLSearchParams(window.location.search);
  return {
    domain: (_a = urlParams.get("__subdomain")) != null ? _a : void 0,
    slug: (_b = urlParams.get("__slug")) != null ? _b : void 0,
    clickUnid: (_c = urlParams.get("__clid")) != null ? _c : void 0
  };
};

// src/index.ts
var PolarSDK = class {
  constructor() {
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
  async init(apiKey, options, callback) {
    var _a;
    try {
      let isDev = false;
      let correctApiKey = apiKey;
      if (apiKey.startsWith("dev_")) {
        isDev = true;
        correctApiKey = apiKey.substring(4);
      }
      this.apiKey = correctApiKey;
      this.configs = configs_default(isDev);
      this.apiService = new APIService_default(this.configs);
      const { domain, slug, clickUnid } = parsePolarParamsInQuery();
      if (!domain || !slug || !clickUnid) {
        return;
      }
      const linkData = await this.apiService.getLinkData(domain, slug, this.apiKey);
      if (!((_a = linkData == null ? void 0 : linkData.data) == null ? void 0 : _a.sdkLinkData)) {
        throw new Error("Link is not found!");
      }
      await this.apiService.updateLinkClick(clickUnid, true, this.apiKey);
      const polarResponse = linkData.data.sdkLinkData;
      if (typeof callback === "function") {
        callback(null, polarResponse);
      }
    } catch (error) {
      console.error("PolarSDK failed: ", error);
      console.trace("PolarSDK failed: ", error);
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
if (typeof window !== "undefined") {
  window.polarSDK = new PolarSDK();
}
var src_default = PolarSDK;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PolarSDK
});
//# sourceMappingURL=index.js.map