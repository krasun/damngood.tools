export type Plugin = {
    name: string
    description: string
}

export type PDFPage = {
    textContent: string
    page: number
}

export type PDFChatQuestion = {
    question: string
    chatId: string
}

export type ChatPrompt = {
    prompt: string
    apiKey?: string
}

export const screenshotExampleUrl = "https://example.com"

export type ScreenshotOptions = {
    fullPage?: boolean,
    viewportWidth?: number,
    viewportHeight?: number,
    deviceScaleFactor?: number
}

export type SummarizationResult = {
    text: string
}

export type GrammarFixResult = {
    text: string
    sourceText: string
}

export type Screenshot = {
    url: string
    device: string;
} & ScreenshotOptions;

export type UrlDataFont = {
    first: string
    fallback: string[]
    elements: string[]
}

export type ScreenshotDevice = {
    name: string
} & ScreenshotOptions;

export const screenshotFullPage: ScreenshotDevice = {
    name: "Full Page",
    fullPage: true,
    deviceScaleFactor: 1,
}

export const screenshotDevices: ScreenshotDevice[] = [
    {
        name: "Desktop",
        viewportWidth: 1920,
        viewportHeight: 1080,
        deviceScaleFactor: 1,
    },
    {
        name: "iPhone 13 Pro Max Landscape",
        viewportWidth: 926,
        viewportHeight: 428,
        deviceScaleFactor: 3,
    },
    {
        name: "Pixel 5 Landscape",
        viewportWidth: 851,
        viewportHeight: 393,
        deviceScaleFactor: 3,
    },
    {
        name: "Pixel 5",
        viewportWidth: 393,
        viewportHeight: 851,
        deviceScaleFactor: 3,
    },
    {
        name: "iPhone 13 Pro Max",
        viewportWidth: 428,
        viewportHeight: 926,
        deviceScaleFactor: 3,
    },
    {
        name: "iPhone X",
        viewportWidth: 375,
        viewportHeight: 812,
        deviceScaleFactor: 3,
    },
]
