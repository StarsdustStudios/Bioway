import { lazy, Suspense } from 'react'
import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'

import { SidebarProvider } from '@/components/ui/sidebar'
// import { SearchProvider } from '@/context/search-context'
import AppSidebar from '@/components/app-sidebar'
import ItemDataPage from './option/OptionPage'
import ForbiddenError from '../errors/forbidden'

// Lazy load CMS and Product components
const NotFoundError = lazy(() => import('../errors/not-found-error'))
const CmsPage = lazy(() => import('./cms/CmsPage'))
const ProductPage = lazy(() => import('./product/ProductPage'))

interface Car {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
  brand_logo: string;
  created_at: string;
  updated_at: string;
  cars: Car[];
}

interface ApiResponse {
  brands: Brand[];
}

export type DashboardData = { brands: Brand[] } | { otherData: OtherType[] };

export default function Dashboard(data: {data: DashboardData}) {
  const { url } = usePage<SharedData>() // Get current URL

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
          // return <NotFoundError/>
          default:
            if (url === '/product/brands') {
              return ItemDataPage({index: 0}, {data})
            }
            else if (url.startsWith('/product/brands')) {
              window.location.replace('/product/brands')
            }

            if (url === '/product/cars') {
              return ItemDataPage({index: 1}, {data})
            }
            else if (url.startsWith('/product/cars')) {
              window.location.replace('/product/cars')
            }
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
    // <SearchProvider>
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
    // </SearchProvider>
  )
}