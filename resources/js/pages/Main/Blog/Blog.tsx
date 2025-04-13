import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'
import { useEffect } from 'react'
import { DesktopNavBar, MobileNavBar } from '@/components/global/Navbar'
import { BlogCard } from '@/components/global/BlogCard'
import { PromoCarousel } from '@/components/global/PromoCarousel'

export default function Blog() {
    const { url } = usePage<SharedData>() // Get current URL

    // Route handler
    useEffect(() => {
        if (url !== '/blog') {
            window.location.href = '/blog'
        }
    }, [url])

      const isDesktop = window.innerWidth > 768

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
            <PromoCarousel/>
            <h1 className="text-4xl font-bold mb-4">Artikel dan Berita</h1>
            <p className="text-lg mb-8">This is the home page.</p>
        </div>
    )
}
