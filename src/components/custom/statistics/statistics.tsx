import { component$, useContext } from "@builder.io/qwik";
import { Stats } from "~/common/types";
import TextsData from "../../../internationalization/texts.json"
import { tr } from "~/common/functions";
import { langContext } from "~/common/contexts";

import "./statistics.scss"

interface StatisticsProps {
    characterStats : Stats,
    vehicleStats : Stats,
}

export default component$((props : StatisticsProps) => {

    const t = TextsData.texts
    const lang = useContext(langContext)

    return <section id="stats">
        <div class="stat">
            <span>{tr(t.speed, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.speed + props.vehicleStats.speed)}%` }}>
                    {props.characterStats.speed + props.vehicleStats.speed}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.weight, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.weight + props.vehicleStats.weight)}%` }}>
                    {props.characterStats.weight + props.vehicleStats.weight}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.acceleration, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.acceleration + props.vehicleStats.acceleration)}%` }}>
                    {props.characterStats.acceleration + props.vehicleStats.acceleration}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.handling, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.handling + props.vehicleStats.handling)}%` }}>
                    {props.characterStats.handling + props.vehicleStats.handling}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.drift, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.drift + props.vehicleStats.drift)}%` }}>
                    {props.characterStats.drift + props.vehicleStats.drift}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.off_road, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.off_road + props.vehicleStats.off_road)}%` }}>
                    {props.characterStats.off_road + props.vehicleStats.off_road}
                </div>
            )}
        </div>

        <div class="stat">
            <span>{tr(t.mini_turbo, lang)}</span>
            {props.characterStats.speed + props.vehicleStats.speed   == 0 ? (
                <div class="stat-gauge" style={{ width: `100%` }}>???</div>
            ) : (
                <div class="stat-gauge" style={{ width: `${1.25*(props.characterStats.mini_turbo + props.vehicleStats.mini_turbo)}%` }}>
                    {props.characterStats.mini_turbo + props.vehicleStats.mini_turbo}
                </div>
            )}
        </div>
    </section>
})