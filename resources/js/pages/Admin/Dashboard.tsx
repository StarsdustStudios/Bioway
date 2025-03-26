
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Tags from './cms/Tags';
import Promo from './cms/Promo';
import Post from './cms/Post';
import { ProductPage } from './product/rental/ProductPage';
import { SearchProvider } from '@/context/search-context';


export default function Dashboard() {
  const { url } = usePage(); // Get the current URL from Inertia
  const { auth } = usePage<SharedData>().props;

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <div
          id='content'
          className=
          'ml-auto w-full max-w-full peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] transition-[width] duration-200 ease-linear flex h-svh flex-col group-data-[scroll-locked=1]/body:h-full group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'>
          {/* Products pages */}
          {url === "/product/rental" && <ProductPage index={0}/>}
          {url === "/product/carter" && <ProductPage index={1}/>}
          {url === "/product/shuttle-bus" && <ProductPage index={2}/>}
          {url === "/product/travel" && <ProductPage index={3}/>}
          {url === "/product/delivery" && <ProductPage index={4}/>}

          {/* CMS */}
          {url === "/cms/tags" && <Tags />}
          {url === "/cms/promo" && <Promo />}
          {url === "/cms/post" && <Post />}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}