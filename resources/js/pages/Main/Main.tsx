import { useEffect, useState } from 'react'
import { DesktopNavBar, MobileNavBar, MobileNavbarTop } from '@/components/global/Navbar'
import { Footer } from '@/components/global/Footer'


export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex flex-col">
            {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
            {isDesktop ? null : <MobileNavbarTop />}
            
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                {children}
            </main>

            <Footer />
        </div>
    )
}
