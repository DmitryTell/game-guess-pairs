import { it, expect, describe } from "@jest/globals";
import { getNewAlignment } from "../src/new-alignment";

describe("getNewAlignment()", () => {
    it("should have length of array 6", () => {
        const difficulty = 1;
        const alignment = getNewAlignment(difficulty);
        const expected = alignment.cards;

        expect(expected).toHaveLength(6);
    });

    it("should have length of array 12", () => {
        const difficulty = 2;
        const alignment = getNewAlignment(difficulty);
        const expected = alignment.cards;

        expect(expected).toHaveLength(12);
    });

    it("should have length of array 18", () => {
        const difficulty = 3;
        const alignment = getNewAlignment(difficulty);
        const expected = alignment.cards;

        expect(expected).toHaveLength(18);
    });
});
