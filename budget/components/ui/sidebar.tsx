'use client'
import React, { useEffect, useState } from 'react'
import { Nav } from './nav'
import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ReceiptEuro
} from "lucide-react"
import { Button } from './button'
import Image from 'next/image'
import { useWindowWidth } from '@react-hook/window-size'
import { ThemeModeToggle } from './dark-theme-button'

import dynamic from 'next/dynamic'
import SidebarPlaceHolder from './sidebar-placeholder'
import { populateDatabase } from '@/lib/service/test'


type Props = {}

export default function Sidebar({ }: Props) {

    const [isCollapsed, setIsCollapsed] = React.useState(false)

    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 768

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed)
    }

    const [hydrated, setHydrated] = useState(false);

    // This useEffect is a solution to a hydration problem. Without this, the menu items are not correctly rendered on the first load.
    // This forces a rerender, which fixes the problem.
    useEffect(() => {        
        setHydrated(true)
    }, [])

    if (!hydrated) {
        // this returns null on first render, so the client and server match
        return <SidebarPlaceHolder/>
    }


    return (
        <div className='relative min-w-[80px] min-h-screen border-r px-3 pb-10 pt-24' >
            {!mobileWidth &&
                <div className='absolute right-[-20px] top-7' >
                    <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar} >
                        <ChevronRight />
                    </Button>
                </div>
            }

            <div className="flex justify-center max-w-lg flex-col mx-auto" >
                <Image src="/images/iron-patriot.png" width={45} height={45} alt="" className="self-center" />
            </div>

            <div className={isCollapsed ? "" : "mr-2"}>
                <Nav
                    isCollapsed={mobileWidth ? true : isCollapsed}
                    links={[
                        {
                            title: "Dashboard",
                            href: "/dashboard",
                            icon: LayoutDashboard,
                            variant: "ghost",
                        },
                        {
                            title: "Budget",
                            href: "/budgetGroups",
                            icon: ReceiptEuro,
                            variant: "ghost",
                        },
                        {
                            title: "Settings",
                            href: "/settings",
                            icon: Settings,
                            variant: "ghost",
                        },
                    ]}
                />
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <div className='flex justify-center my-4'>
                    <ThemeModeToggle ></ThemeModeToggle>
                </div>
                <div className='flex justify-center my-4'>
                    <h4 className='text-xs'>v0.0.1</h4>
                </div>
            </div>
        </div>
    )
}