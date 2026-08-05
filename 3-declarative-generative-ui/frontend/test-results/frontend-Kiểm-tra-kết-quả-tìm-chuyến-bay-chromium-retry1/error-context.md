# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frontend.spec.ts >> Kiểm tra kết quả tìm chuyến bay
- Location: e2e/frontend.spec.ts:10:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-surface-id="lesson4-flights"]').getByText(/On Time|Book flight/i).first()
Expected: visible
Timeout: 90000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 90000ms
  - waiting for locator('[data-surface-id="lesson4-flights"]').getByText(/On Time|Book flight/i).first()

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e5]:
    - generic [ref=e14]: Tìm các chuyến bay từ San Francisco (SFO) đến New York (JFK) vào thứ 6 tuần tới. Hiển thị các lựa chọn từ nhiều hãng hàng không khác nhau.
    - generic:
      - generic [ref=e19]:
        - generic [ref=e20]:
          - button [disabled]:
            - img
        - textbox "Type a message..." [ref=e22]
        - button [ref=e25] [cursor=pointer]:
          - img
      - generic: AI can make mistakes. Please verify important information.
  - button "Web Inspector" [ref=e27]:
    - note [ref=e28]:
      - generic [ref=e29]: Slack early access and React Native support are here!
    - img "Inspector logo" [ref=e31]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.describe.configure({ retries: 1, timeout: 120_000 });
  4  | 
  5  | test("Kiểm tra giao diện chat cơ bản", async ({ page }) => {
  6  |   await page.goto("/");
  7  |   await expect(page.getByRole("textbox", { name: "Type a message..." })).toBeVisible();
  8  | });
  9  | 
  10 | test("Kiểm tra kết quả tìm chuyến bay", async ({ page }) => {
  11 |   await page.goto("/");
  12 | 
  13 |   const input = page.getByRole("textbox", { name: "Type a message..." });
  14 |   await input.fill("Tìm các chuyến bay từ San Francisco (SFO) đến New York (JFK) vào thứ 6 tuần tới. Hiển thị các lựa chọn từ nhiều hãng hàng không khác nhau.");
  15 |   await input.press("Enter");
  16 |   if ((await input.inputValue()).trim().length > 0) {
  17 |     await input.press("Enter");
  18 |   }
  19 | 
  20 |   const surface = page.locator('[data-surface-id="lesson4-flights"]');
> 21 |   await expect(surface.getByText(/On Time|Book flight/i).first()).toBeVisible({
     |                                                                   ^ Error: expect(locator).toBeVisible() failed
  22 |     timeout: 90_000,
  23 |   });
  24 | });
```