import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import {
    IconBarrierBlock,
    IconBrandMetabrainz,
    IconBrowserCheck,
    IconBug,
    IconBus,
    IconCamper,
    IconCar,
    IconCarCrane,
    IconCarFanAuto,
    IconCarGarage,
    IconDashboard,
    IconDashboardFilled,
    IconDatabase,
    IconError404,
    IconHelp,
    IconLock,
    IconMapPin,
    IconMessageReport,
    IconNews,
    IconNotification,
    IconPalette,
    IconPin,
    IconServerOff,
    IconSettings,
    IconShoppingCart,
    IconSocial,
    IconTag,
    IconTicket,
    IconTool,
    IconTruckDelivery,
    IconUserCog,
    IconUserOff,
    IconUsers,
  } from '@tabler/icons-react'
import { SidebarData } from '../layout/types'

export const sidebarData: SidebarData = {
    user: {
      name: 'Stardust Studio',
      email: 'starduststudio@hotmail.com',
      avatar: 'https:github.com/StarsdustStudios/Bioway/blob/Frontend-test/resources/js/assets/logo.png?raw=true',
    },
    teams: [
      {
        name: 'Bioway Admin',
        logo: Command,
        plan: 'Laravel + Vite + ShadcnUI',
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
        title: 'Dashboard',
        items: [
          {
            title: 'Dashboard',
            icon: IconDashboardFilled,
            url: '/dashboard',
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
                url: '/cms/tags',
              },
              {
                title: 'Event',
                icon: IconTicket,
                url: '/cms/events',
              },
              {
                title: 'Post',
                icon: IconMessageReport,
                url: '/cms/post',
              },
            ],
          },
          // {
          //   title: 'Users',
          //   url: '/users',
          //   icon: IconUsers,
          // },
        ],
      },
      {
        title: 'Lainnya',
        items: [
          {
            title: 'Data',
            icon: IconDatabase,
            items: [
              {
                title: 'Brand',
                icon: IconBrandMetabrainz,
                url: '/product/brands',
              },
              {
                title: 'Mobil',
                icon: IconCarCrane,
                url: '/product/cars',
              },
              {
                title: 'Lokasi',
                icon: IconMapPin,
                url: '/product/locations',
              },
              {
                title: 'Mitra',
                icon: IconSocial,
                url: '/product/partners',
              },
            ]
          }
        ]
      },
      // {
      //   title: 'Pages',
      //   items: [
      //     {
      //       title: 'Errors',
      //       icon: IconBug,
      //       items: [
      //         {
      //           title: 'Unauthorized',
      //           url: '/401',
      //           icon: IconLock,
      //         },
      //         {
      //           title: 'Forbidden',
      //           url: '/403',
      //           icon: IconUserOff,
      //         },
      //         {
      //           title: 'Not Found',
      //           url: '/404',
      //           icon: IconError404,
      //         },
      //         {
      //           title: 'Internal Server Error',
      //           url: '/500',
      //           icon: IconServerOff,
      //         },
      //         {
      //           title: 'Maintenance Error',
      //           url: '/503',
      //           icon: IconBarrierBlock,
      //         },
      //       ],
      //     },
      //   ],
      // },
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