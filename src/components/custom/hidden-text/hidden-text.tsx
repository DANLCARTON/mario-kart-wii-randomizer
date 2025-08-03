/////////////////////////// Texte présent dans le code source mais pas affiché sur la page de sélection de la langue
// COMPOSANT HIDDEN TEXT // 
///////////////////////////

import { component$ } from "@builder.io/qwik"
import textData from "../../../internationalization/texts.json"
import { tr } from "~/common/functions"

export default component$(() => {

    const t = textData.texts

    return <section id="hidden-text">
        <p>Unleash chaos in Mario Kart Wii! Randomly pick characters, vehicle, and tracks for your next race. Available in 16 languages for global fun.</p>
        <p>{tr(t.random_character_description, "en_us")}</p>
        <p>{tr(t.random_course_description, "en_us")}</p>
        <p>{tr(t.random_battle_arena_description, "en_us")}</p>

        <p>{tr(t.custom_message, "fr_fr")}</p>
        <p>{tr(t.random_character_description, "fr_fr")}</p>
        <p>{tr(t.random_course_description, "fr_fr")}</p>
        <p>{tr(t.random_battle_arena_description, "fr_fr")}</p>

        <p>{tr(t.custom_message, "es_es")}</p>
        <p>{tr(t.random_character_description, "es_es")}</p>
        <p>{tr(t.random_course_description, "es_es")}</p>
        <p>{tr(t.random_battle_arena_description, "es_es")}</p>

        <p>{tr(t.custom_message, "pt_pt")}</p>
        <p>{tr(t.random_character_description, "pt_pt")}</p>
        <p>{tr(t.random_course_description, "pt_pt")}</p>
        <p>{tr(t.random_battle_arena_description, "pt_pt")}</p>

        <p>{tr(t.custom_message, "it")}</p>
        <p>{tr(t.random_character_description, "it")}</p>
        <p>{tr(t.random_course_description, "it")}</p>
        <p>{tr(t.random_battle_arena_description, "it")}</p>

        <p>{tr(t.custom_message, "de")}</p>
        <p>{tr(t.random_character_description, "de")}</p>
        <p>{tr(t.random_course_description, "de")}</p>
        <p>{tr(t.random_battle_arena_description, "de")}</p>

        <p>{tr(t.custom_message, "nl")}</p>
        <p>{tr(t.random_character_description, "nl")}</p>
        <p>{tr(t.random_course_description, "nl")}</p>
        <p>{tr(t.random_battle_arena_description, "nl")}</p>

        <p>{tr(t.custom_message, "ru")}</p>
        <p>{tr(t.random_character_description, "ru")}</p>
        <p>{tr(t.random_course_description, "ru")}</p>
        <p>{tr(t.random_battle_arena_description, "ru")}</p>

        <p>{tr(t.custom_message, "ja")}</p>
        <p>{tr(t.random_character_description, "ja")}</p>
        <p>{tr(t.random_course_description, "ja")}</p>
        <p>{tr(t.random_battle_arena_description, "ja")}</p>

        <p>{tr(t.custom_message, "ko")}</p>
        <p>{tr(t.random_character_description, "ko")}</p>
        <p>{tr(t.random_course_description, "ko")}</p>
        <p>{tr(t.random_battle_arena_description, "ko")}</p>

        <p>{tr(t.custom_message, "zh_hans")}</p>
        <p>{tr(t.random_character_description, "zh_hans")}</p>
        <p>{tr(t.random_course_description, "zh_hans")}</p>
        <p>{tr(t.random_battle_arena_description, "zh_hans")}</p>

        <p>{tr(t.custom_message, "zh_hant")}</p>
        <p>{tr(t.random_character_description, "zh_hant")}</p>
        <p>{tr(t.random_course_description, "zh_hant")}</p>
        <p>{tr(t.random_battle_arena_description, "zh_hant")}</p>
    </section>
})  