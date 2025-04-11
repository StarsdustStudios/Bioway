import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'
import { useEffect } from 'react'
import { DesktopNavBar, MobileNavBar } from '@/components/global/Navbar'

import  HomePage  from './Home'
import  Product  from './Product'
import  AboutPage from './About'
import  NotFound  from './NotFound'

export default function Home() {
    const { url } = usePage<SharedData>()

    const renderContent = () => {
        switch (true) {
            case url === '/':
              return <HomePage />
          
            case url.startsWith('/produk'):
              return <Product />
          
            case url === '/about':
              return <AboutPage />
          
            default:
              return <NotFound />
          }
    }

    const isDesktop = window.innerWidth > 768

    return (
        <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
            <p className="text-lg mb-8">This is the home page.</p>
            {isDesktop ? <DesktopNavBar /> : <MobileNavBar />}
        </div>
    )
}