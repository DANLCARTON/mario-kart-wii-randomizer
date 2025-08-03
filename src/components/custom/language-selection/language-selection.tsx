////////////////////////////////// Affichage et gestion de la langue
// COMPOSANT LANGUAGE SELECTION //
//////////////////////////////////

import { $, component$, useContext } from "@builder.io/qwik";
import "./language-selection.scss"
import { langContext } from "~/common/contexts";
import { getDomain, writeCookie } from "~/common/functions";
import { cLang } from "~/common/constants";

interface LanguageSelectionProps {
    footer ?: boolean
}

export default component$((props : LanguageSelectionProps) => {

    const lang = useContext(langContext)

    /**
     * @description écriture du cookie de la langue et rechargement de la page
     * @param lang langue choisie
     * @example setLang("fr_fr")
     */
    const setLang =$((lang : string) : void => {
        const domain = getDomain()
        writeCookie(cLang, lang, domain)
        window.location.reload()
    })
    
    return <div class="languages-container">
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "fr_fr" && " current-lang")} onClick$={() => setLang("fr_fr")}> Français (France) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "fr_ca" && " current-lang")} onClick$={() => setLang("fr_ca")}> Français (Québec) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "en_gb" && " current-lang")} onClick$={() => setLang("en_gb")}> English (UK/Australia) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "en_us" && " current-lang")} onClick$={() => setLang("en_us")}> English (USA) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "es_es" && " current-lang")} onClick$={() => setLang("es_es")}> Español (España) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "es_la" && " current-lang")} onClick$={() => setLang("es_la")}> Español (América Latina) </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "it" && " current-lang")} onClick$={() => setLang("it")}> Italiano </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "de" && " current-lang")} onClick$={() => setLang("de")}> Deutsch </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "ja" && " current-lang")} onClick$={() => setLang("ja")}> 日本語 </button>
        <button class={"lang-button" + (!props.footer == true ? " glass" : " ") + (lang == "ko" && " current-lang")} onClick$={() => setLang("ko")}> 한국어 </button>
    </div>
})