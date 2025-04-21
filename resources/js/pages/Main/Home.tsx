import MainLayout from './Main'
import { PromoCarousel } from '@/components/global/PromoCarousel'
import { PartnerCarousel } from '@/components/global/PartnerCarousel'
import { ProductNav } from '@/components/global/ProductNav'
import { Button } from '@/components/ui/button'
// import { PartnerCarousel } from '@/components/global/PartnerCarousel'

export interface Partner {
    id: number
    name: string
    logo: string // full URL after mapping in controller
}

export interface HomeProps {
    title: string
    description: string
    partners: Partner[]
}
function Home({ title, description, partners }: HomeProps) {
    return (
        <>
            <PromoCarousel />
            <Button className='my-7 p-8 text-xl bg-blue-500 hover:bg-blue-300'>Pesan Cepat Sekarang</Button>
            <h1 className="text-4xl font-bold my-5">Mitra Kami</h1>
            <PartnerCarousel partners={partners} />
            <ProductNav />
            <div className='md:mb-0 mb-20'>

            </div>
        </>
    )
}

Home.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Home
