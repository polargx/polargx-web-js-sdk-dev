
export interface PolarInitOptions {
    baseUrl?: string;
    [key: string]: any;
}

export interface PolarResponse {
    data_parsed?: {
        bp_action?: string;
        [key: string]: any;
    };
    session_id?: string;
    identity_id?: string;
    link?: string;
    [key: string]: any;
}

export interface PolarError extends Error {
    code?: string;
    message: string;
}

export type PolarCallback = (error: PolarError | null, data?: PolarResponse | null) => void;
