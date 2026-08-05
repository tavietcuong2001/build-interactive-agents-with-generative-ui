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
    - generic [ref=e12]:
      - generic [ref=e14]: Tìm các chuyến bay từ San Francisco (SFO) đến New York (JFK) vào thứ 6 tuần tới. Hiển thị các lựa chọn từ nhiều hãng hàng không khác nhau.
      - generic [ref=e18]:
        - generic [ref=e21]:
          - img "Delta Air Lines" [ref=e22]
          - generic [ref=e23]:
            - generic [ref=e24]: Delta Air Lines
            - generic [ref=e25]: $389
          - generic [ref=e26]:
            - generic [ref=e27]: DL 520
            - generic [ref=e28]: 2026-04-11
          - separator [ref=e29]
          - generic [ref=e30]:
            - generic [ref=e31]: 08:00
            - generic [ref=e32]: 5h 35m
            - generic [ref=e33]: 16:35
          - generic [ref=e34]:
            - generic [ref=e35]: SFO
            - generic [ref=e36]: →
            - generic [ref=e37]: JFK
          - separator [ref=e38]
          - generic [ref=e40]: On Time
          - separator [ref=e41]
          - button "Book Flight" [ref=e42] [cursor=pointer]
        - generic [ref=e45]:
          - img "United Airlines" [ref=e46]
          - generic [ref=e47]:
            - generic [ref=e48]: United Airlines
            - generic [ref=e49]: $412
          - generic [ref=e50]:
            - generic [ref=e51]: UA 1583
            - generic [ref=e52]: 2026-04-11
          - separator [ref=e53]
          - generic [ref=e54]:
            - generic [ref=e55]: 10:15
            - generic [ref=e56]: 5h 27m
            - generic [ref=e57]: 18:42
          - generic [ref=e58]:
            - generic [ref=e59]: SFO
            - generic [ref=e60]: →
            - generic [ref=e61]: JFK
          - separator [ref=e62]
          - generic [ref=e64]: On Time
          - separator [ref=e65]
          - button "Book Flight" [ref=e66] [cursor=pointer]
        - generic [ref=e69]:
          - img "JetBlue" [ref=e70]
          - generic [ref=e71]:
            - generic [ref=e72]: JetBlue
            - generic [ref=e73]: $345
          - generic [ref=e74]:
            - generic [ref=e75]: B6 416
            - generic [ref=e76]: 2026-04-11
          - separator [ref=e77]
          - generic [ref=e78]:
            - generic [ref=e79]: 14:30
            - generic [ref=e80]: 5h 35m
            - generic [ref=e81]: 23:05
          - generic [ref=e82]:
            - generic [ref=e83]: SFO
            - generic [ref=e84]: →
            - generic [ref=e85]: JFK
          - separator [ref=e86]
          - generic [ref=e88]: On Time
          - separator [ref=e89]
          - button "Book Flight" [ref=e90] [cursor=pointer]
        - generic [ref=e93]:
          - img "American Airlines" [ref=e94]
          - generic [ref=e95]:
            - generic [ref=e96]: American Airlines
            - generic [ref=e97]: $398
          - generic [ref=e98]:
            - generic [ref=e99]: AA 178
            - generic [ref=e100]: 2026-04-11
          - separator [ref=e101]
          - generic [ref=e102]:
            - generic [ref=e103]: 17:00
            - generic [ref=e104]: 5h 20m
            - generic [ref=e105]: 01:20+1
          - generic [ref=e106]:
            - generic [ref=e107]: SFO
            - generic [ref=e108]: →
            - generic [ref=e109]: JFK
          - separator [ref=e110]
          - generic [ref=e112]: On Time
          - separator [ref=e113]
          - button "Book Flight" [ref=e114] [cursor=pointer]
    - generic:
      - generic [ref=e119]:
        - generic [ref=e120]:
          - button [disabled]:
            - img
        - textbox "Type a message..." [ref=e122]
        - button [ref=e125] [cursor=pointer]:
          - img
      - generic: AI can make mistakes. Please verify important information.
  - button "Web Inspector" [ref=e127]:
    - note [ref=e128]:
      - generic [ref=e129]: Slack early access and React Native support are here!
    - img "Inspector logo" [ref=e131]
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