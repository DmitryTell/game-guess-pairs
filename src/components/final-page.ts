import { Card } from "../first-deck";
import {
    addZeroBefore,
    capitalize,
    getAlignmentFromLocalStoreAge,
} from "../helper";

export function renderFinalPage(
    appElement: Element,
    winStatus: string,
    startNewGame: () => void,
): void {
    const spentMin = Number(window.localStorage.getItem("min"));
    const spentSec = Number(window.localStorage.getItem("sec"));

    const backCardsHtml: string = getAlignmentFromLocalStoreAge()
        .cards.map((card: Card): string => {
            return `
            <div class="playing__card card">
                <div class="card__face face">
                    <div class="face__top">
                        <span class="face__rank">
                            ${card.rank}
                        </span>
                        <img src="${card.suitCorner}" />
                    </div>
                    <div class="face__middle">
                        <img src="${card.suitCenter}" />
                    </div>
                    <div class="face__bottom">
                        <span class="face__rank">
                            ${card.rank}
                        </span>
                        <img src="${card.suitCorner}" />
                    </div>
                </div>
            </div>`;
        })
        .join("");

    const finalFormHtml = `
        <div class="final__form">
            <img src="${
                winStatus === "win" ? "./static/win.png" : "./static/lose.png"
            }" alt="${capitalize(winStatus)}">
            <h2 class="final__title">
                ${winStatus === "win" ? "Вы выиграли!" : "Вы проиграли!"}
            </h2>
            <p class="final__text">Затраченное время:</p>
            <p class="final__time">
                ${addZeroBefore(spentMin)}.${addZeroBefore(spentSec)}
            </p>
            <button class="button" id="new-game">Играть снова</button>
        </div>`;

    appElement.innerHTML = `
        <div class="modal final">
            <div class="playing back">
                <header class="playing__header">
                    <div class="playing__timer timer">
                        <p class="timer__litherals">
                            <span class="timer__litheral">min</span>
                            <span class="timer__litheral">sec</span>
                        </p>
                        <p class="timer__digits">00.00</p>
                    </div>
                    <button class="button back-button" disabled>
                        Начать заново
                    </button>
                </header>
                <main class="playing__cards">
                    ${backCardsHtml}
                </main>
            </div>
            ${finalFormHtml}
        </div>`;

    document.querySelector("#new-game")?.addEventListener("click", () => {
        startNewGame();
    });
}
