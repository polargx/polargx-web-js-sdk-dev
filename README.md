# PolarGX Web SDK Installation Guide

## 1. Create and Setup Polar App

- Register a PolarGX account at https://app.polargx.com
  - After signup, an `unnamed` app is automatically created
- Configure your app in *App Settings > App Information*
- Create an API Key in *App Settings > API Keys* with *Mobile apps / frontend* purpose
- Configure your domain in *Link Attribution > Configuration > Link domain section* with:
  - Default link domain
  - Alternate link domain
- Configure your iOS Redirects in *Link Attribution > Configuration > Desktop Redirects section > Redirects* with:
  - Desktop URL: Help your link redirects to your URL

## 2. Adding PolarGX SDK

- Get your **API Key** from [PolarGX](https://app.polargx.com)
- Import and initialize PolarGX in your React app

### 2.1. Script Tag in HTML

To reference the latest version of PolarGX, add the following script to your HTML:

```html
<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <script>
    // Load SDK
    (function(w, d, s, n, f, t, h, _, k) {
      if (!w[n] || !w[n]._q) {
        for (; _ < f.length;) t(h, f[_++]);
        k = d.createElement(s);
        k.async = 1;
        k.src = "https://your-s3-bucket.s3.amazonaws.com/browser/index.js";
        d.getElementsByTagName(s)[0].parentNode.insertBefore(k, d.getElementsByTagName(s)[0]);
        w[n] = h;
      }
    })(window, document, "script", "polarSDK",
      ["init"],
      function(b, r) {
        b[r] = function() {
          b._q.push([r, arguments])
        }
      }, { _q: [], _v: 1 }
    );
  </script>
</head>
<body></body>
</html>
```

### 2.2. Node Package Manager

To install PolarGX with NPM:

1. Install NPM: Please follow this [Guide: getting started](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Add PolarGX dependency by running:
   ```
   npm install PolarGX
   ```

## 3. Initialize PolarGX

The PolarGX SDK uses the `init()` method for initialization:

```javascript
// Replace YOUR_API_KEY with your API Key
import { PolarSDK } from 'PolarGX';

// Create a new instance of PolarSDK
const polarSdk = new PolarSDK();

// Optional: Enable development mode if needed
// polarSdk.setDevelopmentMode();

// Initialize the SDK with your API key
polarSdk.init(YOUR_API_KEY, undefined, (error, data) => {
  if (error) {
    // Handle error
    console.error('Initialization error:', error);
  } else {
    // Handle successful initialization
    console.log('SDK initialized successfully:', data);
    
    // Access the parsed data
    const linkData = data.data_parsed;
    const sessionId = data.session_id;
    const identityId = data.identity_id;
    const resolvedLink = data.link;
    const slug = data.slug;
  }
});
```

### Understanding URL Parsing

The SDK automatically parses URL parameters when initialized:
- `__clurl`: The click URL parameter (e.g., `?__clurl=example.com/path`)
- `__clid`: The click ID parameter
- `__clsdkused`: SDK usage information

The SDK will only process the URL if it's determined to be a valid PolarGX URL by the `isPolarUrl()` method.

### TypeScript Type Definitions

The SDK provides the following TypeScript interfaces:

```typescript
import { PolarCallback, PolarError, PolarInitOptions, PolarResponse } from 'PolarGX';
```

- `PolarInitOptions`: Options for SDK initialization
- `PolarCallback`: Callback function type for the init method
- `PolarResponse`: Response object returned on successful initialization
- `PolarError`: Error object returned on failed initialization

### Data Returned

The `data` object (PolarResponse) returned by the SDK includes the following fields:

| Key | Value Description | Type |
|------------------|----------------------------------------------------------------------------|------------|
| `data_parsed` | Contains metadata related to the referring link, including custom data and analytics tags | `object` |
| `session_id` | A unique identifier generated for the session (format: 'session_' + random string) | `string` |
| `identity_id` | A unique identifier generated for the user (format: 'identity_' + random string) | `string` |
| `link` | The resolved destination link that the user was referred to | `string` |
| `slug` | The slug identifier of the link | `string` |

## 4. Development Mode

You can enable development mode to use development environment configurations:

```javascript
// Enable development mode
polarSdk.setDevelopmentMode();

// Then initialize as normal
polarSdk.init(YOUR_API_KEY, options, callback);
```

## 5. Browser Integration

When the SDK is loaded in a browser environment, it automatically creates a global instance:

```javascript
// The SDK automatically creates a global instance in browser environments
window.polarSDK = new PolarSDK();
```

This allows you to access the SDK from anywhere in your application after including the script.