////////////////////// gestion des courses (circuit et routes) individuellement
// COMPOSANT COURSE //
////////////////////// 

import { $, component$, Signal, useContext } from "@builder.io/qwik";
import { langContext, selectedCoursesContext, selectedRoutesContext } from "~/common/contexts";
import { Course } from "~/common/types";

import "./course.scss"
import { getCourseName } from "~/common/functions";
import { asianLangs } from "~/common/constants";
 
interface CourseProps {
    key : any,
    course : Course,
    allCourses : Record<string, Course>,
    isCourseSelected : boolean,
    courseIndex : string,
    current : Signal
    // routeCourse : Signal
    // routeRoute : Signal
    // allRoutes : Signal,
    allRoutesKeys : string[]
}

export default component$((props : CourseProps) => {

    const lang = useContext(langContext) // récupération de la langue de l'utilisateur

    const selectedCourses = useContext(selectedCoursesContext) // récupération de la liste des circuits validés
    const selectedRoutes = useContext(selectedRoutesContext) // récupération de la liste des routes validées

    /**
     * @description ajoute la circuit donné à la liste des circuits validés et applique le circuit tiré comme circuit actuel
     * @param courseIndex slug du circuit sélectionné
     * @returns true si ça a bien été effectué, false si le circuit a déjà été sélectionné
     * @example addCourse("mario_bros_circuit")
     */
    const addCourse = $((courseIndex : string) : boolean => {
        if (!selectedCourses.value.includes(courseIndex)) {
            selectedCourses.value = [...selectedCourses.value, courseIndex]

            props.current.value = courseIndex
            return true
        }
        return false
    })

    /**
     * @description ajout de la et des routes en fonction des paramètres aux routes sélectionnées
     * @param courseIndex slug du départ de la route
     * @param routeIndex slug de l'arrivée de la route
     * @returns true si ajoutée avec succès, false si la route était déjà sélectionnée
     * @example addRoute("mario-bros-circuit", "crown-city")
     */
    const addRoute = $((courseIndex: string, routeIndex: string): boolean => {
        const routeKey = `${courseIndex}|${routeIndex}`
        if (!selectedRoutes.value.includes(routeKey)) {

            selectedRoutes.value = [...selectedRoutes.value, routeKey]
            props.current.value = `${courseIndex}|${routeIndex}`

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
        if (selectedCourses.value.includes(courseIndex)) {
            selectedCourses.value = selectedCourses.value.filter((course : string) => (
                course !== courseIndex
            ))
            if (courseIndex == props.current.value) {
                props.current.value = ""
            }
        }
    })

    /**
     * @description retire la route données de la liste des routes validées
     * @param courseIndex slug du départ de la route
     * @param routeIndex slug de l'arrivée de la route
     * @example removeRoute("mario_bros_circuit", "crown_city")
     */
    const removeRoute = $((courseIndex: string, routeIndex: string): void => {
        const routeKey = `${courseIndex}|${routeIndex}`
        selectedRoutes.value = selectedRoutes.value.filter((route: string) => (
            route !== routeKey
        ))
        if (routeKey == props.current.value) {
            props.current.value = ""
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

    return <div class="course-component" key={props.key}>
        <p class={props.courseIndex == props.current.value ? "current" : props.isCourseSelected ? "selected" : "not-selected"} 
           onClick$={$(() => props.isCourseSelected ? (
            handleUnselectCourse(props.courseIndex)
        ) : (
            handleSelectCourse(props.courseIndex)
        ))}
            id={props.courseIndex}
        >
            <span class="prefix">{getCourseOrigin(props.course, lang)}</span> {getCourseName(props.course, lang)}
        </p> 

        <ul>{props.course.routes.map((routeIndex: string, idx: number) => {
            const routeKey = `${props.courseIndex}|${routeIndex}`
            const isRouteSelected = selectedRoutes.value.includes(routeKey)
            const route = props.allCourses[routeIndex]
            return routeKey && (
                <li key={routeKey+idx} class={(props.current.value == routeKey ? "current" : isRouteSelected ? "selected" : "not-selected")} 
                    onClick$={$(() => isRouteSelected ? (
                    removeRoute(props.courseIndex, routeIndex)
                ) : (
                    addRoute(props.courseIndex, routeIndex)
                ))}
                    id={routeKey}
                >
                    ⋙ {getCourseName(route, lang)}
                </li>
            )
        })}</ul>
    </div>
})