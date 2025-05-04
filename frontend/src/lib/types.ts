export interface Typography {
    id: string;
    name: string;
    type: string;
    info: string;
    gimage: string;
    created: string;
    updated: string;
    expand?: {
        info?: Information;
    };
}

export interface Information {
    id: string;
    info: string;
    created: string;
    updated: string;
}

export interface User {
    id: string;
    email: string;
    emailVisibility: boolean;
    verified: boolean;
    created: string;
    updated: string;
}