////////////////////////// affichage d'une super photo de thomas
// COMPOSANT EASTER EGG //
//////////////////////////

import { component$ } from "@builder.io/qwik";
import EasterEggResizedImg from "~/media/assets/easter_egg_resized.jpg?jsx"

import "./easter-egg.scss"

export default component$(() => {
    return <div class="easter-egg">
        <EasterEggResizedImg style={{
            width: "15px",
            height: "15px",
        }} alt="cc cv ?"/>
    </div>
})