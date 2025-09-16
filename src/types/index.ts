
export interface PolarInitOptions {
    baseUrl?: string;
    [key: string]: any;
}

export interface PolarResponse {
    analyticsTags: {[key: string]: any}
    socialMediaTags: {[key: string]: any}
    data: {[key: string]: any}
    slug?: string
    url?: string
}

export interface PolarError extends Error {
    code?: string;
    message: string;
}

export type PolarCallback = (error: PolarError | null, data?: PolarResponse | null) => void;
