import {
  nonEmptyString,
  safeNumber,
  getValidNumber,
  validateRecipe,
} from "./validate";

describe("validate", () => {
  describe("validateRecipe", () => {
    it("should validate required fields", () => {
      expect(() => {
        validateRecipe({});
      }).toThrow("Title is required");

      expect(() => {
        validateRecipe({
          title: "Test Recipe",
          groupedIngredients: [],
        });
      }).toThrow("Ingredients are required");

      expect(() => {
        validateRecipe({
          title: "Test Recipe",
        });
      }).toThrow("Ingredients are required");

      expect(() => {
        validateRecipe({
          title: "Test Recipe",
          groupedIngredients: [{ ingredients: [{ name: "Test Ingredient" }] }],
        });
      }).toThrow("Instructions are required");

      // Test with falsy but valid values
      expect(() => {
        validateRecipe({
          title: "", // empty string is valid
        });
      }).toThrow("Title is required");
    });

    expect(() => {
      validateRecipe({
        title: "Test Recipe",
        groupedIngredients: [{ ingredients: [] }],
      });
    }).toThrow("Ingredients are required");

    expect(() => {
      validateRecipe({
        title: "Test Recipe",
        groupedIngredients: [{ ingredients: [{ name: "Test Ingredient" }] }],
        groupedInstructions: [{ instructions: [] }],
      });
    }).toThrow("Instructions are required");
  });

  describe("safeNumber", () => {
    it("should return a failure if the value is not a number", () => {
      expect(safeNumber("not a number")).toEqual({
        kind: "failure",
        reason: "Value should be a number",
      });
    });
    it("should return a success if the value is a number", () => {
      expect(safeNumber("123")).toEqual({
        kind: "success",
        value: 123,
      });
    });
  });

  describe("validateNumber", () => {
    it("should return a failure if the value is not a number", () => {
      expect(() => getValidNumber({ text: "not a number" }, "test")).toThrow(
        "Failed to convert test to number."
      );
    });

    it("should return a success if the value is a number", () => {
      expect(getValidNumber({ text: "123" }, "test")).toEqual(123);
    });
  });

  describe("nonEmptyString", () => {
    it("should return a failure if the value is an empty string", () => {
      expect(nonEmptyString("")).toEqual({
        kind: "failure",
        reason: "Value should not be empty",
      });
    });

    it("should return a failure if the value is a whitespace string", () => {
      expect(nonEmptyString(" ")).toEqual({
        kind: "failure",
        reason: "Value should not be empty",
      });
    });

    it("should return a success if the value is a non-empty string", () => {
      expect(nonEmptyString("test")).toEqual({
        kind: "success",
        value: "test",
      });
    });
  });
});
