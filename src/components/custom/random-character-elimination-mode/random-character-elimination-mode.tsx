import { $, component$, Signal, useContext, useSignal } from "@builder.io/qwik"
import "./random-character-elimination-mode.scss"
import charactersData from "../../../data/characters.json"
import vehiclesData from "../../../data/vehicles.json"
import tiresData from "../../../data/tires.json"
import glidersData from "../../../data/gliders.json"
import textsData from "../../../internationalization/texts.json"
import { base } from "~/common/constants"
import { tr } from "~/common/functions"
import { langContext } from "~/common/contexts"

interface RandomCharacterEliminationModeProps {
    numberOfPlayers : number
}

export default component$((props : RandomCharacterEliminationModeProps) => {

    const lang = useContext(langContext)
    const t = textsData.texts

    const allCharacters = charactersData.characters as Record<string, any>
    const allVehicles = vehiclesData.vehicles as Record<string, any>
    const allTires = tiresData.tires as Record<string, any>
    const allGliders = glidersData.gliders as Record<string, any>

    const arrayCharacters = Object.values(allCharacters)
    const arrayVehicles = Object.values(allVehicles)
    const arrayTires = Object.values(allTires)
    const arrayGliders = Object.values(allGliders)

    const pickedCharacters = useSignal<string[]>([])
    const pickedVehicles = useSignal<string[]>([])
    const pickedTires = useSignal<string[]>([])
    const pickedGliders = useSignal<string[]>([])

    const currentCharacters = useSignal<string[]>([])
    const currentVehicles = useSignal<string[]>([])
    const currentTires = useSignal<string[]>([])
    const currentGliders = useSignal<string[]>([])

    const currentPlayers = useSignal<any[]>([])

    const allColors = [
        "yellow", "blue", "red", "green", "orange", "cyan", "pink", "violet"
    ]

    const allPlayers = [
        tr(t.p1, lang),
        tr(t.p2, lang),
        tr(t.p3, lang),
        tr(t.p4, lang),
        tr(t.p5, lang),
        tr(t.p6, lang),
        tr(t.p7, lang),
        tr(t.p8, lang)
    ]

    const playerColors = Array.from({ length: props.numberOfPlayers }, (_, i) => ({
        p: allPlayers[i],
        color: allColors[i]
    }))

    const randomElement = $((arrayElements : any[], pickedElements : Signal, currentElements : Signal) => {
        if (arrayElements.length - pickedElements.value.length < props.numberOfPlayers) {
            currentElements.value = []
            return
        } else {
            for (let i = 0; i < props.numberOfPlayers; i++) {
                let currentElement = arrayElements[Math.floor(Math.random() * arrayElements.length)]
                while (pickedElements.value.includes(currentElement.slug) || currentElements.value.includes(currentElement.slug)) {
                    currentElement = arrayElements[Math.floor(Math.random() * arrayElements.length)]
                }
                currentElements.value[i] = currentElement.slug
            }
            pickedElements.value = [...pickedElements.value, ...currentElements.value]
        }
    })

    const _ = $(async () => {console.log("")})
    const __ = $(() => {console.log("")})

    const handleRandomCharacter = $(async () => {
        currentCharacters.value = []
        currentVehicles.value = []
        currentTires.value = []
        currentGliders.value = []

        randomElement(arrayCharacters, pickedCharacters, currentCharacters)
        randomElement(arrayVehicles, pickedVehicles, currentVehicles)
        randomElement(arrayTires, pickedTires, currentTires)
        randomElement(arrayGliders, pickedGliders, currentGliders)
        currentPlayers.value = []

        await _().then(() => {__()}) // ligne de code de fou furieux mais j'en ai besoin pour que ça marche

        for (let i = 0; i < props.numberOfPlayers; i++) {
            currentPlayers.value[i] = {
                character: currentCharacters.value[i],
                vehicle: currentVehicles.value[i],
                tire: currentTires.value[i],
                glider: currentGliders.value[i]
            }
        }
    })

    const handleResetCharacters = $(() => {
        currentCharacters.value = []
        pickedCharacters.value = []
    })

    const handleResetVehicles = $(() => {
        currentVehicles.value = []
        pickedVehicles.value = []
    })

    const handleResetTires = $(() => {
        currentTires.value = []
        pickedTires.value = []
    })

    const handleResetGliders = $(() => {
        currentGliders.value = []
        pickedGliders.value = []
    })

    const handleResetAll = $(() => {
        handleResetCharacters()
        handleResetVehicles()
        handleResetTires()
        handleResetGliders()

        currentPlayers.value = []
    })

    return <section id="random-character-elimination-mode">

        <button class="main-button glass" onClick$={$(() => handleRandomCharacter())}>{tr(t.choose, lang)}</button>
        
        <div class="player-indicators">
            {playerColors.map((p : any, index : any) => (
                <div key={index} class={"player-indicator glass " + p.color}>{p.p}</div>
            ))}
        </div>

        <div class="medium-width current-course current-character glass gold">
            {pickedCharacters.value.length == 0 && <span><b>{tr(t.no_combination, lang)}</b></span>}

            {arrayCharacters.length - pickedCharacters.value.length < props.numberOfPlayers && <span><b>{tr(t.not_enough_characters, lang)}</b></span>}
            {arrayVehicles.length - pickedVehicles.value.length < props.numberOfPlayers && <span><b>{tr(t.not_enough_vehicles, lang)}</b></span>}
            {arrayTires.length - pickedTires.value.length < props.numberOfPlayers && <span><b>{tr(t.not_enough_tires, lang)}</b></span>}
            {arrayGliders.length - pickedGliders.value.length < props.numberOfPlayers && <span><b>{tr(t.not_enough_gliders, lang)}</b></span>}

            {currentPlayers.value.length != 0 && currentPlayers.value.map((currentPlayer : any, index : number) => (
                    <span><b>{tr(t.player, lang)} {index+1}</b>{" • "}
                        {allCharacters[currentPlayer.character]?.names[lang] || "???"}{", "}
                        {allVehicles[currentPlayer.vehicle]?.names[lang] || "???"}{", "}
                        {allTires[currentPlayer.tire]?.names[lang] || "???"}{", "}
                        {allGliders[currentPlayer.glider]?.names[lang] || "???"}
                    </span>
                )  
            )}


        </div>

        <h3>{tr(t.characters, lang)}</h3>
        <div class="element-grid">
            {Object.values(allCharacters).map((character : any, index : number) => (
                <div 
                    key={index} 
                    class={"element not-selected" + 
                        (pickedCharacters.value.includes(character.slug) ? " gray" : " ") +
                        (currentCharacters.value[0] == character.slug ? " yellow" : " ") +
                        (currentCharacters.value[1] == character.slug ? " blue" : " ") +
                        (currentCharacters.value[2] == character.slug ? " red" : " ") +
                        (currentCharacters.value[3] == character.slug ? " green" : " ") +
                        (currentCharacters.value[4] == character.slug ? " orange" : " ") +
                        (currentCharacters.value[5] == character.slug ? " cyan" : " ") +
                        (currentCharacters.value[6] == character.slug ? " pink" : " ") +
                        (currentCharacters.value[7] == character.slug ? " violet" : " ")
                    }
                >
                    <img src={base + "characters/" + character.skins[0].image}></img>
                </div>
            ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleResetCharacters())}>{tr(t.reset, lang)}</button>

        <h3>{tr(t.vehicles, lang)}</h3>
        <div class="element-grid">
            {Object.values(allVehicles).map((vehicle : any, index : number) => (
                <div 
                    key={index} 
                    class={"element not-selected" + 
                        (pickedVehicles.value.includes(vehicle.slug) ? " gray" : " ") +
                        (currentVehicles.value[0] == vehicle.slug ? " yellow" : " ") +
                        (currentVehicles.value[1] == vehicle.slug ? " blue" : " ") +
                        (currentVehicles.value[2] == vehicle.slug ? " red" : " ") +
                        (currentVehicles.value[3] == vehicle.slug ? " green" : " ") +
                        (currentVehicles.value[4] == vehicle.slug ? " orange" : " ") +
                        (currentVehicles.value[5] == vehicle.slug ? " cyan" : " ") +
                        (currentVehicles.value[6] == vehicle.slug ? " pink" : " ") +
                        (currentVehicles.value[7] == vehicle.slug ? " violet" : " ")
                    }
                >
                    <img src={base + "vehicles/" + vehicle.skins[0].image}></img>
                </div>
            ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleResetVehicles())}>{tr(t.reset, lang)}</button>

        <h3>{tr(t.tires, lang)}</h3>
        <div class="element-grid">
            {Object.values(allTires).map((tire : any, index : number) => (
                <div 
                    key={index} 
                    class={"element not-selected" + 
                        (pickedTires.value.includes(tire.slug) ? " gray" : " ") +
                        (currentTires.value[0] == tire.slug ? " yellow" : " ") +
                        (currentTires.value[1] == tire.slug ? " blue" : " ") +
                        (currentTires.value[2] == tire.slug ? " red" : " ") +
                        (currentTires.value[3] == tire.slug ? " green" : " ") +
                        (currentTires.value[4] == tire.slug ? " orange" : " ") +
                        (currentTires.value[5] == tire.slug ? " cyan" : " ") +
                        (currentTires.value[6] == tire.slug ? " pink" : " ") +
                        (currentTires.value[7] == tire.slug ? " violet" : " ")
                    }
                >
                    <img src={base + "tires/" + tire.skins[0].image}></img>
                </div>
            ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleResetTires())}>{tr(t.reset, lang)}</button>

        <h3>{tr(t.gliders, lang)}</h3>
        <div class="element-grid">
            {Object.values(allGliders).map((glider : any, index : number) => (
                <div 
                    key={index} 
                    class={"element not-selected" + 
                        (pickedGliders.value.includes(glider.slug) ? " gray" : " ") +
                        (currentGliders.value[0] == glider.slug ? " yellow" : " ") +
                        (currentGliders.value[1] == glider.slug ? " blue" : " ") +
                        (currentGliders.value[2] == glider.slug ? " red" : " ") +
                        (currentGliders.value[3] == glider.slug ? " green" : " ") +
                        (currentGliders.value[4] == glider.slug ? " orange" : " ") +
                        (currentGliders.value[5] == glider.slug ? " cyan" : " ") +
                        (currentGliders.value[6] == glider.slug ? " pink" : " ") +
                        (currentGliders.value[7] == glider.slug ? " violet" : " ")
                    }
                >
                    <img src={base + "gliders/" + glider.skins[0].image}></img>
                </div>
            ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleResetGliders())}>{tr(t.reset, lang)}</button>

        <button class="main-button glass red" onClick$={$(() => handleResetAll())}>{tr(t.reset_all, lang)}</button>

    </section>
})