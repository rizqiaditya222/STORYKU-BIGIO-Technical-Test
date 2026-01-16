import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface PageHeaderProps {
    breadcrumbs: BreadcrumbItem[]
    title: string
    backLink?: string
}

const PageHeader = ({ breadcrumbs, title, backLink }: PageHeaderProps) => {
    return (
        <>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.href ? (
                            <Link href={item.href}>
                                <p className="text-xs md:text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
                                    {item.label}
                                </p>
                            </Link>
                        ) : (
                            <p className="text-xs md:text-sm text-[#41A3B7]">{item.label}</p>
                        )}
                        {index < breadcrumbs.length - 1 && (
                            <Image
                                src="/icons/next-icon.svg"
                                alt="Next"
                                width={16}
                                height={16}
                                className="opacity-40"
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-700">{title}</h1>

            {backLink && (
                <Link href={backLink}>
                    <div className="flex w-20 md:w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-200 py-1.5 md:py-2 hover:bg-gray-300 transition-colors">
                        <Image src="/icons/arrow-icon.svg" alt="Back" width={16} height={16} />
                        <p className="pr-1 md:pr-2 text-xs md:text-sm font-semibold text-gray-700">Back</p>
                    </div>
                </Link>
            )}
        </>
    )
}

export default PageHeader
