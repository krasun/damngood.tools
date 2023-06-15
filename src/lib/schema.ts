import { z } from "zod"

export const DetectFontsRequestSchema = z.object({
    url: z.string().url(),
})
export type DetectFontsRequest = z.infer<typeof DetectFontsRequestSchema>

export const GenerateScreenshotsRequestSchema = z.object({
    website: z.string().url(),
})
export type GenerateScreenshotsRequest = z.infer<
    typeof GenerateScreenshotsRequestSchema
>

export const FullPageScreenshotSchema = z.object({
    website: z.string().url(),
    deviceName: z.optional(z.string()).or(z.literal(""))
})
export type GenerateFullPageScreenshotRequest = z.infer<
    typeof FullPageScreenshotSchema
>

export const SummarizeURLRequestSchema = z.object({
    website: z.string().url(),
})
export type SummarizeURLRequest = z.infer<typeof SummarizeURLRequestSchema>

export const FixGrammarRequestSchema = z.object({
    text: z.string().max(2048),
})
export type FixGrammarRequest = z.infer<typeof FixGrammarRequestSchema>

export const PrivacyPolicyRequestSchema = z.object({
    companyName: z.optional(z.string()),
    productName: z.optional(z.string()),
    website: z.optional(z.string().url()).or(z.literal("")),
    email: z.optional(z.string().email()).or(z.literal("")),
    format: z.enum(["plain_text", "markdown", "html"]),
})
export type PrivacyPolicyRequest = z.infer<typeof PrivacyPolicyRequestSchema>

export const OpenGraphImageSchema = z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
})
export type OpenGraphImageRequest = z.infer<typeof OpenGraphImageSchema>

export type ScreenshotData = {
    url: string
    viewportWidth: number
    viewportHeight: number
    device: string
}
