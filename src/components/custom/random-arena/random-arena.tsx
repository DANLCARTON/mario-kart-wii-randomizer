// //////////////////////////// Gestion des arènes bataille aléatoires
// // COMPOSANT RANDOM ARENA //
// ////////////////////////////

// import { $, component$, useContext, useSignal } from "@builder.io/qwik"
// import { globalParametersContext, langContext } from "~/common/contexts"
// import { Names } from "~/common/types"

// import arenasData from "~/data/arenas.json"

// import "./random-arena.scss"

// import textsData from "~/internationalization/texts.json"
// import { tr } from "~/common/functions"
// import { asianLangs } from "~/common/constants"

// type Arena = {
//     names : Names,
//     origin : string | null
//     image : string | null
// }

// export default component$(() => {
//     const lang = useContext(langContext)
//     const t = textsData.texts

//     const gpSignal = useContext(globalParametersContext) 

//     const selectedArenas = useSignal<string[]>([])
//     const current = useSignal<string>("")

//     const allArenas = arenasData.arenas as Record<string, Arena>

//     // GETTERS

//     /**
//      * @description récupération du nom de l'arène bataille sélectionnée dans la langue donnée
//      * @param arena objet de l'arène bataille
//      * @param lang langue de l'utilisateur
//      * @returns string : nom de l'arène bataille dans la langue donnée
//      * @example getArenaName(arenas.big_donut, lang)
//      */
//     const getArenaName = $((arena : Arena, lang : string) : string => {
//         const names = arena.names as Record<string, string>
//         return names[lang]
//     })

//     /**
//      * @description récupération de l'origin de l'arène bataille sélectionnée dans la langue donnée
//      * @param arena objet de l'arène bataille
//      * @param lang langue de l'utilisateur
//      * @returns string : nom de l'arène bataille dans la langue donnée
//      * @example getArenaName(arenas.big_donut, lang)
//      */
//     const getArenaOrigin = $((arena : Arena, lang : string) => {
//         let origin = arena.origin
//         if (asianLangs.includes(lang)) {
//             if (origin == "SNES") origin = "SFC"
//             if (origin == "GCN") origin = "GC"
//         }
//         return origin
//     })

//     /**
//      * @description ajoute l'arène bataille donnée dans la liste des arènes validées
//      * @param arenaIndex slug de l'arène
//      * @param button booléen qui determine si on a tiré aléatoirement ou si on a cliqué sur une arène. false par défaut
//      * @returns boolean : true si ajouté, false si déjà présent dans la liste des arènes validées
//      * @example addArena("big_donut", false)
//      */
//     const addArena = $((arenaIndex : string, button : boolean = false) : boolean => {
//         if (!selectedArenas.value.includes(arenaIndex)) {
//             selectedArenas.value = [...selectedArenas.value, arenaIndex]
//             current.value = arenaIndex

//             if (button == true && gpSignal.value.autoScroll) {
//                 const arenaElement = document.getElementById(`arena${arenaIndex}`)
//                 arenaElement?.scrollIntoView({
//                     behavior: "smooth",
//                     block: "center"
//                 })
//             }
//             return true
//         }
//         return false
//     })
//     /**
//      * @description tire aléatoirement une arène bataille
//      * @param button booleen en fonction de si on a appuyé sur choisir ou si on a cliqué directement sur une arène
//      * @example getRandomArena(false)
//      */
//     const getRandomArena = $(async (button : boolean) : Promise<void> => {
//         const arenaKeys = Object.keys(allArenas)
//         const allItems = []

//         for (const arenaKey of arenaKeys) {
//             allItems.push(arenaKey)
//         }

//         const totalSelected = selectedArenas.value.length

//         if (totalSelected < allItems.length) {
//             while (true) {
//                 const randomIndex = Math.floor(Math.random() * allItems.length)
//                 const selected = allItems[randomIndex]

//                 if (await addArena(selected, button)) break
//             }
//         } else {
//             alert(tr(t.all_arenas, lang))
//         }
//     })

//     /**
//      * @description retire une arène donnée de la liste des arènes validées
//      * @param arenaIndex slug de l'arène à retirer
//      * @example removeArena("big_donut")
//      */
//     const removeArena = $((arenaIndex : string) : void => {
//         if (selectedArenas.value.includes(arenaIndex)) {
//             selectedArenas.value = selectedArenas.value.filter((arena : string) => (
//                 arena !== arenaIndex
//             ))
//             if (arenaIndex == current.value) {
//                 current.value = ""
//             }
//         }
//     })

//     /**
//      * @description remet à vide la liste des arènes validées
//      * @example resetArena()
//      */
//     const resetArena = $(() : void => {
//         selectedArenas.value = []
//         current.value = ""
//     })

//     /**
//      * @description handler clic sur Choisir
//      * @param button en principe c'est forcément true jsp pourquoi il est là lui
//      * @example handleRandomArena(true)
//      */
//     const handleRandomArena = $((button : boolean = false) : void => {
//         getRandomArena(button)
//     })

//     /**
//      * @description handler clic sur une arène
//      * @param arenaIndex slug de l'arène à ajouter
//      * @example handleSelectArena("big_donut")
//      */
//     const handleSelectArena = $((arenaIndex : string) : void => {
//         addArena(arenaIndex)
//     })

//     /**
//      * @description handler clic sur une arène déjà validée
//      * @param areneIndex slug de l'arene a retirer
//      * @example handleUnselectArena("big_donut")
//      */
//     const handleUnselectArena = $((areneIndex : string) : void => {
//         removeArena(areneIndex)
//     })

