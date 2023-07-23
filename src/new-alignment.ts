import { Card, firstDeck } from "./first-deck";
import { getRandomIndex } from "./helper";
import { secondDeck } from "./second-deck";

export function getNewAlignment(difficulty: number): {
    cards: Card[];
} {
    const pairs: null | undefined | Card[] = [];

    const max: number = difficulty * 3;

    for (let i: number = 0; i < max; i++) {
        const index: number = getRandomIndex(firstDeck.length);

        pairs.push(firstDeck[index]);
        pairs.push(secondDeck[index]);
        firstDeck.splice(index, 1);
        secondDeck.splice(index, 1);
    }

    return {
        cards: pairs.sort(() => Math.random() - 0.5),
    };
}
