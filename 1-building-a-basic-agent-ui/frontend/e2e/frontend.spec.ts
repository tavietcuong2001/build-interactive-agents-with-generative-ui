import { expect, test } from "@playwright/test";

test("Kiểm tra giao diện chat cơ bản", async ({ page }) => {
  await page.goto("/");

  const infoResponse = await page.request.get("/api/copilotkit/info");
  expect(infoResponse.ok()).toBeTruthy();
  const info = await infoResponse.json();
  expect(info?.agents?.default).toBeTruthy();

  await expect(page.getByText("How can I help you today?")).toBeVisible();

  const input = page.getByRole("textbox", { name: "Type a message..." });
  await expect(input).toBeVisible();

  await input.fill("Xin chào");
  await input.press("Enter");
  await expect(page.getByText("Xin chào")).toBeVisible();
});
