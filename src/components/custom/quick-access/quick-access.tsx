//////////////////////////// Petit truc en bas à gauche pour l'acces rapide aux différentes parties du site
// COMPOSANT QUICK ACCESS //
////////////////////////////

import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import "./quick-access.scss"
import textData from "../../../internationalization/texts.json"
import { tr } from "~/common/functions";
import { langContext } from "~/common/contexts";
import { base } from "~/common/constants";

export default component$(() => {

    const isMenu = useSignal(true)

    const lang = useContext(langContext)
    const t = textData.texts

    /**
     * @description handler pour ouvrir la liste des parties du site
     * @param event
     * @example handleOpenList(e)
     */
    const handleOpenList = $((event: MouseEvent) => {
        event.stopPropagation();
        isMenu.value = false;
    });

    /**
     * @description handler pour refermer la liste des parties du site
     * @example handleCLoseList()
     */
    const handleCloseList = $(() => {
        isMenu.value = true
    });

    // Gestion du clic en dehors du truc pour refermer la liste
    useVisibleTask$(() => {
        const html = document.querySelector("html");
        const outsideClickListener = () => {
            isMenu.value = true;
        };
        html?.addEventListener("click", outsideClickListener);

        return () => {
            html?.removeEventListener("click", outsideClickListener);
        };
    });

    return <nav id="quick-access">  
        <div class={"menu " + (isMenu.value ? "" : "hidden")}>
            <p class="quick-access-button" onClick$={handleOpenList}>
                <img src={`${base}assets/menu.png`}/>
                <span>{tr(t.quick_access, lang)}</span>
            </p>
        </div>
        <div class={"list " + (isMenu.value ? "hidden" : "")}>
            <p><a onClick$={handleCloseList} href="#character">⋙ <u>{tr(t.random_character, lang)}</u></a></p>
            <p><a onClick$={handleCloseList} href="#vs-race">⋙ <u>{tr(t.random_course_route, lang)}</u></a></p>
            <p><a onClick$={handleCloseList} href="#battle-mode">⋙ <u>{tr(t.random_battle_arena, lang)}</u></a></p>
        </div>
    </nav>
})