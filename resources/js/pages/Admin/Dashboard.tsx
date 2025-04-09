import { lazy, Suspense } from 'react'
import { usePage } from '@inertiajs/react'
import { type SharedData } from '@/types'

import { SidebarProvider } from '@/components/ui/sidebar'
// import { SearchProvider } from '@/context/search-context'
import AppSidebar from '@/components/app-sidebar'

// Lazy load CMS and Product components
const CmsPage = lazy(() => import('./cms/CmsPage'))
const ProductPage = lazy(() => import('./product/ProductPage'))

export default function Dashboard() {
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
        default:
          return <div>Page not found</div>
      }
    }

    if (url.startsWith('/cms')) {
      switch (url) {
        case '/cms/tags':
          return <CmsPage index={0} />
        case '/cms/promo':
          return <CmsPage index={1} />
        case '/cms/post':
          return <CmsPage index={2} />
        default:
          return <div>Page not found</div>
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