import { PageHeader } from "@/components/page-header"
import { Screenshots } from "./Screenshots"
import { generateExampleScreenshots } from "@/lib/screenshots"
import { screenshotExampleUrl } from "@/lib/shared";

export default async function ScreenshotsForDimensions() {
    const exampleScreenshots = await generateExampleScreenshots();
    
    return (
        <>
            <PageHeader
                heading="Screenshots"
                subheading="Quickly test your website for popular screen dimensions."
            />                        
            <Screenshots exampleScreenshots={exampleScreenshots} exampleScreenshotUrl={screenshotExampleUrl} />            
        </>
    )
}
