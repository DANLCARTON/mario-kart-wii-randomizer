import { Arena, Course } from "./types";


/**
 * @description permet de récupérer un texte fixe qui doit changer en fonction de la langue utilisée
 * @param obj - objet dans textsData comprenant un texte dans toutes les langues
 * @param lang - langue actuelle de l'utilisateur
 * @returns string de la ligne de texte appelée dans la bonne langue
 * @example tr(t.character_title, lang)
 */
export const tr = (obj : Record<string, string>, lang : string) : string => {
    return obj[lang] ?? obj["en_us"]
}

/**
 * @description permet d'obtenir le domaine actuel
 * @returns Domain=ericthiberge.fr; ou string vide
 * @example getDomain()
 */
export const getDomain = () => {
    return location.hostname.endsWith("ericthiberge.fr") ? "Domain=ericthiberge.fr;" : "";
}

/**
 * @description permet d'écrire un cookie avec les paramètres donnés
 * @param cookieName - nom du cookie à écrire
 * @param cookieValue - valeur du cookie à écrire
 * @param cookieDomain - domaine du cookie à écrire (pas utilisé mais requis quand même)
 * @returns 
 * @example writeCookie("mkwr-lang", "fr_fr", domain)
 */
export const writeCookie = (cookieName : string, cookieValue : string, cookieDomain : string) => {
    console.log(cookieDomain)
    document.cookie = `${cookieName}=${cookieValue};Path=/;Max-Age=2592200;Secure;SameSite=None`
}
  
/**
 * @description permet d'obtenir le nom d'un circuit dans la langue choisie
 * @param course - objet contenant les noms du circuit dans toutes les langues
 * @param lang - langue actuelle
 * @returns string avec le nom du circuit dans la langue sélectionnée
 * @example getCourseName(mario_bros_circuit.names, lang)
 */
export const getCourseName = (course : Course | Arena, lang : string) : string => {
    const names = course.names as Record<string, string>
    return names[lang]
}