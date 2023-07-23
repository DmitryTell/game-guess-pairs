import "./css/ui-kit.css";
import "./css/styles.css";
import { renderStartPage } from "./components/start-page";
import { renderGamePage } from "./components/game-page";
import { renderFinalPage } from "./components/final-page";

const appElement: Element | null = document.querySelector("#app");

let page: string | null = window.localStorage.getItem("page");
let winStatus: string | null = window.localStorage.getItem("win-status");

export let difficulty = 0;

const renderApp = (): void => {
    if (!page && appElement) {
        renderStartPage(appElement, (newDifficulty: number): void => {
            page = "game-page";
            difficulty = newDifficulty;

            window.localStorage.setItem("page", "game-page");

            renderApp();
        });
        return;
    }

    if (page === "game-page" && appElement) {
        renderGamePage(
            appElement,
            (newWinStatus: string): void => {
                winStatus = newWinStatus;
                page = "final-page";

                window.localStorage.setItem("page", "final-page");
                window.localStorage.setItem("win-status", newWinStatus);

                renderApp();
            },
            () => {
                page = null;
                window.localStorage.clear();

                renderApp();
            },
        );
        return;
    }

    if (page === "final-page" && appElement) {
        if (winStatus) {
            renderFinalPage(appElement, winStatus, () => {
                page = null;
                winStatus = null;

                window.localStorage.clear();

                renderApp();
            });
        }
    }
    return;
};

renderApp();
