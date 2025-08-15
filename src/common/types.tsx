export type Names = {
    fr_fr : string | null,
    fr_ca : string | null,
    en_gb : string | null,
    en_us : string | null,
    es_es : string | null,
    es_la : string | null,
    it : string | null,
    de : string | null,
    ja : string | null,
    ko : string | null,
}

export type Stats = {
    speed : number
    weight : number
    acceleration : number
    handling : number
    drift : number
    off_road : number
    mini_turbo : number
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