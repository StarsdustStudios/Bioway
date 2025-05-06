import MainLayout from '../Main'

function Blog() {
    return (
        <>

            <h1 className='text-4xl font-bold my-5'>Blog</h1>

            <div className='md:mb-0 mb-20'>
            </div>
        </>
    )
}

Blog.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default Blog
