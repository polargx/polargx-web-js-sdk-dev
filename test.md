## PolarGX Web SDK Installation Guide

### 1. Create and Setup Polar App:

- Register a PolarGX account at [PolarGX](https://app.polargx.com). After signup, an `unnamed` app is automatically created.
- Configure your app in **App Settings > App Information**.
- Create an API Key in **App Settings > API Keys** with the **Mobile apps/frontend** purpose.
- Configure your domain in **Link Attribution > Configuration > Link Domain Section** with:
  - Default link domain.
  - Alternate link domain.
- Configure your iOS Redirects in **Link Attribution > Configuration > Desktop Redirects Section > Redirects** with:
  - Desktop URL: Helps redirect your links to your URL.

### 2. Adding PolarGX SDK

#### 2.1. Use NPM

- Install NPM: Follow this [Guide: Getting Started](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- To add the PolarGX dependency, run:
  ```sh
  npm install PolarGX
  ```

### 3. Use PolarGX SDK

#### 3.1. In a React.js Project

- Get your **App ID** and **API Key** from [PolarGX](https://app.polargx.com).
- Import and initialize PolarGX in your React app.

#### Example Implementation

```javascript
import { useEffect } from 'react';
import PolarGX from 'PolarGX';

const YOUR_APP_ID = "your-app-id";
const YOUR_API_KEY = "your-api-key";

function App() {
  useEffect(() => {
    PolarGX.initialize(YOUR_APP_ID, YOUR_API_KEY, (link, data, error) => {
      console.log("[POLAR] Link clicked:", link);
      console.log("[POLAR] Data:", data);
      console.log("[POLAR] Error:", error);
    });

    const handleDeepLink = (event) => {
      const url = event.detail;
      PolarGX.handleUrl(url);
    };

    window.addEventListener("polar-deep-link", handleDeepLink);
    return () => {
      window.removeEventListener("polar-deep-link", handleDeepLink);
    };
  }, []);

  return (
    <div>
      <h1>Welcome to PolarGX Integration</h1>
    </div>
  );
}

export default App;
```

### Notes:

- Ensure that your web app is properly handling deep linking by adding event listeners for URL changes.
- If your project uses React Router, you may need to integrate the handling of deep links within the router logic.
- The `PolarGX.initialize` function takes an optional callback to handle deep link events when they are triggered.

