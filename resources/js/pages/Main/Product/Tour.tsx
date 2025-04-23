import MainLayout from './MainProduct'
import { PromoCarousel } from '@/components/global/PromoCarousel'

function Product() {
    return (
        <>

            <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
            {/* <PromoCarousel /> */}
            <p className="text-lg mb-8">Travel</p>
        </>
    )
}

Product.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Product
