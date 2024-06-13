export type createGymDto = {
    name: string;
    shortName: string;
    location: string;
    topLoggerId?: number;
    topoId?: number;
}

export const parseCreateGymDto = (body: any): createGymDto => {
    return {
        name: body.name,
        shortName: body.shortName,
        location: body.location,
        topLoggerId: body.topLoggerId,
        topoId: body.topoId,
    }
}