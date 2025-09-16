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
            server: 'https://8mr6rftgmb.execute-api.us-east-1.amazonaws.com/dev',
            supportedBaseDomains: ["biglittlecookies.com"]
        } as EnvConfigrationDescribe 
        : {
            name: 'Production',
            server: 'https://8mr6rftgmb.execute-api.us-east-1.amazonaws.com/prod',
            supportedBaseDomains: ["gxlnk.com"]
        } as EnvConfigrationDescribe
    }
}

export {Configs}
export default getConfigs