//     /**
//      * @description handler clic sur remettre à zero
//      * @example handleReset()
//      */
//     const handleReset = $(() : void => {
//         resetArena()
//     })

//     return <section id="random-arena-container">
//         <button class="main-button white glass" onClick$={$(() => handleRandomArena(true))}>{tr(t.choose, lang)}</button>
//         <div class="medium-width current-course glass gold">
//             {current.value == "" ? (
//                 <span>{tr(t.no_battle_arena, lang)}</span>
//             ) : (
//                 <span>{getArenaName(allArenas[current.value], lang)}</span>
//             )}
//         </div>
//         <div class="cups">
//             <article class="cup arenas glass">
//                 <h3>{tr(t.battle_arenas, lang)}</h3>
//                 <div class="arena-container">
//                     {Object.entries(allArenas).map(([arenaId, arena], index : any) => {
//                         const isSelected = selectedArenas.value.includes(arenaId)
//                         const isCurrent = current.value == arenaId
//                         return <p key={index} id={`arena${arenaId}`} class={isCurrent ? 'current' : isSelected ? "selected" : "not-selected"} onClick$={$(() => isSelected ? handleUnselectArena(arenaId) : handleSelectArena(arenaId))}>
//                             <span class="prefix">{getArenaOrigin(arena, lang)}</span> {getArenaName(arena, lang)}
//                         </p>
//                     })}
//                 </div>
//             </article>
//         </div>
//         <button class="main-button glass red" onClick$={$(() => handleReset())}>{tr(t.reset, lang)}</button>
//     </section>
// })

import {$, component$, useContext, useSignal} from "@builder.io/qwik"
import {type Names, Arena, Course, Cup, Item} from "~/common/types"
// import ArenaComponent from "~/components/custom/arena/arena"
import ArenaComponent from "../arena/arena"
import arenaCupsData from "~/data/arena-cups.json"
import arenasData from "~/data/arenas.json"

import "../random-course/random-course.scss"

import textsData from "~/internationalization/texts.json"
import { getCourseName, tr } from "~/common/functions"
import { globalParametersContext, langContext, selectedArenasContext } from "~/common/contexts"

export default component$(() => {

    const selectedArenas = useContext(selectedArenasContext)
    const current = useSignal<string>("")

    const lang = useContext(langContext)
    const t = textsData.texts

    const gpSignal = useContext(globalParametersContext)

    const allArenas = arenasData.arenas as Record<string, Arena>
    const allArenaCups = arenaCupsData.arena_cups as Record<string, Cup>

    const arenaItems : Item[] = []

    for (const arenaKey of Object.keys(allArenas)) {
        arenaItems.push({type: "course", index: arenaKey})
    }

    const getArenaCupName = $((cup : Cup, lang : string) : string => {
        const names = cup.names as Record<string, string>
        return names[lang]
    })
    
    const isArenaCupFullySelected = (cup : Cup) : boolean => {
        return cup.courses.every((courseId => selectedArenas.value.includes(courseId)))
    }

    const addArena = $((arenaIndex : string) : boolean => {
        if (!selectedArenas.value.includes(arenaIndex)) {
            selectedArenas.value = [...selectedArenas.value, arenaIndex]
            if (gpSignal.value.autoScroll) {
                const arenaElement = document.getElementById(arenaIndex)
                arenaElement?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }
            return true
        }
        return false
    })

    const getRandomArena = $(async () : Promise<void> => {
        const totalSelected = selectedArenas.value.length
        const totalAvailable = 10

        if (totalSelected < totalAvailable) {
            while (true) {
                let item = arenaItems[Math.floor(Math.random() * arenaItems.length)]
                let key = item.index

                while (selectedArenas.value.includes(key)) {
                    item = arenaItems[Math.floor(Math.random() * arenaItems.length)]
                    key = item.index
                }

                current.value = key

                if (await addArena(item.index)) break
            }
        } else {
            alert(tr(t.all_arenas, lang))
        }
    })

    const resetArenas = $(() : void => {
        selectedArenas.value = []
    })

    const resetCurrent = $(() : void => {
        current.value = ""
    })

    const handleRandomArena = $(() : void => {
        getRandomArena()
    })

    const handleReset = $(() : void => {
        resetArenas()
        resetCurrent()
    })

    return <section id="random-course-container">
        <button class="main-button glass" onClick$={$(() => handleRandomArena())}>{tr(t.choose, lang)}</button>
        <div class="medium-width current-course glass gold">
            {current.value == "" ? (
                <span>{tr(t.no_battle_arena, lang)}</span>
            ) : (
                <span>{getCourseName(allArenas[current.value] as Course, lang)}</span> // ??????????????
            )}
        </div>
        <div class="cups arena-cups">
            {Object.values(allArenaCups).map((cup : Cup, index : any) => (
                <article class="cup glass" key={index}>
                    <h3>{getArenaCupName(cup, lang)}</h3>
                    {cup.courses.map((arenaIndex : string, index : any) => {
                        const arena = allArenas[arenaIndex]
                        const isArenaSelected = selectedArenas.value.includes(arenaIndex)

                        return <ArenaComponent 
                            key={index}
                            course={arena}
                            allCourses={allArenas}
                            isCourseSelected={isArenaSelected}
                            courseIndex={arenaIndex}
                            current={current}
                            allRoutesKeys={[]}
                        />
                    })}
                </article>
            ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleReset())}>{tr(t.reset, lang)}</button>
    </section>
})