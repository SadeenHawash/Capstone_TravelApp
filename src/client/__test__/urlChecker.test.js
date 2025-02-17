const { checkForUrl } = require("../views/js/urlChecker");

describe("URL Validation", () => {
  test("Valid URLs should pass", () => {
    expect(checkForUrl("https://example.com")).toBe(true);
    expect(checkForUrl("http://sub.domain.co.uk/path")).toBe(true);
  });

  test("Invalid URLs should fail", () => {
    expect(checkForUrl("invalid-url")).toBe(false);
    expect(checkForUrl("www.example")).toBe(false);
    expect(checkForUrl("ftp://example.com")).toBe(false);
  });
});
