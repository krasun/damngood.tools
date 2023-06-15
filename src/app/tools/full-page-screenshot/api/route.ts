import { NextRequest, NextResponse } from 'next/server';

import { FullPageScreenshotSchema, GenerateFullPageScreenshotRequest } from '@/lib/schema';
import { generateScreenshot } from '@/lib/screenshots';
import { screenshotDevices, screenshotFullPage } from '@/lib/shared';

export async function POST(request: NextRequest) {
    try {
        const generateRequest = await request.json() as GenerateFullPageScreenshotRequest;
        const result = await FullPageScreenshotSchema.safeParseAsync(generateRequest);
        if (result.success) {
            let deviceData = screenshotDevices.find(d => d.name === generateRequest.deviceName) ?? screenshotFullPage
            deviceData.fullPage = true;
            const screenshot = await generateScreenshot(                
                generateRequest.website,
                deviceData
            );

            return NextResponse.json({
                success: screenshot,
                screenshot
            });
        }

        return NextResponse.json({
            success: false,
            message: result.error.message
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ success: false, message: 'Internal application error' }, { status: 500 });
    }
}