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
            <div className="flex items-center gap-3">
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.href ? (
                            <Link href={item.href}>
                                <p className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">
                                    {item.label}
                                </p>
                            </Link>
                        ) : (
                            <p className="text-sm text-[#41A3B7]">{item.label}</p>
                        )}
                        {index < breadcrumbs.length - 1 && (
                            <Image
                                src="/icons/next-icon.svg"
                                alt="Next"
                                width={20}
                                height={20}
                                className="opacity-40"
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-700">{title}</h1>

            {backLink && (
                <Link href={backLink}>
                    <div className="flex w-24 cursor-pointer items-center justify-center gap-2 rounded-full bg-gray-200 py-2 hover:bg-gray-300">
                        <Image src="/icons/arrow-icon.svg" alt="Back" width={20} height={20} />
                        <p className="pr-2 text-sm font-semibold text-gray-700">Back</p>
                    </div>
                </Link>
            )}
        </>
    )
}

export default PageHeader
