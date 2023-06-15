"use client"

import { forwardRef, Ref, useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExternalLink, Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import {
    FullPageScreenshotSchema,
    GenerateFullPageScreenshotRequest,
} from "@/lib/schema"
import { Screenshot as ScreenshotData, screenshotDevices } from "@/lib/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { SelectProps } from "@radix-ui/react-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ScreenshotPlaceholder = () => {
    return (
        <div className="flex h-[300px] w-[300px]">
            <div className="m-auto flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
}

const DeviceSelect = forwardRef(
    (
        { ...props }: SelectProps & { forwardedRef: Ref<HTMLButtonElement> },
        forwardedRef: Ref<HTMLButtonElement>
    ) => {
        return (
            <Select {...props}>
                <SelectTrigger className="w-full" ref={forwardedRef}>
                    <SelectValue placeholder="Full Page"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        screenshotDevices.map(device => (<SelectItem key={device.name} value={device.name}>{device.name}</SelectItem>))
                    }
                </SelectContent>
            </Select>
        )
    }
)
DeviceSelect.displayName = "DeviceSelect"

type ScreenshotProps = {
    fullPage?: boolean
    viewportWidth?: number
    viewportHeight?: number
    device: string
    url: string
}

const Screenshot = ({
    viewportWidth,
    viewportHeight,
    device,
    url,
}: ScreenshotProps) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div>
            <div className="text-md">
                <Link
                    href={url}
                    target="_black"
                    className="flex flex-row items-center justify-center text-muted-foreground"
                >
                    <span>
                        {device} {viewportWidth && viewportWidth > 0 && viewportHeight && viewportHeight > 0 ? (viewportWidth + "x" + viewportHeight) : ''}
                    </span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
            </div>
            <div className="mt-4 ">
                {!loaded && <ScreenshotPlaceholder />}
                <Link href={url} target="_black">
                    <img
                        ref={(input) => {
                            if (!input) {
                                return
                            }

                            const img = input

                            const updateFunc = () => {
                                setLoaded(true)
                            }
                            img.onload = updateFunc
                            if (img.complete) {
                                updateFunc()
                            }
                        }}
                        src={url}
                        className={`rounded-lg border-muted-foreground ${
                            !loaded && "hidden"
                        }`}
                    />
                </Link>
            </div>
        </div>
    )
}

interface ExampleScreenshotProps {
    exampleScreenshot: ScreenshotData
    exampleScreenshotUrl: string
}

export function FullPageScreenshot(screenshotProps: ExampleScreenshotProps) {
    const { toast } = useToast()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GenerateFullPageScreenshotRequest>({
        resolver: zodResolver(FullPageScreenshotSchema),
    })

    const [generating, setGenerating] = useState<boolean>(false)
    const [screenshot, setScreenshot] =
        useState<ScreenshotData>(screenshotProps.exampleScreenshot)

    const onSubmit = async (data: GenerateFullPageScreenshotRequest) => {
        setGenerating(true)

        try {
            const response = await fetch(
                "/tools/full-page-screenshot/api",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            )
            setGenerating(false)

            if (response.ok) {
                const result = (await response.json()) as {
                    screenshot: ScreenshotData
                }
                if (result.screenshot) {
                    return setScreenshot(result.screenshot)
                }
            }

            throw new Error("Failed to generate screenshot")
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }

        setGenerating(false)
    }

    return (
        // <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex max-w-[250px] flex-col gap-5 md:col-span-1"
            >
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="website">Your website:</Label>
                    <Input
                        type="url"
                        id="website"
                        placeholder={screenshotProps.exampleScreenshotUrl}
                        {...register("website")}
                    />
                    
                    {errors.website && errors.website?.message && (
                        <p className="text-sm text-destructive">
                            {errors.website?.message}
                        </p>
                    )}
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="deviceName">Choose device:</Label>
                    <Controller
                        name="deviceName"
                        control={control}
                        render={({
                            field: { onChange, value, ref, ...props },
                        }) => (
                            <DeviceSelect
                                onValueChange={onChange}
                                value={value}
                                forwardedRef={ref}
                            />
                        )}
                    />
                    {errors.deviceName && errors.deviceName?.message && (
                        <p className="text-sm text-destructive">
                            {errors.deviceName?.message}
                        </p>
                    )}
                </div>
                <Button type="submit" disabled={generating}>
                    {generating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Render screenshot"
                    )}
                </Button>
            </form>
            {/* <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"> */}
            <div>
                <Screenshot
                    key={screenshot.url}
                    url={screenshot.url}
                    fullPage={screenshot.fullPage}
                    viewportWidth={screenshot.viewportWidth}
                    viewportHeight={screenshot.viewportHeight}
                    device={screenshot.device}
                />
            </div>
        </div>
    )
}
