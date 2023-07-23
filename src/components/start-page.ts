export function renderStartPage(
    appElement: Element,
    startGame: (difficulty: number) => void,
): void {
    let newDifficulty: number = 0;

    const startPageHtml: string = `
        <div class="modal difficulty">
            <div class="difficulty__form form">
                <h2 class="form__title">Выбери сложность</h2>
                <div class="form__levels">
                    <div class="form__level level">1</div>
                    <div class="form__level level">2</div>
                    <div class="form__level level">3</div>
                </div>
                <button class="button" id="start" disabled>Старт</button>
            </div>
        </div>`;

    appElement.innerHTML = startPageHtml;

    const levelElements: NodeListOf<Element> =
        document.querySelectorAll(".level");
    const startButtonElement: Element | null = document.querySelector("#start");

    levelElements.forEach((level) => {
        level.addEventListener("click", () => {
            levelElements.forEach((level) => {
                level.classList.remove("form__level--selected");
            });

            level.classList.add("form__level--selected");
            startButtonElement?.removeAttribute("disabled");

            if (level.textContent) {
                newDifficulty = +level.textContent;
            }
        });
    });

    startButtonElement?.addEventListener("click", () => {
        startGame(newDifficulty);
    });
}
