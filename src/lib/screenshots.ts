import * as screenshotone from "screenshotone-api-sdk"

import { PathVariables, Screenshot, screenshotDevices, screenshotExampleUrl } from "./shared"



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

export function screenshotUrl(url: string, pathVariables: PathVariables): string {
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
        .deviceScaleFactor(pathVariables.deviceScaleFactor ?? 1)
    if (pathVariables.fullPage) {
        options.fullPage(pathVariables.fullPage)
    } else {
        options.viewportWidth(pathVariables.viewportWidth ?? 0)
        options.viewportHeight(pathVariables.viewportHeight ?? 0)
    }

    return screenshotoneClient.generateSignedTakeURL(options)
}

export async function generateExampleScreenshots(): Promise<Screenshot[]> {
    return await generateScreenshots(screenshotExampleUrl)
}

export async function generateScreenshots(url: string): Promise<Screenshot[]> {
    return screenshotDevices.map((d) => {
        return {
            url: screenshotUrl(url, d),
            fullPage: d.fullPage,
            viewportWidth: d.viewportWidth,
            viewportHeight: d.viewportHeight,
            device: d.name,
        }
    })
}
