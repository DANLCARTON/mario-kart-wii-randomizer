//////////////////////////////// Gestion des personnage et kart aléatoire
// COMPOSANT RANDOM CHARACTER //
////////////////////////////////

import { $, component$, Signal, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import {Stats, type Names} from "~/common/types"

import charactersData from "~/data/characters.json"
import vehiclesData from "~/data/vehicles.json"
import skinsData from "~/data/skins.json"
import tiresData from "~/data/tires.json"
import glidersData from "~/data/gliders.json"

import "./random-character.scss"
import { langContext, pickedCharactersContext, pickedVehiclesContext, playerNamesContext, pickedGlidersContext, pickedTiresContext } from "~/common/contexts";
import { getDomain, writeCookie } from "~/common/functions";
import Statistics from "../statistics/statistics";
import { base, cPN } from "~/common/constants";

type Character = {
    names : Names,
    skins : CharacterSkin[],
    stats : Stats,
    slug : string
}

type Vehicle = {
    names : Names,
    stats : Stats,
    image : string | null
    skins : VehicleSkin[]
    slug : string
}

type CharacterSkin = {
    slug : string | null,
    image : string | null
}

type Skin = {
    names : Names
    slug : string
}

type VehicleSkin = {
    slug : string,
    image : string | null,
    match : string | string[]
}

interface RandomCharacterProps {
    rerollSignal : Signal,
    playerName : string,
    playerDefaultName : string,
    playerNumber : number
    allDifferent : boolean
    numberOfPlayers : number;
}

export default component$((props : RandomCharacterProps) => {

    const currentCharacter = useSignal<Character>(charactersData.characters.mario)
    const currentVehicle = useSignal<Vehicle>(vehiclesData.vehicles.standard_kart)
    const currentTire = useSignal<Vehicle>(tiresData.tires.standard)
    const currentGlider = useSignal<Vehicle>(glidersData.gliders.super_glider)
    const currentCharacterImage = useSignal<string | null>("placeholder.webp")
    const currentSkin = useSignal<Skin>(skinsData.skins.default)
    const currentVehicleSkin = useSignal<VehicleSkin>({slug: "slug", image: "image", match: "all"})
    const currentTireSkin = useSignal<VehicleSkin>({slug: "slug", image: "image", match: "all"})
    const currentGliderSkin = useSignal<VehicleSkin>({slug: "slug", image: "image", match: "all"})
    const playerNameSignal = useSignal<string>(props.playerName)

    const lang : string = useContext(langContext)
    const playerNames = useContext(playerNamesContext)
    const pickedCharacters = useContext(pickedCharactersContext)
    const pickedVehicles = useContext(pickedVehiclesContext)
    const pickedTires = useContext(pickedTiresContext)
    const pickedGliders = useContext(pickedGlidersContext)

    // GETTERS

    /**
     * @description permet d'avoir le nom du personnage choisi dans la langue donnée
     * @param character objet du personnage
     * @param lang langue de l'utilisateur
     * @returns string : avec le nom du personnage dans la langue donnée
     * @example getCharacterName(character.mario, lang)
     */
    const getCharacterName = (character : Character, lang : string) : string => {
        const names = character.names as Record<string, string>
        return names[lang]
    }

    /**
     * @description permet d'avoir le nom du véhicule choisi dans la langue donnée
     * @param vehicle objet du véhicule
     * @param lang langue de l'utilisateur
     * @returns string : avec le nom du véhicule dans la langue donnée
     * @example getVehicleName(vehicles.standard_kart, lang)
     */
    const getVehicleName = (vehicle : Vehicle, lang : string) : string => {
        const names = vehicle.names as Record<string, string>
        return names[lang]
    }

    /**
     * @description permet d'avoir le nom de la roue choisie dans la langue donnée
     * @param tire objet de la roue
     * @param lang langue de l'utilisateur
     * @returns string : avec le nom du véhicule dans la langue donnée
     * @example getVehicleName(vehicles.standard_kart, lang)
     */
    const getTireName = (tire : Vehicle, lang : string) : string => {
        const names = tire.names as Record<string, string>
        return names[lang]
    }

    /**
     * @description permet d'avoir le nom de l'aile choisie dans la langue donnée
     * @param glider objet de la roue
     * @param lang langue de l'utilisateur
     * @returns string : avec le nom du véhicule dans la langue donnée
     * @example getVehicleName(vehicles.standard_kart, lang)
     */
    const getGliderName = (glider : Vehicle, lang : string) : string => {
        const names = glider.names as Record<string, string>
        return names[lang]
    }

    // GESTION PERSONNAGES, SKINS ET VEHICULES  

    /**
     * @description permet de tirer aléatoirement un personnage
     * @example getRandomCharacter()
     */
    const getRandomCharacter = $(() : void => {
        const entries = Object.values(charactersData.characters)
        let index = Math.floor(Math.random() * entries.length)
        let slug = entries[index].slug
        if (props.allDifferent) {
            while (pickedCharacters.value.includes(slug)) {
                index = Math.floor(Math.random() * entries.length)
                slug = entries[index].slug
            }
        }
        pickedCharacters.value[props.playerNumber] = slug
        currentCharacter.value = entries[index]
    })

    /**
     * @description permet de tirer aléatoirement un skin
     * @example getRandomSkin()
     */
    const getRandomSkin = $(() : void => {
        const slugLength = currentCharacter.value.skins.length
        const index = Math.floor(Math.random() * slugLength)
        const slug = currentCharacter.value.skins[index].slug
        currentCharacterImage.value = currentCharacter.value.skins[index].image
        currentSkin.value = (skinsData.skins as Record<string, Skin>)[slug as string]
    })

    /**
     * @description permet de tirer aléatoirement un véhicule
     * @example getRandomVehicle()
     */
    const getRandomVehicle = $(() : void => {
        const entries = Object.values(vehiclesData.vehicles)
        let index = Math.floor(Math.random() * entries.length)
        let slug = entries[index].slug
        if (props.allDifferent) {
            while (pickedVehicles.value.includes(slug)) {
                index = Math.floor(Math.random() * entries.length)
                slug = entries[index].slug
            }
        }
        pickedVehicles.value[props.playerNumber] = slug
        currentVehicle.value = entries[index]
    })

    /**
     * @description permet de tirer aléatoirement une roue
     * @example getRandomTire()
     */
    const getRandomTire = $(() : void => {
        const entries = Object.values(tiresData.tires)
        let index = Math.floor(Math.random() * entries.length)
        let slug = entries[index].slug
        if (props.allDifferent) {
            while (pickedTires.value.includes(slug)) {
                index = Math.floor(Math.random() * entries.length)
                slug = entries[index].slug
            }
        }
        pickedTires.value[props.playerNumber] = slug
        currentTire.value = entries[index]
    })

    /**
     * @description permet de tirer aléatoirement une aile
     * @example getRandomGlider()
     */
    const getRandomGlider = $(() : void => {
        const entries = Object.values(glidersData.gliders)
        const index = Math.floor(Math.random() * entries.length)
        const slug = entries[index].slug
        // pour les gliders on ne prendra pas en compte le paramètre "tous différents" car il n'y a que 7 gliders pour 8 joueurs
        // ça causerais une boucle infinie
        pickedGliders.value[props.playerNumber] = slug
        currentGlider.value = entries[index]
    })

    /**
     * @description permet d'obtenir le skin du véhicule correspondant au personnage en cours
     * @example getVehicleSkin()
     */
    const getVehicleSkin = $(() : void => {
        if (currentVehicle.value.skins.length == 1) { // si il n'y a qu'un seul skin disponible pour le kart
            currentVehicleSkin.value = currentVehicle.value.skins[0] // on affiche juste l'image par défaut.
        } else { // si il y a plusieurs skins disponibles pour le kart
            currentVehicle.value.skins.map((skin : VehicleSkin) => { // on défile dans les skins dispo pour le kart
                let slug
                if (currentCharacter.value.slug == "yoshi") { // cas particuler si le perso sélectionné est yoshi
                    slug = `yoshi|${currentSkin.value.slug}` // il faut indiquer le skin en plus
                } else {
                    slug = currentCharacter.value.slug
                }
                if (skin.match.includes(slug)) { // si il y a une correspondance
                    currentVehicleSkin.value = skin
                }
            })
        }
    })

    /**
     * @description permet d'obtenir le skin de la roue correspondant au personnage en cours
     * @example getTireSkin()
     */
    const getTireSkin = $(() : void => {
        currentTireSkin.value = currentTire.value.skins[0] // on affiche juste l'image par défaut étant donné qu'il n'y a pas de skins pour les roues
    })

    /**
     * @description permet d'obtenir le skin de l'aile correspondant au personnage en cours
     * @example getGliderSkin()
     */
    const getGliderSkin = $(() : void => {
        if (currentGlider.value.skins.length == 1) { // si il n'y a qu'un seul skin disponible pour le kart
            currentGliderSkin.value = currentGlider.value.skins[0] // on affiche juste l'image par défaut.
        } else { // si il y a plusieurs skins disponibles pour le kart
            currentGlider.value.skins.map((skin : VehicleSkin) => { // on défile dans les skins dispo pour le kart
                const slug = currentCharacter.value.slug
                if (skin.match.includes(slug)) currentGliderSkin.value = skin
            })
        }
    })

    // HANDLERS

    /**
     * @description handler clic sur un personnage
     * @example handleRandomCharacter()
     */
    const handleRandomCharacter = $(() : void => {
        getRandomCharacter()
        getRandomSkin()
    })

    /**
     * @description handler clic sur un vehicule
     * @example handleRandomVehicle()
     */
    const handleRandomVehicle = $(() : void => {
        getRandomVehicle()
        getVehicleSkin()
    })

    /**
     * @description handler clic sur une roue
     * @example handleRandomTire()
     */
    const handleRandomTire = $(() : void => {
        getRandomTire()
        getTireSkin()
    })

    /**
     * @description handler clic sur une aile
     * @example handleRandomTire()
     */
    const handleRandomGlider = $(() : void => {
        getRandomGlider()
        getGliderSkin()
    })

    /**
     * @description handler lors de la saisie d'un nom pour le joueur
     * @param e event du input text
     * @example handlePlayerName(e)
     */
    const handlePlayerName = $((e : any) => {
        playerNameSignal.value = e.target.value.replace("|", "")
        playerNames[props.playerNumber] = playerNameSignal.value
        const cookieValue = playerNames.join("|")
        const domain = getDomain()
        writeCookie(cPN, cookieValue, domain)
    })
    
    /**
     * @description handler nom de joueur vide
     * @param e event du input text
     * @example handleEmptyPlayerName(e)
     */
    const handleEmptyPlayerName = $((e: any) => {
        if (e.target.value.trim() === "") {
            playerNameSignal.value = props.playerDefaultName
            playerNames[props.playerNumber] = props.playerDefaultName
            const cookieValue = playerNames.join("|")
            const domain = getDomain()
            writeCookie(cPN, cookieValue, domain)
        }
    })

    useTask$(({track}) => {
        track(() => props.rerollSignal.value)
        handleRandomCharacter()
        handleRandomVehicle()
        handleRandomTire()
        handleRandomGlider()
    })

    return <>
    
        <article class="random-character glass">

            <input type="text" class="player-name glass" value={playerNameSignal.value} onKeyUp$={(e) => handlePlayerName(e)} onBlur$={(e) => handleEmptyPlayerName(e)}/>

            <div class="random-character-elements">

                <div onClick$={$(() => handleRandomCharacter())} class="character-container">
                    {currentCharacterImage.value == null ? (
                        <>
                        <img src={`${base}characters/placeholder.png`} width={150} height={202.5} alt={getCharacterName(currentCharacter.value, lang)}/>
                        </>
                    ) : (
                        <img src={`${base}characters/${currentCharacterImage.value}`} width={150} height={140} alt={getCharacterName(currentCharacter.value, lang)}/>
                    )}
                    <p class="character">{getCharacterName(currentCharacter.value, lang)}</p>
                </div>

                <div onClick$={$(() => handleRandomVehicle())} class="vehicle-container">
                    {currentVehicleSkin.value.image == null ? (
                        <img src={`${base}vehicles/tba1.webp`} width={150} height={105} alt={getVehicleName(currentVehicle.value, lang)} />
                    ) : (
                        <img src={`${base}vehicles/${currentVehicleSkin.value.image}`} width={150} height={101} alt={getVehicleName(currentVehicle.value, lang)} />
                    )}
                    <p class="character">{getVehicleName(currentVehicle.value, lang)}</p>
                </div>

                <div onClick$={$(() => handleRandomTire())} class="vehicle-container secondary">
                    {currentTireSkin.value.image == null ? (
                        <img src={`${base}vehicles/tba1.webp`} width={150} height={105} alt={getTireName(currentTire.value, lang)} />
                    ) : (
                        <img src={`${base}tires/${currentTireSkin.value.image}`} width={100} height={95} alt={getTireName(currentTire.value, lang)} />
                    )}
                    <p class="character">{getTireName(currentTire.value, lang)}</p>
                </div>

                <div onClick$={$(() => handleRandomGlider())} class="vehicle-container secondary">
                    {currentGliderSkin.value.image == null ? (
                        <img src={`${base}vehicles/tba1.webp`} width={150} height={105} alt={getGliderName(currentGlider.value, lang)} />
                    ) : (
                        <img src={`${base}gliders/${currentGliderSkin.value.image}`} width={100} height={77} alt={getGliderName(currentGlider.value, lang)} />
                    )}
                    <p class="character">{getGliderName(currentGlider.value, lang)}</p>
                </div>

            </div>

        </article>

        {props.numberOfPlayers == 1 && <Statistics 
            characterStats={currentCharacter.value.stats} 
            vehicleStats={currentVehicle.value.stats} 
            tireStats={currentTire.value.stats}
            gliderStats={currentGlider.value.stats}
        />}    

    </>
})