import { Card } from "../first-deck";
import {
    getAlignmentFromLocalStoreAge,
    saveAlignmentToLocalStoreage,
} from "../helper";
import { getGameInterfaceHtml } from "./game-interface-html";

export function renderGamePage(
    appElement: Element,
    goToFinal: (newWinStatus: string) => void,
    restartGame: () => void,
): void {
    const alignment = getAlignmentFromLocalStoreAge();

    const gameStatus: string | null = !window.localStorage.getItem(
        "game-status",
    )
        ? "no-started"
        : window.localStorage.getItem("game-status");
    let openedCards: number = Number(
        window.localStorage.getItem("opened-cards"),
    );
    let previousCard: string | null = window.localStorage.getItem("previous");
    let newWinStatus: string | null = null;
    let min: number = Number(window.localStorage.getItem("min"));
    let sec: number = Number(window.localStorage.getItem("sec"));
    let timer: NodeJS.Timer;
    let countdown: NodeJS.Timeout;

    saveAlignmentToLocalStoreage(alignment);

    const renderInterface = (): void => {
        appElement.innerHTML = `
            <div class="modal playing">
                ${getGameInterfaceHtml(alignment, min, sec)}
            </div>`;

        document.querySelectorAll(".card").forEach((card, index) => {
            card.addEventListener("click", () => {
                if (!alignment.cards[index].isOpened) {
                    alignment.cards[index].isOpened = true;

                    saveAlignmentToLocalStoreage(alignment);
                    renderInterface();

                    if (openedCards % 2 === 0) {
                        openedCards++;
                        window.localStorage.setItem(
                            "opened-cards",
                            String(openedCards),
                        );
                        previousCard = alignment.cards[index].rank;
                        window.localStorage.setItem("previous", previousCard);
                        return;
                    }

                    if (alignment.cards[index].rank !== previousCard) {
                        newWinStatus = "lose";
                        clearInterval(timer);

                        goToFinal(newWinStatus);
                        return;
                    }

                    openedCards++;
                    window.localStorage.setItem(
                        "opened-cards",
                        String(openedCards),
                    );

                    if (openedCards === alignment.cards.length) {
                        newWinStatus = "win";
                        clearInterval(timer);

                        goToFinal(newWinStatus);
                        return;
                    }
                }
            });
        });

        document.querySelector("#restart")?.addEventListener("click", () => {
            clearInterval(timer);
            clearTimeout(countdown);
            restartGame();
        });
    };

    renderInterface();

    if (gameStatus === "no-started") {
        countdown = setTimeout(() => {
            alignment.cards.map((card: Card) => (card.isOpened = false));
            window.localStorage.setItem("game-status", "started");
            saveAlignmentToLocalStoreage(alignment);

            renderInterface();

            timer = setInterval(() => {
                if (sec === 59) {
                    sec = 0;
                    min++;
                } else {
                    sec++;
                }

                window.localStorage.setItem("min", String(min));
                window.localStorage.setItem("sec", String(sec));

                renderInterface();
            }, 1000);
        }, 5000);
    } else {
        timer = setInterval(() => {
            if (sec === 59) {
                sec = 0;
                min++;
            } else {
                sec++;
            }

            window.localStorage.setItem("min", String(min));
            window.localStorage.setItem("sec", String(sec));

            renderInterface();
        }, 1000);
    }
}
