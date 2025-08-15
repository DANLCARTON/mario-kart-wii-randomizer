////////////////////// gestion des courses (circuit et routes) individuellement
// COMPOSANT COURSE //
////////////////////// 

import { $, component$, Signal, useContext } from "@builder.io/qwik";
import { langContext, selectedArenasContext, selectedRoutesContext } from "~/common/contexts";
import { Arena, Course } from "~/common/types";

import "../course/course.scss"
import { getCourseName } from "~/common/functions";
import { asianLangs } from "~/common/constants";
 
interface CourseProps {
    key : any,
    course : Course | Arena,
    allCourses : Record<string, Course> | Record<string, Arena>,
    isCourseSelected : boolean,
    courseIndex : string,
    current : Signal
    allRoutesKeys : string[]
}

export default component$((props : CourseProps) => {

    const lang = useContext(langContext) // récupération de la langue de l'utilisateur

    const selectedArena = useContext(selectedArenasContext) // récupération de la liste des circuits validés

    /**
     * @description ajoute la circuit donné à la liste des circuits validés et applique le circuit tiré comme circuit actuel
     * @param courseIndex slug du circuit sélectionné
     * @returns true si ça a bien été effectué, false si le circuit a déjà été sélectionné
     * @example addCourse("mario_bros_circuit")
     */
    const addCourse = $((courseIndex : string) : boolean => {
        if (!selectedArena.value.includes(courseIndex)) {
            selectedArena.value = [...selectedArena.value, courseIndex]

            props.current.value = courseIndex
            return true
        }
        return false
    })
    
    /**
     * @description retire la circuit donné de la liste des circuit validés
     * @param courseIndex slug du circuit à retirer
     * @example removeCourse("mario_bros_circuit")
     */
    const removeCourse = $((courseIndex : string) : void => {
        if (selectedArena.value.includes(courseIndex)) {
            selectedArena.value = selectedArena.value.filter((course : string) => (
                course !== courseIndex
            ))
            if (courseIndex == props.current.value) {
                props.current.value = ""
            }
        }
    })

    /**
     * @description handler clic sur un circuit si celui-ci n'a pas été validé
     * @param courseIndex slug du circuit
     * @example handleSelectCourse("mario_bros_circuit")
     */
    const handleSelectCourse = $((courseIndex : string) : void => {
        addCourse(courseIndex)
    })
    
    /**
     * @description handler clic sur un circuit si celui-ci a été validé
     * @param courseIndex slug du circuit
     * @example handleUnselectCourse("mario_bros_circuit")
     */
    const handleUnselectCourse = $((courseIndex : string) : void => {
        removeCourse(courseIndex)
    })

    const getCourseOrigin = $((course : Course, lang : string) => {
        let origin = course.origin
        if (asianLangs.includes(lang)) {
            if (origin == "SNES") origin = "SFC"
            if (origin == "GCN") origin = "GC"
        }
        return origin
    })

    console.log("props course", props.course)
    console.log("lang", lang)

    return <div class="course-component" key={props.key}>
        <p class={props.courseIndex == props.current.value ? "current" : props.isCourseSelected ? "selected" : "not-selected"} 
           onClick$={$(() => props.isCourseSelected ? (
            handleUnselectCourse(props.courseIndex)
        ) : (
            handleSelectCourse(props.courseIndex)
        ))}
            id={props.courseIndex}
        >
            <span class="prefix">{getCourseOrigin(props.course as Course, lang)}</span> {getCourseName(props.course, lang)}
        </p>
    </div>
})