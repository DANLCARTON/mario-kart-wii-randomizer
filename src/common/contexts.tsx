import { createContextId, Signal } from "@builder.io/qwik";

// Contextes Qwik

export const langContext = createContextId<string>("lang-context") // Langue utilisée
export const globalParametersContext = createContextId<Signal>("global-parameters-context") // Paramètres globaux
export const selectedCoursesContext = createContextId<Signal>("selected-courses-context") // Liste des circuits sélectionnés
export const selectedRoutesContext = createContextId<Signal>("selected-routes-context") // Listes des routes sélectionnées
export const playerNamesContext = createContextId<string[]>("player-names-context") // Noms des joueurs rentrés
export const characterParametersContext = createContextId<Signal>("character-parameters-context") // Paramètres pour la partie personnages
export const pickedCharactersContext = createContextId<Signal>("picked-characters-context") // Liste des personnages tirés (utile pour éviter les doublons)
export const pickedVehiclesContext = createContextId<Signal>("picked-vehicles-context") // Liste des véhicules tirés
export const pickedTiresContext = createContextId<Signal>("picked-tires-context") // Liste des roues tirées
export const pickedGlidersContext = createContextId<Signal>("picked-gliders-context") // Liste des ailes tirées
export const selectedArenasContext = createContextId<Signal>("selected-arenas-context")