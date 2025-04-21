import { lazy, Suspense } from 'react'
import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { ThemeProvider } from '@/context/theme-context'

const NotFoundError = lazy(() => import('../errors/not-found-error'))
const CmsPage = lazy(() => import('./cms/CmsPage'))
const ProductPage = lazy(() => import('./product/ProductPage'))
const BrandPage = lazy(() => import('./option/brand/BrandPage'))
const CarsPage = lazy(() => import('./option/cars/CarsPage'))
const PatnerPage = lazy(() => import('./option/patner/PatnerPage'))
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

export type DashboardData = { brands: Brand[]} | { cars: Cars[]};

export default function Dashboard(data: {data: DashboardData}) {
  const { url } = usePage<SharedData>() 
  // Route handler
  const renderContent = () => {
    if (url.startsWith('/product')) {
      switch (url) {
        case '/product/rental':
          return <ProductPage index={0} />
        case '/product/carter':
          return <ProductPage index={1} />
        case '/product/shuttle-bus':
          return <ProductPage index={2} />
        case '/product/travel':
          return <ProductPage index={3} />
        case '/product/delivery':
          return <ProductPage index={4} />
        case "/product/brands":
          return <BrandPage index={0} data={data} />
        case "/product/cars":
          return <CarsPage index={1} data={data} />
        case "/product/partners":
          return <PatnerPage index={2} data={data} />
          default:
            <NotFoundError/>
      }
    }

    if (url.startsWith('/cms')) {
      switch (url) {
        case '/cms/tags':
          return <CmsPage index={0} />
        case '/cms/promo':
          return <CmsPage index={1} />
        case '/cms/post':
          return <CmsPage index={3} />
        default:
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