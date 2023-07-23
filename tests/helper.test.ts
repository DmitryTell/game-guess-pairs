import { it, expect, describe } from "@jest/globals";
import { addZeroBefore, getRandomIndex, capitalize } from "../src/helper";

describe("addZerobefore()", () => {
    it("should add string 0 before number", () => {
        const number = Math.round(Math.random() * 9);
        const expected = addZeroBefore(number);
        const result = `0${number}`;

        expect(expected).toBe(result);
    });
});

describe("getRandomIndex()", () => {
    it("should return random number", () => {
        const max = 0;

        const expected = getRandomIndex(max);
        const result = 0;

        expect(expected).toBe(result);
    });
});

describe("capitalize()", () => {
    it("should return capitalized string", () => {
        const string = "string";
        const expected = capitalize(string);
        const result = "String";

        expect(expected).toBe(result);
    });
});
