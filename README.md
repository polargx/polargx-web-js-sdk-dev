# Link Attribution Web SDK

A lightweight implementation of Link Attribution Web SDK for web applications.

## Installation

bash
npm install custom-branch-sdk
# or
yarn add custom-branch-sdk


## Usage

typescript
import { LinkAttributionSDK } from 'linkattribution-web-sdk';

const linkAttributionSdk = new LinkAttributionSDK();

linkAttributionSdk.init('your_api_key', undefined, (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }

  const data_parsed = data?.data_parsed;
  if (data_parsed?.bp_action) {
    // Handle deep link action
    handleAction(data_parsed.bp_action, data_parsed);
  }
});


## API Reference


### `init(branchKey: string, options?: BranchInitOptions, callback?: BranchCallback)`
Initialize the SDK with your branch key and handle deep linking data.

## License

MIT