import { expect, test } from "@playwright/test";

test.describe.configure({ retries: 1, timeout: 120_000 });

test("Kiểm tra giao diện chat cơ bản", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "Type a message..." })).toBeVisible();
});

test("Kiểm tra kết quả tìm chuyến bay", async ({ page }) => {
  await page.goto("/");

  const input = page.getByRole("textbox", { name: "Type a message..." });
  await input.fill("Tìm các chuyến bay từ San Francisco (SFO) đến New York (JFK) vào thứ 6 tuần tới. Hiển thị các lựa chọn từ nhiều hãng hàng không khác nhau.");
  await input.press("Enter");
  if ((await input.inputValue()).trim().length > 0) {
    await input.press("Enter");
  }

  const surface = page.locator('[data-surface-id="lesson4-flights"]');
  await expect(surface.getByText(/On Time|Book flight/i).first()).toBeVisible({
    timeout: 90_000,
  });
});