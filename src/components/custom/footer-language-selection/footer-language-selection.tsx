///////////////////////////////////////// Footer de la page de sélection de la langue
// COMPOSANT FOOTER LANGUAGE SELECTION //
/////////////////////////////////////////

import { component$ } from "@builder.io/qwik";
import "../footer/footer.scss"
import SocialSharing from "../social-sharing/social-sharing";
import { emojis } from "~/common/constants";
import { tr } from "~/common/functions";
import textsData from "../../../internationalization/texts.json"
import OtherRandomizers from "../other-randomizers/other-randomizers";

export default component$(() => {
    const lang : string = "en_us" // Comme la langue n'a pas été sélectionnée ici, on force anglais USA
    const emoji = emojis[Math.floor(Math.random() * emojis.length)]
    const t = textsData.texts
    return <footer class="glass language-selection">
        <div class="footer-legal-infos">
            <SocialSharing />
            <p>Made With {emoji} by Eric Thiberge</p>
            <p>{tr(t.contact, lang)} : <a href="mailto:thibergeeric@gmail.com">thibergeeric@gmail.com</a></p>
            <h3>{tr(t.other_randomizers, lang)}</h3>
            <OtherRandomizers />
        </div>
    </footer>
})