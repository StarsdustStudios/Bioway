
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Carter from './product/Carter';
import ShuttleBus from './product/ShuttleBus';
import Travel from './product/Travel';
import Delivery from './product/Delivery';
import Tags from './cms/Tags';
import Promo from './cms/Promo';
import Post from './cms/Post';
import { Rentax } from './product/rental/index';
import { SearchProvider } from '@/context/search-context';
import SkipToMain from '@/components/skip-to-main';


export default function Dashboard() {
  const { url } = usePage(); // Get the current URL from Inertia
  const { auth } = usePage<SharedData>().props;

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={true}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className=
          'ml-auto w-full max-w-full peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] transition-[width] duration-200 ease-linear flex h-svh flex-col group-data-[scroll-locked=1]/body:h-full group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'>
          {/* Products pages */}
          {url === "/product/rental" && <Rentax />}
          {url === "/product/carter" && <Carter />}
          {url === "/product/shuttle-bus" && <ShuttleBus />}
          {url === "/product/travel" && <Travel />}
          {url === "/product/delivery" && <Delivery />}

          {/* CMS */}
          {url === "/cms/tags" && <Tags />}
          {url === "/cms/promo" && <Promo />}
          {url === "/cms/post" && <Post />}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}