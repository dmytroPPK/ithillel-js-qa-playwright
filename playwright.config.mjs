// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv'

dotenv.config({path:`./env/.env.${process.env.APP_ENV}`})

export default defineConfig({
  testDir: "./tests",
  testMatch:"tests/**/*.spec.mjs",
  testIgnore:"tests/**/*.spec.js",
  fullyParallel: false,
  workers: "50%",
  forbidOnly: false,
  retries: 0,
  reporter: [['html', { open: 'never' }],['list']],
  timeout:45_000,
  expect:{
    timeout:10_000
  },
  use: {
    baseURL: process.env.BASE_URL || '',
    trace: "on",
    actionTimeout:10_000,
    navigationTimeout:10_000,
    httpCredentials: {
      username: process.env.USER_LOGIN || '',
      password: process.env.USER_PASS || '',
    },
    browserName:"chromium"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "homework15",
      testDir:"tests/hw15",
    },
    {
      name: "homework16",
      testDir:"tests/hw16",
    },
    {
      name: "homework22",
      testDir:"tests/hw22",
      use: {
        extraHTTPHeaders: { Cookie: process.env.AUTH_SID || '' },
      },
      dependencies:["api_login"],
    },
    {
      name: "api_login",
      testDir:"./setup",
      testMatch:"api_login.mjs",
    },
  ],
});
