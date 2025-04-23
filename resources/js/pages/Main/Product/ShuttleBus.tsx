import MainLayout from './MainProduct'
import { PromoCarousel } from '@/components/global/PromoCarousel'

export interface Event {
    id: number
    name: string
    poster_img: string
}
function Product({ events }: { events: Event[] }) {
    return (
        <>
            <PromoCarousel events={events} />
            <p className="text-lg mb-8">Bus</p>

            
        </>
    )
}

Product.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Product
