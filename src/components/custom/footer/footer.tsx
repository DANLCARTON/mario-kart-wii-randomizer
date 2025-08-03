////////////////////// Footer de la page principale
// COMPOSANT FOOTER //
//////////////////////

import { component$, useContext } from "@builder.io/qwik";
import { langContext } from "~/common/contexts";
import LanguageSelection from "../language-selection/language-selection";
import { emojis } from "~/common/constants";

import "./footer.scss"

import textsData from "~/internationalization/texts.json"
import { tr } from "~/common/functions"
import GlobalParameters from "../global-parameters/global-parameters";
import SocialSharing from "../social-sharing/social-sharing";
import OtherRandomizers from "~/components/custom/other-randomizers/other-randomizers";

export default component$(() => {
    const lang : string = useContext(langContext)
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]

    const t = textsData.texts

    return <footer class="glass">
        <div class="footer-language-selection">
            <h3>{tr(t.language_selection, lang)}</h3>
            <LanguageSelection footer/>
            <h3>{tr(t.other_randomizers, lang)}</h3>
            <OtherRandomizers />
        </div>
        <div class="global-parameters">
            <h3>{tr(t.global_parameters, lang)}</h3>
            <GlobalParameters />
        </div>
        <div class="footer-legal-infos">
            <h3>{tr(t.additionnal_information, lang)}</h3>
            <p>{tr(t.nintendo, lang)}</p>
            <p>{tr(t.cookie, lang)}</p>
            <p><i>{tr(t.footer_message_1, lang)}</i></p>
            <SocialSharing />
            <p>Made With {emoji} by Eric Thiberge</p>
            <p>{tr(t.contact, lang)} : <a href="mailto:thibergeeric@gmail.com">thibergeeric@gmail.com</a></p>
        </div>
    </footer>
})