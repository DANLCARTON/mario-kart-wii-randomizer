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
            <span>{tr(t.land_speed, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.land_speed + props.vehicleStats.land_speed)}%`
            }}>{props.characterStats.land_speed + props.vehicleStats.land_speed}</div>
        </div>
        <div class="stat">
            <span>{tr(t.water_speed, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.water_speed + props.vehicleStats.water_speed)}%`
            }}>{props.characterStats.water_speed + props.vehicleStats.water_speed}</div>
        </div>
        <div class="stat">
            <span>{tr(t.air_speed, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.air_speed + props.vehicleStats.air_speed)}%`
            }}>{props.characterStats.air_speed + props.vehicleStats.air_speed}</div>
        </div>
        <div class="stat">
            <span>{tr(t.acceleration, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.acceleration + props.vehicleStats.acceleration)}%`
            }}>{props.characterStats.acceleration + props.vehicleStats.acceleration}</div>
        </div>
        <div class="stat">
            <span>{tr(t.weight, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.weight + props.vehicleStats.weight)}%`
            }}>{props.characterStats.weight + props.vehicleStats.weight}</div>
        </div>
        <div class="stat">
            <span>{tr(t.land_handling, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.land_handling + props.vehicleStats.land_handling)}%`
            }}>{props.characterStats.land_handling + props.vehicleStats.land_handling}</div>
        </div>
        <div class="stat">
            <span>{tr(t.water_handling, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.water_handling + props.vehicleStats.water_handling)}%`
            }}>{props.characterStats.water_handling + props.vehicleStats.water_handling}</div>
        </div>
        <div class="stat">
            <span>{tr(t.air_handling, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.air_handling + props.vehicleStats.air_handling)}%`
            }}>{props.characterStats.air_handling + props.vehicleStats.air_handling}</div>
        </div>
        <div class="stat">
            <span>{tr(t.off_road, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.off_road + props.vehicleStats.off_road)}%`
            }}>{props.characterStats.off_road + props.vehicleStats.off_road}</div>
        </div>
        <div class="stat">
            <span>{tr(t.mini_turbo, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.mini_turbo + props.vehicleStats.mini_turbo)}%`
            }}>{props.characterStats.mini_turbo + props.vehicleStats.mini_turbo}</div>
        </div>
        <div class="stat">
            <span>{tr(t.stability, lang)}</span>
            <div class="stat-gauge" style={{
                width: `${5*(props.characterStats.stability + props.vehicleStats.stability)}%`
            }}>{props.characterStats.stability + props.vehicleStats.stability}</div>
        </div>
    </section>
})