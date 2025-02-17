/**
 * @jest-environment jsdom
 */

const { handleSubmit } = require("../views/js/formHandler");

describe("handleSubmit", () => {
  it("returns something", () => {
    expect(handleSubmit).toBeDefined();
  });
});
