import MainLayout from './Main'

function Home() {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">Welcome to Our App!</h1>
            <p className="text-lg mb-8">This is the home page.</p>
        </>
    )
}

Home.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Home
