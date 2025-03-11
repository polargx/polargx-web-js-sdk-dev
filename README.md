## PolarGX Web SDK Installation Guide

### 1. Create and setup Polar app:
- Register PolarGX account at https://app.polargx.com, after signup `unnamed` app has been created automatically.
- Setting your app in _App Settings > App Information_
- Create an API Key in _App Settings > API Keys_ with _Mobile apps / frontend_ purpose
- Configure your domain in _Link Attribution > Configuration > Link domain section_ with:
  + Default link domain.
  + Alternate link domain.
- Configure your iOS Redirects in _Link Attribution > Configuration > Desktop Redirects section > Redirects_ with:
  + Desktop URL: Help your link redirects to your url.
  
### 2. Adding PolarGX SDK
- Get your **API Key** from [PolarGX](https://app.polargx.com).
- Import and initialize PolarGX in your React app.

#### 2.1. Script Tab in HTML
- To reference the latest version of the PolarGX, add the script following to your HTML:

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
    ["init", "trackEvent", "setIdentity"],
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

#### 2.2. Node Package Manager
- To install the PolarGX with NPM, use the following command:
  + Install NPM: please follow this [Guide: getting started](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  + Add PolarGX dependency, run:
    ```
    npm install PolarGX
    ```

### 3. Initialize PolarGX
- The PolarGX use the ```init()``` method to initialize.

```Javascript
// Replace YOUR_KEY with your API Key
polarGX.init(YOUR_API_KEY, undefined, (error, data) => {
    if (error) {
      // Handle error
    }
    const data_parsed = data;
    // Handle data
})
```

#### Data Returned

The `data` object returned by the SDK includes the following fields:

| Key               | Value Description                                                          | Type       |
|------------------|----------------------------------------------------------------------------|------------|
| `data_parsed`    | Contains metadata related to the referring link, including custom data.   | `object`   |ated for the user session.               | `string`   |
| `session_id`    | A unique identifier assigned to the session.                                 | `string`   |
| `identity_id`    | A unique identifier assigned to the user.                                 | `string`   |
| `link`           | The resolved destination link that the user was referred to.              | `string`   |

