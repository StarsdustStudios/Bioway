import MainLayout from '../Main'
import { PromoCarousel } from '@/components/global/PromoCarousel'
import { PartnerCarousel } from '@/components/global/PartnerCarousel'
import { ProductNav } from '@/components/global/ProductNav'
import { Button } from '@/components/ui/button'
// import { PartnerCarousel } from '@/components/global/PartnerCarousel'

function Blog() {
    return (
        <>

            <h1 className='text-4xl font-bold my-5'>Blog</h1>

            <div>
                <h1 className='text-4xl font-bold my-15'>Artikel Terbaru</h1>
            </div>

            <div className='md:mb-0 mb-20'>
            </div>
        </>
    )
}

Blog.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Blog
