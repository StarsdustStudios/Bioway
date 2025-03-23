import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

import {
  IconArrowUp,
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconBus,
  IconCamper,
  IconCar,
  IconCarGarage,
  IconChecklist,
  IconDashboard,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessageReport,
  IconMessages,
  IconNews,
  IconNotes,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconShoppingCart,
  IconTag,
  IconTicket,
  IconTool,
  IconTruckDelivery,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'

import { NavUser } from '@/components/nav-user';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '@/components/layout/types'
import { TeamSwitcher } from '@/components/team-switcher';
import { NavNormal } from '@/components/nav-normal';
import { NavGroup } from '@/components/nav-group';

const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'Admin Panel',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Produk',
          icon: IconShoppingCart,
          items: [
            {
              title: 'Rental',
              icon: IconCar,
              url: '/product/rental',
            },
            {
              title: 'Carter',
              icon: IconCarGarage,
              url: '/product/carter',
            },
            {
              title: 'Shuttle Bus',
              icon: IconBus,
              url: '/product/shuttle-bus',
            },
            {
              title: 'Travel',
              icon: IconCamper,
              url: '/product/travel',
            },
            {
              title: 'Delivery',
              icon: IconTruckDelivery,
              url: '/product/delivery',
            },
          ],
        },
        {
          title: 'CMS',
          icon: IconNews,
          items: [
            {
              title: 'Tags',
              icon: IconTag,
              url: '/sign-in',
            },
            {
              title: 'Promo',
              icon: IconTicket,
              url: '/sign-in-2',
            },
            {
              title: 'Artikel/Berita',
              icon: IconMessageReport,
              url: '/sign-up',
            },
          ],
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}


const item = {
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    url: '/'}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  return (
    <SidebarProvider>
      <Head title="Welcome">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="flex h-screen">
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Top Navigation */}
          <div className="border-b p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Welcome, {auth?.user?.name || 'Guest'}</h1>
            <Button asChild>
              <Link href={auth ? '/dashboard' : '/login'}>
                {auth ? 'Go to Dashboard' : 'Sign In'}
              </Link>
            </Button>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <Card>
              <CardContent>
                <p>Welcome to the dashboard!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}