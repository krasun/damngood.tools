import * as screenshotone from "screenshotone-api-sdk"

import { ScreenshotOptions, Screenshot, ScreenshotDevice, screenshotDevices, screenshotExampleUrl, screenshotFullPage } from "./shared"

const globalForScreenshotOne = global as unknown as {
    screenshotoneClient: screenshotone.Client
}

if (
    process.env.SCREENSHOTONE_ACCESS_KEY === undefined ||
    process.env.SCREENSHOTONE_SECRET_KEY === undefined
) {
    throw new Error(
        `SCREENSHOTONE_ACCESS_KEY and SCREENSHOTONE_SECRET_KEY environment variables are required`
    )
}

const accessKey = process.env.SCREENSHOTONE_ACCESS_KEY
const secretKey = process.env.SCREENSHOTONE_SECRET_KEY

const screenshotoneClient =
    globalForScreenshotOne.screenshotoneClient ||
    new screenshotone.Client(accessKey, secretKey)

if (process.env.NODE_ENV !== "production")
    globalForScreenshotOne.screenshotoneClient = screenshotoneClient

export function screenshotUrl(url: string, screenshotOptions: ScreenshotOptions): string {
    const cacheKey =
        url == screenshotExampleUrl
            ? "example"
            : new String(new Date().getTime()).toString()
    const cacheTtl = url == screenshotExampleUrl ? 2592000 : 14400;

    const options = screenshotone.TakeOptions.url(url)
        .blockChats(true)
        .blockCookieBanners(true)
        .blockAds(true)
        .cache(true)
        .blockBannersByHeuristics(false)
        .cacheKey(cacheKey)
        .cacheTtl(cacheTtl)
        .reducedMotion(true)
        .deviceScaleFactor(screenshotOptions.deviceScaleFactor ?? 1)
        .fullPage(screenshotOptions.fullPage ?? false)
        .viewportWidth(screenshotOptions.viewportWidth ?? 0)
        .viewportHeight(screenshotOptions.viewportHeight ?? 0)

    return screenshotoneClient.generateSignedTakeURL(options)
}

export async function generateExampleScreenshots(): Promise<Screenshot[]> {
    return await generateScreenshots(screenshotExampleUrl)
}

export async function generateScreenshots(url: string): Promise<Screenshot[]> {
    return screenshotDevices.map((d) => mapScreenshot(url, d)) 
}

export async function generateExampleScreenshot(): Promise<Screenshot> {
    return await generateScreenshot(screenshotExampleUrl, screenshotFullPage);
}

export async function generateScreenshot(url: string, device: ScreenshotDevice): Promise<Screenshot> {
    return mapScreenshot(url, device); 
}

function mapScreenshot(url: string, screenshotDevice: ScreenshotDevice): Screenshot { 
    return {
        url: screenshotUrl(url, screenshotDevice),
        viewportWidth: screenshotDevice.viewportWidth,
        viewportHeight: screenshotDevice.viewportHeight,
        device: screenshotDevice.name,
    } 
}
