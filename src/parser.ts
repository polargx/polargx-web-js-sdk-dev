export interface PolarParamsInQuery {
    domain?: string,
    slug?: string,
    clickUnid?: string
}

export const parsePolarParamsInQuery = (): PolarParamsInQuery => {
    if (typeof window === 'undefined') {
        return {};
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    return {
        domain: urlParams.get('__subdomain') ?? undefined,
        slug: urlParams.get('__slug') ?? undefined,
        clickUnid: urlParams.get('__clid') ?? undefined,
    }
}; 