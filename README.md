# PolarGX Web SDK

A lightweight implementation of PolarGX Web SDK for web applications.

## Installation

```bash
# Using npm
npm i polargx-web-sdk

# Using yarn
yarn add polargx-web-sdk
```

## Usage

```typescript
// Basic initialization
import { PolarApp } from 'polargx-web-sdk';

const polarApp = new PolarApp();

// Initialize with callback
polarApp.init('your_api_key', undefined, (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  // Handle successful initialization
  console.log('Link data:', data);

  // Access parsed data
  const parsedData = data?.data_parsed;
});

// Initialize with async/await
async function initSdk() {
  try {
    const data = await polarApp.init('your_api_key');
    console.log('Initialization successful:', data);
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

// Example response data structure
interface SdkResponse {
  //working
}
```

## API Reference

### init(apiKey: string, options?: PolarInitOptions, callback?: PolarCallback)

Initialize the SDK with your Polar API key and handle deep linking data.

#### Parameters

- `apiKey` (string, required): Your Polar API key
- `options` (PolarInitOptions, optional): Configuration options
- `callback` (function, optional): Callback function for handling initialization result

#### Callback Parameters

- `error`: Error object if initialization fails
- `data`: Response data containing link information

## License

MIT