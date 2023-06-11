import Link from "next/link"
import {
    Aperture,
    Bot,
    FileCheck,
    FileCog2,
    FileSearch,
    FileText,
    FileType,
    MessageSquare,
} from "lucide-react"

import { PageHeader } from "@/components/page-header"

export default function IndexPage() {
    const tools = [
        {
            name: "Privacy policy",
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
            name: "Full page screenshot",
            description:
                "Get full page screenshot",
            icon: <Aperture />,
            link: "/tools/full-page-screenshot",
        },
        {
            name: "Fonts",
            description:
                "Quickly detect fonts used on any website and get links on how to install or download them.",
            icon: <FileType />,
            link: "/tools/detect-fonts",
        },
        {
            name: "Chat with any PDF",
            description:
                "Upload a PDF file and ask any questions about it. Let AI answer them.",
            icon: <FileSearch />,
            link: "/tools/chat-pdf",
        },
        {
            name: "Summarize any URL",
            description: "Quickly summarize any website or URL.",
            icon: <FileText />,
            link: "/tools/summarize-any-url",
        },
        {
            name: "Grammar fixer",
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
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                {tools.map((tool, idx) => (
                    <div key={idx} className="p-4">
                        <Link
                            href={tool.link}
                            className="flex flex-row gap-2 text-primary"
                        >
                            {tool.icon}
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
