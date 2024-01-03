export type Stat = {
    vodCount: number;
    liveCount: number;
    materialsCount: number;
    playlistCount: number;
    subscriptionCount: number;
    passwordCount: number;
    collectionCount: number;
    conferenceCount: number;
}

export type Project = {
    id: string;
    title: string;
    hasDrm: boolean;
    hasBranding: boolean;
    stat: Stat;
}

export type CreateProjectDTO = {
    input: {
        attribute : string;
        title : string;
    }
}

export type ActivateBrandingDTO = {
    input: {
        id: string;
    }
}

export type ActivateDRMDTO = {
    input: {
        id: string;
    }
}

export type CreateProjectResponse = {
    userProjectCreate: {
        record: Project;
    }
}

export type ActivateBrandingResponse = {
    userProjectActivateBranding: {
        response: string;
    }
}

export type ActivateDRMResponse = {
    userProjectActivateDRM: {
        response: string;
    }
}
