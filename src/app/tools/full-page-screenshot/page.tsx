import { PageHeader } from "@/components/page-header"
import { Screenshots } from "./FullPageScreenshot"
import { generateExampleScreenshot} from "@/lib/screenshots"
import { screenshotExampleUrl } from "@/lib/shared";

export default async function ScreenshotsForDimensions() {
    const exampleScreenshot = await generateExampleScreenshot();
    
    return (
        <>
            <PageHeader
                heading="Full Page Screenshot"
                subheading="Get full page screenshot now!"
            />                        
            <Screenshots exampleScreenshot={exampleScreenshot} exampleScreenshotUrl={screenshotExampleUrl} />            
        </>
    )
}
