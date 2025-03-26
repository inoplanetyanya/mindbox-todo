import { createIdGenerator, spaceJoinTrim, Filter } from "./utils";

describe("utils", () => {
	describe("createIdGenerator", () => {
		test("generates sequential ids", () => {
			const generator = createIdGenerator();

			expect(generator.getNextId()).toBe(1);
			expect(generator.getNextId()).toBe(2);
		});

		test("starts from max id in list", () => {
			const generator = createIdGenerator([{ id: 5 }, { id: 10 }]);

			expect(generator.getNextId()).toBe(11);
		});

		test("flushes correctly", () => {
			const generator = createIdGenerator([{ id: 5 }]);
			generator.flush();

			expect(generator.getNextId()).toBe(1);
		});
	});

	describe("spaceJoinTrim", () => {
		test("joins strings with space and trims", () => {
			expect(spaceJoinTrim(["class1", " class2", "class3 "])).toBe(
				"class1 class2 class3"
			);
		});

		test("handles empty array", () => {
			expect(spaceJoinTrim([])).toBe("");
		});

		test("handles single class", () => {
			expect(spaceJoinTrim(["class1"])).toBe("class1");
		});
	});

	describe("Filter enum", () => {
		test("has correct values", () => {
			expect(Filter.ALL).toBe(0);
			expect(Filter.ACTIVE).toBe(1);
			expect(Filter.COMPLETED).toBe(2);
		});
	});
});
