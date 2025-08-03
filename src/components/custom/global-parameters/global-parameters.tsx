///////////////////////////////// Affichage et gestion des paramètres globaux du site
// COMPOSANT GLOBAL PARAMETERS //
/////////////////////////////////

import { $, component$, useContext } from "@builder.io/qwik";
import { globalParametersContext, langContext } from "~/common/contexts";

import textsData from "~/internationalization/texts.json"
import { getDomain, tr, writeCookie } from "~/common/functions"
import { cGP, largeFontSize, mediumFontSize, smallFontSize, variableFontSize } from "~/common/constants";

import "./global-parameters.scss"

export default component$(() => {
    const lang : string = useContext(langContext) // Récupération de la langue de l'utilisateur
    const gpSignal = useContext(globalParametersContext) // Récupération des paramètres globaux
    const t = textsData.texts

    /**
     * @description permet de changer la taille de la police du site (écriture du cookie et changement effectif)
     * @param size taille choisie "small", "medium" ou "large"
     * @example setFontSize("small")
     */
    const setFontSize = $((size : "small" | "medium" | "large") => {
        const domain = getDomain()
        const cookieValue = `${size}|${gpSignal.value.autoScroll}`
        writeCookie(cGP, cookieValue, domain)
        gpSignal.value = {
            ...gpSignal.value,
            fontSize: size
        }

        if (gpSignal.value.fontSize == "small") document.documentElement.style.setProperty(variableFontSize, smallFontSize);
        else if (gpSignal.value.fontSize == "medium") document.documentElement.style.setProperty(variableFontSize, mediumFontSize);
        else if (gpSignal.value.fontSize == "large") document.documentElement.style.setProperty(variableFontSize, largeFontSize);
    })

    /**
     * @description permet de choisir si il faut scroller automatiquement ou non (écriture du cookie et changement effectif)
     * @param scroll booléen
     * @example setAutoScroll(true)
     */
    const setAutoScroll = $((scroll : boolean) => {
        const domain = getDomain()
        const cookieValue = `${gpSignal.value.fontSize}|${scroll}`
        writeCookie(cGP, cookieValue, domain)
        gpSignal.value = {
            ...gpSignal.value,
            autoScroll: scroll
        }
    })

    return <div id="global-parameters-container">
        <div>
            {tr(t.font_size, lang)} : 
            <div>

                <div class={gpSignal.value.fontSize == "small" ? "current" : "not-selected"} onClick$={() => setFontSize('small')}>{tr(t.small, lang)}</div>
                <div class={gpSignal.value.fontSize == "medium" ? "current" : "not-selected"} onClick$={() => setFontSize('medium')}>{tr(t.medium, lang)}</div>
                <div class={gpSignal.value.fontSize == "large" ? "current" : "not-selected"} onClick$={() => setFontSize('large')}>{tr(t.large, lang)}</div>

            </div>
        </div>

        <div>
            {tr(t.auto_scroll, lang)} :
            <div>

                <div class={gpSignal.value.autoScroll == true ? "current" : "not-selected"} onClick$={() => setAutoScroll(true)}>{tr(t.enabled, lang)}</div>
                <div class={gpSignal.value.autoScroll == false ? "current" : "not-selected"} onClick$={() => setAutoScroll(false)}>{tr(t.disabled, lang)}</div>

            </div>
        </div>

        <button class="main-button red glass" onClick$={$(() => window.location.reload())}>{tr(t.reset_all, lang)}</button>
    </div>
})