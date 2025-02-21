# Link Attribution Web SDK

A lightweight implementation of Link Attribution Web SDK for web applications.

## Installation

```bash
# Using npm
npm i linkattribution-web-sdk-dev

# Using yarn
yarn add linkattribution-web-sdk-dev
```

## Usage

```typescript
// Basic initialization
import { LinkAttributionSDK } from 'linkattribution-web-sdk-dev';

const linkAttributionSdk = new LinkAttributionSDK();

// Initialize with callback
linkAttributionSdk.init('your_api_key', undefined, (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  // Handle successful initialization
  console.log('Link data:', data);

  // Access parsed data
  const parsedData = data?.data_parsed;
  
  // Example: Handle deep link data
  if (parsedData?.analyticsTags) {
    console.log('Campaign:', parsedData.analyticsTags.campaign);
    console.log('Channel:', parsedData.analyticsTags.channel);
  }

  // Example: Handle social media tags
  if (parsedData?.socialMediaTags) {
    console.log('Title:', parsedData.socialMediaTags.title);
    console.log('Description:', parsedData.socialMediaTags.description);
  }
});

// Initialize with async/await
async function initSdk() {
  try {
    const data = await linkAttributionSdk.init('your_api_key');
    console.log('Initialization successful:', data);
  } catch (error) {
    console.error('Initialization failed:', error);
  }
}

// Example response data structure
interface SdkResponse {
    data_parsed: {
        analyticsTags: {
            campaign: string;
            channel: string;
            feature: string;
            tags: string;
        };
        socialMediaTags: {
            title: string;
            description: string;
        };
        url: string;
        slug: string;
        data: {
            [key: string]: string;
        };
    };
    session_id: string;
    identity_id: string;
    link: string;
}
```

## API Reference

### init(branchKey: string, options?: BranchInitOptions, callback?: BranchCallback)

Initialize the SDK with your branch key and handle deep linking data.

#### Parameters

- `branchKey` (string, required): Your Link Attribution API key
- `options` (BranchInitOptions, optional): Configuration options
- `callback` (function, optional): Callback function for handling initialization result

#### Callback Parameters

- `error`: Error object if initialization fails
- `data`: Response data containing link information

## License

MIT