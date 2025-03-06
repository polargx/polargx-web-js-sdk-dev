import PolarApp from "./index"

type EnvConfigrationDescribe = {
    name: string
    server: string
    supportedBaseDomains: string[]
}

const configs = {
    brand: 'Polar',
    env: PolarApp.isDevelopmentEnabled ? {
        name: 'Development',
        server: 'https://lydxigat68.execute-api.us-east-1.amazonaws.com/dev',
        supportedBaseDomains: ["makelabs.ai"]
    } as EnvConfigrationDescribe 
    : {
        name: 'Production',
        server: 'https://lydxigat68.execute-api.us-east-1.amazonaws.com/prod',
        supportedBaseDomains: ["gxlnk.com"]
    } as EnvConfigrationDescribe
}

export default configs