
export interface BranchInitOptions {
    baseUrl?: string;
    [key: string]: any;
}

export interface BranchResponse {
    data_parsed?: {
        bp_action?: string;
        [key: string]: any;
    };
    session_id?: string;
    identity_id?: string;
    link?: string;
    [key: string]: any;
}

export interface BranchError extends Error {
    code?: string;
    message: string;
}

export type BranchCallback = (error: BranchError | null, data?: BranchResponse | null) => void;
