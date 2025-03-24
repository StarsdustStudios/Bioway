
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Rental from './product/Rental';
import Carter from './product/Carter';
import ShuttleBus from './product/ShuttleBus';
import Travel from './product/Travel';
import Delivery from './product/Delivery';
import Tags from './cms/Tags';
import Promo from './cms/Promo';
import Post from './cms/Post';


export default function Welcome() {
  const { url } = usePage(); // Get the current URL from Inertia
  const { auth } = usePage<SharedData>().props;
  return (
    <SidebarProvider>
       <div className="flex min-h-screen"> {/* Flex container */}
        <AppSidebar/>
        <main className="flex-grow p-4"> 
        {/* Products pages */}
        {url === "/product/rental" && <Rental/>}
        {url === "/product/carter" && <Carter/>}
        {url === "/product/shuttle-bus" && <ShuttleBus/>}
        {url === "/product/travel" && <Travel/>}
        {url === "/product/delivery" && <Delivery/>}

        {/* CMS */}
        {url === "/cms/tags" && <Tags/>}
        {url === "/cms/promo" && <Promo/>}
        {url === "/cms/post" && <Post/>}
        </main>
      </div>
      <AppSidebar/>
      
    </SidebarProvider>
  );
}