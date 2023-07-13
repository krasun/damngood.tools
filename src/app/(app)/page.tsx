import Link from "next/link"
import {
    Aperture,
    Bot,
    FileCheck,
    FileCog2,
    FileSearch,
    FileText,
    FileType,
    FileVideo,
    MessageSquare,
    Monitor,
} from "lucide-react"

import { getCurrentUser } from "@/lib/session"
import { PageHeader } from "@/components/page-header"

export default async function IndexPage() {
    const u = await getCurrentUser()

    const tools = [
        {
            name: "Privacy Policy Generator",
            description:
                "Generate privacy policy in a few seconds according to your preferences.",
            icon: <FileCog2 />,
            link: "/tools/privacy-policy-generator",
        },
        {
            name: "Screenshots",
            description:
                "Quickly test your website for popular screen dimensions.",
            icon: <Aperture />,
            link: "/tools/screenshots-for-dimensions",
        },
        {
            name: "Full Page Screenshots",
            description: "Render a full-page screenshot of any website.",
            icon: <Monitor />,
            link: "/tools/full-page-screenshots",
        },
        {
            name: "Scrolling Screenshots",
            description:
                "Render a scrolling animated screenshot of any website.",
            icon: <FileVideo />,
            link: "/tools/scrolling-screenshots",
        },
        {
            name: "Detect Fonts",
            description:
                "Quickly detect fonts used on any website and get links on how to install or download them.",
            icon: <FileType />,
            link: "/tools/detect-fonts",
        },
        {
            name: "Chat With Any PDF",
            description:
                "Upload a PDF file and ask any questions about it. Let AI answer them.",
            icon: <FileSearch />,
            link: "/tools/chat-pdf",
        },
        {
            name: "Summarize Any URL",
            description: "Quickly summarize any website or URL.",
            icon: <FileText />,
            link: "/tools/summarize-any-url",
        },
        {
            name: "Grammar Fixer",
            description: "Fix the grammar of any text in one click.",
            icon: <FileCheck />,
            link: "/tools/grammar-fixer",
        },
        {
            name: "Damn Good Chat",
            description:
                "A better ChatGPT alternative that supports superb ChatGPT plugins.",
            icon: <MessageSquare />,
            link: "/tools/damn-good-chat",
        },
        // {
        //     name: "GPT4All Chat",
        //     description:
        //         "Chat with an free and open-source alternative GPT model.",
        //     icon: <Bot />,
        //     link: "/tools/gpt4all-chat",
        // },
    ]

    return (
        <>
            <PageHeader
                heading="Oh, these damn good tools"
                subheading="Easy-to-use, fun tools—free (and open-source)."
            />
            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
                {tools.map((tool, idx) => (
                    <div key={idx} className="p-4">
                        <Link
                            href={tool.link}
                            className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                        >
                            <span className="text-red-500 dark:text-red-700">{tool.icon}</span>
                            <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                                {tool.name}
                            </div>
                        </Link>
                        <p className="ml-8 mt-2 text-muted-foreground">
                            {tool.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}
