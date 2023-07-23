import { Card } from "../first-deck";
import { addZeroBefore } from "../helper";

export function getGameInterfaceHtml(
    alignment: {
        cards: Card[];
    },
    min: number,
    sec: number,
) {
    const alignmentHtml: string = alignment.cards
        .map((card: Card) => {
            return `
                <div class="playing__card card ${card.isOpened ? "" : "shirt"}">
                    ${
                        card.isOpened
                            ? `
                            <div class="card__face face">
                                <div class="face__top">
                                    <span class="face__rank">${card.rank}</span>
                                    <img src="${card.suitCorner}" />
                                </div>
                                <div class="face__middle">
                                    <img src="${card.suitCenter}" />
                                </div>
                                <div class="face__bottom">
                                    <span class="face__rank">${card.rank}</span>
                                    <img src="${card.suitCorner}" />
                                </div>
                            </div>`
                            : ""
                    }
                </div>`;
        })
        .join("");

    const interfaceHtml: string = `
        <header class="playing__header">
            <div class="playing__timer timer">
                <p class="timer__litherals">
                    <span class="timer__litheral">min</span>
                    <span class="timer__litheral">sec</span>
                </p>
                <p class="timer__digits">${addZeroBefore(min)}.${addZeroBefore(
                    sec,
                )}</p>
            </div>
            <button class="button" id="restart">Начать заново</button>
        </header>
        <div class="playing__cards">
            ${alignmentHtml}
        </div>`;

    return interfaceHtml;
}
