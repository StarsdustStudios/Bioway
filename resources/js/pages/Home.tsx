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


export default function Home() {
    const { url } = usePage<SharedData>() // Get current URL

    // Route handler
    useEffect(() => {
        if (url !== '/') {
            window.location.href = '/'
        }
    }, [url])

    return (

        <div className="h-screen bg-gray-100">
            <div className='bg-blue-400 absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center h-fit'>
                <NavigationMenu >
                    <NavigationMenuList >
                        <NavigationMenuItem className="flex items-center gap-4 justify-center">
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>

    )
}