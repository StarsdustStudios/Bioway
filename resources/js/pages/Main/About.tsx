import MainLayout from './Main'
import { PromoCarousel } from '@/components/global/PromoCarousel'

function Product() {
    return (
        <>
            <PromoCarousel />
            <h1 className="text-4xl font-bold mb-4">About US</h1>
            <p className="text-lg mb-8">Here are some of the awesome products we offer.</p>
        </>
    )
}

Product.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Product
