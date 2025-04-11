import { useEffect, useState } from 'react'
import { DesktopNavBar, MobileNavBar } from '@/components/global/Navbar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                {children}
            </main>
        </div>
    )
}
