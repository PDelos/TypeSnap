export interface Typography {
    id: string;
    name: string;
    type: string;
    info: string;
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