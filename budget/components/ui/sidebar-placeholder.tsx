

import { Nav } from './nav'
import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ReceiptEuro,
    RefreshCw
} from "lucide-react"
import { Button } from './button'
import Image from 'next/image'
import { ThemeModeToggle } from './dark-theme-button'

import dynamic from 'next/dynamic'


type Props = {}

export default function SidebarPlaceHolder({ }: Props) {

    return (
        <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24' >

            <div className='absolute right-[-20px] top-7' >
                <Button variant='secondary' className='rounded-full p-2' >
                    <ChevronRight />
                </Button>
            </div>


            <div className="flex justify-center max-w-lg flex-col mx-auto" >
                <RefreshCw className='self-center animate-spin' />
            </div>

            <div className={"mr-2"}>
                <Nav
                    isCollapsed={false}
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