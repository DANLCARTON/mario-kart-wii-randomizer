import { component$, Slot, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { availableLangs, cCP, cGP, cLang, cPN, largeFontSize, mediumFontSize, smallFontSize } from "~/common/constants";
import { globalParametersContext, langContext, pickedCharactersContext, pickedGlidersContext, pickedTiresContext, pickedVehiclesContext, playerNamesContext, selectedCoursesContext, selectedRoutesContext } from "~/common/contexts";
import Footer from "~/components/custom/footer/footer";

import { CharacterParameters, PlayerNames, type GlobalParameters } from "~/common/types";
import EasterEgg from "~/components/custom/easter-egg/easter-egg";
import FooterLanguageSelection from "~/components/custom/footer-language-selection/footer-language-selection";

export const useLang = routeLoader$(async (req) : Promise<string> => {
    const cookie = req.cookie.get(cLang)
    if (cookie && availableLangs.includes(cookie.value)) return cookie.value

    // valeurs par défaut
    else return "no-lang"
})

/**
 * @description Récupération des valeurs des paramètres généraux
 * @param value valeur du cookie
 * @returns valeurs du cookie sous forme d'objet
 * @example getValues("small|true")
 */
const getValues = (value : string) => {
    const [fontSize, autoScroll] = value.split("|")
    return {
        fontSize: fontSize, 
        autoScroll: autoScroll == "true" ? true : false
    }
}

/**
 * @description Récupération des valeurs des noms des joueurs
 * @param value valeur du cookie
 * @returns valeurs du cookie sous forme d'objet
 * @example getVSValues("playerName1|playerName2|playerName3|playerName4")
 */
const getPlayerNames = (value : string) : PlayerNames => {
    const names = value.split("|")
    return {
        names
    }
}

/**
 * @description Récupération des valeurs des paramètres Personnages
 * @param value valeur du cookie
 * @returns valeurs du cookie sous forme d'objet
 * @example getVSValues("true|1")
 */
const getCharacterValues = (value : string) : CharacterParameters => {
    const [allDifferent, numberOfPlayers] = value.split("|")
    return {
        allDifferent: allDifferent == "true" ? true : false,
        numberOfPlayers: numberOfPlayers ? parseInt(numberOfPlayers) : 1
    }
}

// Récupération du cookie des paramètres globaux
export const useGlobalParameters = routeLoader$(async (req) : Promise<GlobalParameters> => {
    const cookie = req.cookie.get(cGP)
    if (cookie) return getValues(cookie.value) as GlobalParameters

    // valeurs par défaut
    else return {
        fontSize: "medium", 
        autoScroll: false
    }
})

// Récupération du cookie des noms des joueurs
export const usePlayersNames = routeLoader$(async (req) : Promise<PlayerNames> => {
    const cookie = req.cookie.get(cPN)
    if (cookie) return getPlayerNames(cookie.value)
    
    // valeurs par défaut
    else return {
        names : []
    }
})

// Récupération du cookie des paramètres personnages
export const useCharacterParameters = routeLoader$(async (req) : Promise<CharacterParameters> => {
    // récupération du cookie
    const cookie = req.cookie.get(cCP)
    if (cookie) return getCharacterValues(cookie.value)

    // valeurs par défaut
    else return {
        allDifferent: false,
        numberOfPlayers: 1
    }
})

export default component$(() => {

    const lang = useLang()
    useContextProvider(langContext, lang.value)

    const gp = useGlobalParameters()
    const gpSignal = useSignal<GlobalParameters>(gp.value)
    useContextProvider(globalParametersContext, gpSignal)

    const selectedCourses = useSignal<string[]>([])
    const selectedRoutes = useSignal<string[]>([])
    useContextProvider(selectedCoursesContext, selectedCourses)
    useContextProvider(selectedRoutesContext, selectedRoutes)

    const playerNames = usePlayersNames()
    useContextProvider(playerNamesContext, playerNames.value.names)

    const pickedCharacters = useSignal<any[]>([])
    useContextProvider(pickedCharactersContext, pickedCharacters)

    const pickedVehicles = useSignal<any[]>([])
    useContextProvider(pickedVehiclesContext, pickedVehicles)

    const pickedTires = useSignal<any[]>([])
    useContextProvider(pickedTiresContext, pickedTires)

    const pickedGliders = useSignal<any[]>([])
    useContextProvider(pickedGlidersContext, pickedGliders)

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        if (gpSignal.value.fontSize == "small") document.documentElement.style.setProperty('--variable-font-size', smallFontSize);
        else if (gpSignal.value.fontSize == "medium") document.documentElement.style.setProperty('--variable-font-size', mediumFontSize);
        else if (gpSignal.value.fontSize == "large") document.documentElement.style.setProperty('--variable-font-size', largeFontSize);
    })
    
    return <>
        <Slot />
        {availableLangs.includes(lang.value) && <Footer />}
        {!availableLangs.includes(lang.value) && <div class="large-width">
            <FooterLanguageSelection />    
        </div>}
        <EasterEgg />
    </>
})