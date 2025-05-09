import { lazy, Suspense } from 'react'
import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { ThemeProvider } from '@/context/theme-context'

const NotFoundError = lazy(() => import('../errors/not-found-error'))

const RentalPage = lazy(() => import('./product/rental/RentalPage'))
const CarterPage = lazy(() => import('./product/carter/CarterPage'))
const ShuttleBusPage = lazy(() => import('./product/shuttlebus/ShuttleBusPage'))
const DeliveryPage = lazy(() => import('./product/delivery/DeliveryPage'))


const EventPage = lazy(() => import('./cms/event/EventPage'))
const CategoryPage = lazy(() => import('./cms/category/CategoryPage'))
const PostPage = lazy(() => import('./cms/post/PostPage'))
const BlogEditorPage = lazy(() => import('./cms/post/BlogEditorPage'))

const LocationPage = lazy(() => import('./option/location/LocationPage'))
const BrandPage = lazy(() => import('./option/brand/BrandPage'))
const CarsPage = lazy(() => import('./option/cars/CarsPage'))
const PatnerPage = lazy(() => import('./option/partner/PartnerPage'))
const TourPage = lazy(() => import('./product/tour/TourPage'))

interface Brand {
  id: number;
  name: string;
  brand_logo: string;
  created_at: string;
  updated_at: string;
  cars: Cars[];
}
interface Cars {
  model: string;
  brand_id: number;
  car_image: string;
  created_at: string;
  updated_at: string;
}

interface Blog {
  id: number,
  category_id: number,
  title: string,
  hero_image: string,
  slug: string,
  contents: string,
}

export type DashboardData = { brands: Brand[]} | { cars: Cars[]} | {blog: Blog};

export default function Dashboard(data: {data: DashboardData}) {
  const { url } = usePage<SharedData>() 
  // Route handler
  const renderContent = () => {
    if (url.startsWith('/product')) {
      switch (url) {
        case '/product/rental':
          return <RentalPage index={0} data={data} />
        case '/product/carter':
          return <CarterPage index={1} data={data}/>
        case '/product/shuttle-bus':
          return <ShuttleBusPage index={2} data={data}/>
        case '/product/tour':
          return <TourPage index={3} data={data} />
        case '/product/delivery':
          return <DeliveryPage index={4} data={data}/>
        case "/product/brands":
          return <BrandPage index={0} data={data} />
        case "/product/cars":
          return <CarsPage index={1} data={data} />
        case "/product/locations":
          return <LocationPage index={2} data={data} />
        case "/product/partners":
          return <PatnerPage index={3} data={data} />
          default:
            <NotFoundError/>
      }
    }

    if (url.startsWith('/cms')) {
      switch (url) {
        case '/cms/tags':
          // return <CmsPage index={0} />
          return <NotFoundError/>
        case '/cms/events':
          return <EventPage index={1} data={data}/>
        case '/cms/posts':
          return <PostPage index={2} data={data}/>
        case '/cms/categories':
          return <CategoryPage index={3} data={data}/>
        default:
          if (url.startsWith('/cms/posts/')) {
            return <BlogEditorPage data={data}/>
          } 
          return <NotFoundError/>
      }
    }
    return <div>Welcome to Dashboard</div>
  }

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div
          id="content"
          className="ml-auto w-full max-w-full peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] transition-[width] duration-200 ease-linear flex h-svh flex-col group-data-[scroll-locked=1]/body:h-full group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
        >
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            {renderContent()}
          </Suspense>
        </div>
      </SidebarProvider>
    </ThemeProvider>
    )
}