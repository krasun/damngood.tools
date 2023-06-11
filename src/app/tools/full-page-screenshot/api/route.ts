import { NextRequest, NextResponse } from 'next/server';

import { GenerateScreenshotsRequest, GenerateScreenshotsRequestSchema } from '@/lib/schema';
import { generateScreenshot } from '@/lib/screenshots';

export async function POST(request: NextRequest) {
    try {
        const generateRequest = await request.json() as GenerateScreenshotsRequest;
        const result = await GenerateScreenshotsRequestSchema.safeParseAsync(generateRequest);
        if (result.success) {
            const screenshot = await generateScreenshot(                
                generateRequest.website
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