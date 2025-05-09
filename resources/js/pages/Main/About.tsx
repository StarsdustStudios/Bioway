import MainLayout from './Main'
import { PromoCarousel } from '@/components/global/PromoCarousel'

function About() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">About US</h1>
            <p className="text-lg mb-8">Here are some of the awesome products we offer.</p>
        </>
    )
}

About.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default About
