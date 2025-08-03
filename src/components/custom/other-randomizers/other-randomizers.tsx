import { component$ } from "@builder.io/qwik";
import "./other-randomizers.scss"

export default component$(() => {
    return <div id="other-randomizers-container">
        <a href="https://ericthiberge.fr/mario-kart-world-randomizer" class="not-selected">Mario Kart World Randomizer</a>
        <a href="https://ericthiberge.fr/Mario-Kart-Randomizer" class="not-selected">Mario Kart 8 Deluxe + Booster Course Pass Randomizer</a>
    </div>
})