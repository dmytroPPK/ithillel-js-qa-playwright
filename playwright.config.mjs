// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  testMatch:"tests/**/*.spec.mjs",
  testIgnore:"tests/**/*.spec.js",
  fullyParallel: false,
  workers: "50%",
  forbidOnly: false,
  retries: 0,
  reporter: "html",
  timeout:45_000,
  expect:{
    timeout:10_000
  },
  use: {
    baseURL: "https://qauto.forstudy.space",
    trace: "on",
    actionTimeout:10_000,
    navigationTimeout:10_000,
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto',
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
