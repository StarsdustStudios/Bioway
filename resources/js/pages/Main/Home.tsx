import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'
import { useEffect } from 'react'
import { DesktopNavBar, MobileNavBar } from '@/components/global/Navbar'

export default function Home() {
    const { url } = usePage<SharedData>() // Get current URL

    // Route handler
    useEffect(() => {
        if (url !== '/') {
            window.location.href = '/'
        }
    }, [url])

      const isDesktop = window.innerWidth > 768

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
            <p className="text-lg mb-8">This is the home page.</p>
            {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
        </div>
    )
}
