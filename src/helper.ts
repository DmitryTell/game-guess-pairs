import { Card } from "./first-deck";
import { difficulty } from "./index";
import { getNewAlignment } from "./new-alignment";

export function addZeroBefore(num: number): string {
    return String(num).length < 2 ? `0${num}` : `${num}`;
}

export function getRandomIndex(max: number): number {
    return Math.round(Math.random() * max);
}

export function saveAlignmentToLocalStoreage(alignment: {
    cards: Card[];
}): void {
    window.localStorage.setItem("alignment", JSON.stringify(alignment));
}

export function getAlignmentFromLocalStoreAge(): {
    cards: Card[];
} {
    const alignmentJson = window.localStorage.getItem("alignment");

    if (alignmentJson) {
        return JSON.parse(alignmentJson);
    } else {
        return getNewAlignment(difficulty);
    }
}

export function capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}
