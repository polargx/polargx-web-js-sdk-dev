import PolarSDK from "./index"

type EnvConfigrationDescribe = {
    name: string
    server: string
    supportedBaseDomains: string[]
}

type Configs = {
    brand: string,
    env: EnvConfigrationDescribe
}

const getConfigs = (isDev: boolean): Configs => {
    return {
        brand: 'Polar',
        env: isDev ? {
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
}

export {Configs}
export default getConfigs