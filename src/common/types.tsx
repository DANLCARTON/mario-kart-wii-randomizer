export type Names = {
    fr_fr : string | null,
    fr_ca : string | null,
    en_gb : string | null,
    en_us : string | null,
    es_es : string | null,
    es_la : string | null,
    pt_pt : string | null,
    pt_br : string | null,
    it : string | null,
    de : string | null,
    nl : string | null,
    ru : string | null,
    ja : string | null,
    ko : string | null,
    zh_hans : string | null,
    zh_hant : string | null
}

export type Stats = {
    land_speed : number,
    water_speed : number,
    air_speed : number,
    acceleration : number,
    weight : number,
    land_handling : number
    water_handling : number
    air_handling : number
    off_road : number
    mini_turbo : number
    stability : number
}

export type Course = {
    names : Names,
    routes : string[]
    origin : string | null
}

export type GlobalParameters = {
    fontSize : "small" | "medium" | "large",
    autoScroll : boolean
}

export type VSParameters = {
    courseProbability : number,
    routeCourse : boolean,
    routeRoute : boolean,
    allRoutes : boolean
}

export type RallyParameters = {
    rallyInVS : boolean
}

export type PlayerNames = {
    names : string[]
}

export type CharacterParameters = {
    allDifferent : boolean
    numberOfPlayers : number
}