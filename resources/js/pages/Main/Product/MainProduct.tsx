import { useEffect, useState } from 'react'
import { DesktopNavBar, MobileNavBar } from '@/components/global/Navbar'
import { ProductNav } from '@/components/global/ProductNav'

export default function MainProduct({ children }: { children: React.ReactNode }) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth > 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex flex-col">
            {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
            
            <main className="flex-grow flex flex-col justify-center items-center p-4">
            <ProductNav />
                {children}
            </main>
        </div>
    )
}
