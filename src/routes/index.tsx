import { component$, useSignal, useContext, $ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import RandomCharacter from "~/components/custom/random-character/random-character";
import RandomCourse from "~/components/custom/random-course/random-course";

import { langContext, playerNamesContext } from "~/common/contexts";

import "./styles.scss"
import LanguageSelection from "~/components/custom/language-selection/language-selection";
import RandomArena from "~/components/custom/random-arena/random-arena";

import textData from "~/internationalization/texts.json"

import { getDomain, tr, writeCookie } from "~/common/functions"
import { useCharacterParameters } from "./layout";
import QuickAccess from "~/components/custom/quick-access/quick-access";
import HiddenText from "~/components/custom/hidden-text/hidden-text";
import { cCP } from "~/common/constants";
import RandomCharacterEliminationMode from "~/components/custom/random-character-elimination-mode/random-character-elimination-mode";

export default component$(() => {

    const lang : string = useContext(langContext)
    const playerNames : string[] = useContext(playerNamesContext)

    const cp = useCharacterParameters()

    const allDifferent = useSignal<boolean>(cp.value.allDifferent)
    const numberOfPlayers = useSignal<number>(cp.value.numberOfPlayers)

    const eliminationMode = useSignal<boolean>(false)

    const rerollSignal = useSignal<number>(0)
    
    const t = textData.texts

    /**
     * @description handler qui permet de mettre à jour le signal permettant de tirer aléatoirement des nouveaux persos et véhicules
     * @example handleRerollSignal()
     */
    const handleRerollSignal = $(() => {
        rerollSignal.value++
    })

    /**
     * @description handler activation descativation du paramètre persos et karts tous différents (changement du paramètre et écriture du cookie)
     * @example handleAllDifferent()
     */
    const handleAllDifferent = $(() => {
        allDifferent.value = !allDifferent.value

        const domain = getDomain()
        const cookieValue = `${allDifferent.value}|${numberOfPlayers.value}`
        writeCookie(cCP, cookieValue, domain)
    })

    
    /**
     * @description handler changement du paramètre du choix du nombre de joueurs (changement du paramètre et écriture du cookie)
     * @param e event input slider
     * @example handleNumberOfPlayers(e)
     */
    const handleNumberOfPlayers = $((e : any) => {
        const value = e.target.value
        numberOfPlayers.value = value

        const domain = getDomain()
        const cookieValue = `${allDifferent.value}|${numberOfPlayers.value}`
        writeCookie(cCP, cookieValue, domain)
    })

    const defaultPlayersTexts = [t.p1, t.p2, t.p3, t.p4, t.p5, t.p6, t.p7, t.p8]

    return <main class="large-width">

        {lang == "no-lang" ? <>
        
            <HiddenText />

            <h1>MARIO KART WII RANDOMIZER</h1>

            <h2 class="language-title">Sélectionner une langue / Select a language / Seleccione una idioma / Selecione um idioma / Seleziona una lingua / Wählen Sie eine Sprache aus / Selecteer een taal / Выберите язык / 言語を選択してください / 언어를 선택하세요 / 选择语言 / 選擇語言</h2>

            <LanguageSelection />

        </> : <>

            <h1>MARIO KART WII RANDOMIZER</h1>

            {/* <h2 id='character'>{tr(t.character_title, lang)}</h2>
            {eliminationMode.value ? (
                <p class="part-desc medium-width">{tr(t.random_character_description_elimiation_mode, lang)}</p>
            ) : ( */}
                <p class="part-desc medium-width">{tr(t.random_character_description, lang)}</p>
            {/* )} */}

            {/* <div class="mode-selection glass">
                <div class={"mode" + (eliminationMode.value == false ? " current-mode" : "")} onClick$={() => eliminationMode.value = false}>{tr(t.normal_mode, lang)}</div>
                <div class={"mode" + (eliminationMode.value == true ? " current-mode" : "")} onClick$={() => eliminationMode.value = true}>{tr(t.elimination_mode, lang)}</div>
            </div> */}

            <div class="parameters-container glass">
                <h3>{tr(t.parameters, lang)} :</h3>
                <div class="number-of-players">
                    <label for="players-slider">{tr(t.number_of_players, lang)} : {numberOfPlayers.value}</label>
                    <br />
                    <input id="players-slider" type="range" min="1" max="4" step="1" value={numberOfPlayers.value} onInput$={$((e) => handleNumberOfPlayers(e))} />
                    <p class="part-desc-param">
                        {eliminationMode.value ? tr(t.number_of_players_description_elimination_mode, lang) : tr(t.number_of_players_description_normal_mode, lang)} </p>
                </div>
                {!eliminationMode.value && <div class="all-different">
                    <input id="all-different" type="checkbox" onClick$={() => handleAllDifferent()} checked={allDifferent.value}></input>
                    <label for="all-different">{tr(t.all_different, lang)}</label>
                    <p class='part-desc-param'>{tr(t.all_different_description, lang)}</p>
                </div>}
            </div>

            {!eliminationMode.value && <>
                <button class="main-button glass" onClick$={() => handleRerollSignal()}>{tr(t.generate, lang)}</button>
                <section id="random-character-container" >
                    {Array.from({ length: numberOfPlayers.value }).map((_, i) => (
                        <RandomCharacter key={i} rerollSignal={rerollSignal} playerName={playerNames[i] ? playerNames[i] : tr(defaultPlayersTexts[i], lang)} playerDefaultName={tr(defaultPlayersTexts[i], lang)} playerNumber={i} allDifferent={allDifferent.value} numberOfPlayers={numberOfPlayers.value}/>
                    ))}
                </section>
            </>}

            {eliminationMode.value && <>
                <RandomCharacterEliminationMode numberOfPlayers={numberOfPlayers.value}/>
            </>}

            <h2 id="vs-race">{tr(t.vs_race, lang)} : {tr(t.course_title, lang)}</h2>
            <p class="part-desc medium-width">{tr(t.random_course_description, lang)}</p>
            <RandomCourse />

            <h2 id="battle-mode">{tr(t.battle_mode, lang)} : {tr(t.arena_title, lang)} </h2>
            <p class="part-desc medium-width">{tr(t.random_battle_arena_description, lang)}</p>
            <RandomArena />
            
            <div id="quick-access-container" class="glass">
                <QuickAccess />
            </div>
        </>}
        
    </main>
});

export const head: DocumentHead = {
    title: "Mario Kart Wii Randomizer",
    meta: [
        {
            name: "description",
            content: "Unleash chaos in Mario Kart ! Randomly pick characters, karts customization parts, and tracks for your next race. Available in 16 languages for global fun.",
        },
        {
            name: "keywords",
            content: "mario kart, mario kart randomizer, random, randomizer, character randomizer, kart randomizer, vehicle randomizer, track randomizer, mario kart wii, wii, gaming tool, online tool, free tool, video game, fun, aléatoire, personnage, vehicule, circuit, aleatorio, personaje, circuito, vehiculo, personagem, veiculo, casuale, personaggio, veicolo, zufallig, charakter, fahrzeug, strecke, willekeurig, personage, voertuig, случайно, персонаж, транспорт, трасса, slutchayno, personazh, transport, trassa, ランダム, キャラクター, ビークル, サーキット, randamu, kyarakutaa, biikuru, saakitto, 무작위, 캐릭터, 탈것, 서킷, mulag-wi, kaeligteo, talgeos, seokis, 随机, 角色, 载具, 赛道, 隨機, 角色, 載具, 賽道, suiji, juese, zai ju, sai dao"
        }
    ],
};