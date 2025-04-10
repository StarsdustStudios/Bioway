import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'
import { useEffect } from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
    IconHomeFilled,
    IconStack2Filled,
    IconNews,
    IconInfoSquareFilled,
} from "@tabler/icons-react"

export default function Home() {
    const { url } = usePage<SharedData>() // Get current URL

    // Route handler
    useEffect(() => {
        if (url !== '/') {
            window.location.href = '/'
        }
    }, [url])

    if (window.innerWidth > 768) {
        // Desktop view
        return (
            <div className="h-screen">
                <div className='bg-blue-400 absolute top-0 left-0 right-0 p-4 flex items-center justify-center h-fit'>
                    <NavigationMenu >
                        <NavigationMenuList >
                            <NavigationMenuItem>
                                <NavigationMenuLink>

                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    Product
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        )
    }
    else {
        // Mobile view
        return (
            <div className="h-screen">
                <div className='bg-blue-400 fixed bottom-0 w-full p-2 flex items-center justify-center h-fit rounded-t-4xl'>
                    <NavigationMenu >
                        <NavigationMenuList className="flex items-center gap-5 justify-center">
                            <NavigationMenuItem>
                                <NavigationMenuLink className='hover:bg-blue-300 rounded-lg items-center text-white'>
                                    <div className=''>
                                        <IconHomeFilled color='white' size={30} />
                                    </div>
                                    Home
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className='hover:bg-blue-300 rounded-lg items-center text-white'>
                                    <div className=''>
                                        <IconStack2Filled color='white' size={30} />
                                    </div>
                                    Product
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className='hover:bg-blue-300 rounded-lg items-center text-white'>
                                    <div className=''>
                                        <IconNews color='white' size={30} />
                                    </div>
                                    Blog
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink className='hover:bg-blue-300 rounded-lg items-center text-white'>
                                    <div className=''>
                                        <IconInfoSquareFilled color='white' size={30} />
                                    </div>
                                    About
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div >

        )
    }
}
