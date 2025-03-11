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
#### 2.1. Use NPM
- Install NPM: please follow this [Guide: getting started](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
- To Add PolarGX dependency, run:
    ```
    npm install PolarGX
    ```
### 3. Use PolarGX SDK

- Get your **API Key** from [PolarGX](https://app.polargx.com).
- Import and initialize PolarGX in your React app.

#### 3.1. In a React.js Project (Javascript)
#### Example Implementation

```javascript
import { useEffect } from 'react';
import PolarGX from 'PolarGX';

const YOUR_API_KEY = "your-api-key";

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    const polarGX = new PolarGX(); 
    polarGX.init(YOUR_API_KEY, undefined, (error:any, data:any) =>{
        if(error){
          // Handle error
        }
        const data_parsed = data
        setData(data_parsed)
        //Handle data
    })
  }, []);

  return (
    <div>
      <h1>Welcome to PolarGX Integration</h1>
    </div>
  );
}

export default App;
```

#### 3.2. In a React.js Project (Typescript)
#### Example Implementation
```typescript
import { useEffect } from 'react';
import PolarGX , { PolarResponse, PolarError } from 'PolarGX';

const YOUR_API_KEY = "your-api-key";

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    const polarGX = new PolarGX(); 
    polarGX.init(YOUR_API_KEY, undefined, (error: PolarError | null, data?: PolarResponse | null) =>{
        if(error){
          // Handle error
        }
        const data_parsed = data
        setData(data_parsed)
        //Handle data
    })
  }, []);

  return (
    <div>
      <h1>Welcome to PolarGX Integration</h1>
    </div>
  );
}
```


