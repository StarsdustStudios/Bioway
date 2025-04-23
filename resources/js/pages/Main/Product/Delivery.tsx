import MainLayout from './MainProduct'
import { PromoCarousel } from '@/components/global/PromoCarousel'

function Product() {
    return (
        <>
 
            {/* <PromoCarousel /> */}
            <p className="text-lg mb-8">Delivery</p>
        </>
    )
}

Product.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Product
