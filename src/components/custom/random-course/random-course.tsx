import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { type Names, Course, Cup, Item } from "~/common/types";
import CourseComponent from "~/components/custom/course/course"

import cupsData from "~/data/cups.json"
import coursesData from "~/data/courses.json"
import { globalParametersContext, langContext, selectedCoursesContext, selectedRoutesContext } from "~/common/contexts";

import "./random-course.scss"

import textsData from "~/internationalization/texts.json"
import { getCourseName, tr } from "~/common/functions";

export default component$(() => {

    const selectedCourses = useContext(selectedCoursesContext)
    const selectedRoutes = useContext(selectedRoutesContext)

    const current = useSignal<string>("")

    const lang = useContext(langContext)
    const t = textsData.texts
    
    const gpSignal = useContext(globalParametersContext) 

    const allCourses = coursesData.courses as Record<string, Course>
    const allCups = cupsData.cups as Record<string, Cup>

    // tableau contenant toutes les courses et toutes les routes
    const courseItems: Item[] = []
    const routeItems: Item[] = []

    // remplissage des tableaux
    for (const courseKey of Object.keys(allCourses)) {
        courseItems.push({ type: 'course', index: courseKey })

        const course = allCourses[courseKey]
        if (course.routes) {
            for (const routeIndex of course.routes) {
                routeItems.push({
                    type: 'route',
                    index: routeIndex, // destination
                    courseIndex: courseKey // départ
                })
            }
        }
    }

    //kfsldkflsmdfldfs
    let allRoutesKeys : string[] = []
    for (const routeItem of routeItems) {
        allRoutesKeys = [...allRoutesKeys, `${routeItem.courseIndex}|${routeItem.index}`]
    }

    // GETTERS

    /**
     * @description permet d'avoir le nom d'une coupe dans la langue donnée
     * @param cup objet de la coupe
     * @param lang langue de l'utilisaiteur
     * @returns string : contenant le nom de la coupe dans la langue choisie
     * @example getCupName(cups.mushroom_cup, lang)
     */
    const getCupName = $((cup : Cup, lang : string) : string => {
        const names = cup.names as Record<string, string>
        return names[lang]
    })

    /**
     * @description permet de savoir si la coupe donnée a entierement été tirée (je m'en sers pas mais c'est là)
     * @param cup objet de la coupe
     * @returns boolean : true si la coupe a entièrement été sélectionnée, false sinon
     * @example isCupFullySelected(cups.mushroom_cup)
     */
    const isCupFullySelected = (cup : Cup) : boolean => {
        return cup.courses.every((courseId => selectedCourses.value.includes(courseId)))
    }

    // GESTION COURSES ET ROUTES

    /**
     * @description permet d'ajouter un circuit aux circuits validés
     * @param courseIndex slug du circuit à valider
     * @returns boolean : true si le circuit a été ajouté, false si il y était déjà
     * @example addCourse("mario_bros_circuit")
     */
    const addCourse = $((courseIndex : string) : boolean => {
        if (!selectedCourses.value.includes(courseIndex)) {
            selectedCourses.value = [...selectedCourses.value, courseIndex]
            console.log(selectedCourses.value)
            // current.value = courseIndex
            if (gpSignal.value.autoScroll) {
                const courseElement = document.getElementById(courseIndex)
                courseElement?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                })
            }
            // useContextProvider(selectedCoursesContext, selectedCourses)
            return true
        }
        return false
    })

    /**
     * @description permet de tirer aléatoirement une route ou un circuit
     * @example getRandomCourse()
     */
    const getRandomCourse = $(async (): Promise<void> => {

        // tableau comprenant la liste des circuits et des routes (index uniquement)
        // const allCourseIndexes = courseItems.map(item => item.index)
        // const allRouteIndexes = routeItems.map(item => item.index)

        // compte du total des circuits et routes sélectionnés et des circuits et routes au total
        const totalSelected = selectedCourses.value.length + selectedRoutes.value.length
        const totalAvailable = courseItems.length + routeItems.length

        // tant que le total des circuits sélectionnés est inférieur au total des circuits
        if (totalSelected < totalAvailable) {
            while (true) {
                // cas où on tire un circuit
                let item = courseItems[Math.floor(Math.random() * courseItems.length)]
                // console.log(courseItems[13])
                let key = item.index

                while (selectedCourses.value.includes(key)) {
                    item = courseItems[Math.floor(Math.random() * courseItems.length)]
                    key = item.index
                }

                current.value = key

                if (await addCourse(item.index)) break
            }
        } else {
            alert(tr(t.all_courses, lang))
        }
    })


    /**
     * @description remet à zéro la liste des circuits validés
     * @example resetCourses()
     */
    const resetCourses = $(() : void => {
        selectedCourses.value = []
    })

    /**
     * @description remet à zéro la liste des routes validées
     * @example resetRoutes()
     */
    const resetRoutes = $(() : void => {
        selectedRoutes.value = []
    })

    /**
     * @description remet à zéro le circuit séléctionné en cours
     * @example resetCurrent()
     */
    const resetCurrent = $(() : void => {
        current.value = ""
    })

    /**
     * @description handler clic sur choisir
     * @example handleRandomCourse()
     */
    const handleRandomCourse = $(() : void => {
        getRandomCourse()
    })

    /**
     * @description handler clic sur remettre à zéro
     * @example handleReset()
     */
    const handleReset = $(() : void => {
        resetCourses()
        resetRoutes()
        resetCurrent()
    })

    /**
     * @description permet d'avoir les noms des circuits d'une route séparés
     * @param routeID 
     * @returns string[] : avec les noms dans un tableau ["nom1", "nom2"]
     * @example getCoursesNameFromRouteID("mario_bros_circuit|crown_city")
     */
    const getCoursesNameFromRouteID = ((routeID : string) : string[] => {
        const [course1, course2] = routeID.split("|")
        const name1 = getCourseName(allCourses[course1], lang)
        const name2 = getCourseName(allCourses[course2], lang)
        return [name1, name2]

    })
    
    return <section id="random-course-container">
        <button class="main-button glass" onClick$={$(() => handleRandomCourse())}>{tr(t.choose, lang)}</button>
        <div class="medium-width current-course glass gold ">
            {current.value == "" ? (
                <span>{tr(t.no_course, lang)}</span>
            ) : current.value.includes("|") ? (
                <span>{getCoursesNameFromRouteID(current.value)[0]} ⋙ {getCoursesNameFromRouteID(current.value)[1]}</span>
            ) : (
                <span>{getCourseName(allCourses[current.value], lang)}</span>
            )}
        </div>
        <div class="cups">
        {Object.values(allCups).map((cup : Cup, index : any) => (
            <article class="cup glass" key={index}>
                <h3 class={isCupFullySelected(cup) ? "cup-completed" : ""}>
                    {getCupName(cup, lang)}
                </h3>
                {cup.courses.map((courseIndex: string, index : any) => {
                    const course = allCourses[courseIndex]
                    const isCourseSelected = selectedCourses.value.includes(courseIndex)
                    
                    return <CourseComponent 
                        key={index}
                        course={course}
                        allCourses={allCourses}
                        isCourseSelected={isCourseSelected}
                        courseIndex={courseIndex}
                        current={current}
                        allRoutesKeys={allRoutesKeys}
                    />
                })} 
            </article>
        ))}
        </div>
        <button class="main-button glass red" onClick$={$(() => handleReset())}>{tr(t.reset, lang)}</button>
    </section>
})