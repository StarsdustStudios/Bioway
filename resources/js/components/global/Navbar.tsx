import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  IconHomeFilled,
  IconStack2Filled,
  IconNews,
  IconInfoSquareFilled,
} from "@tabler/icons-react"

const menuItems = [
  { label: "Home", icon: IconHomeFilled, path: "/" },
  { label: "Product", icon: IconStack2Filled, path: "/produk/rental" },
  { label: "Blog", icon: IconNews, path: "/blog/" },
  { label: "About", icon: IconInfoSquareFilled, path: "/profil" },
]

import { Link, usePage } from "@inertiajs/react"


function MenuLink({ label, Icon }: { label: string; Icon: React.ElementType }) {
  return (
    <NavigationMenuItem className="">
      <NavigationMenuLink className="hover:text-white mx-2 hover:bg-blue-400 hover:scale-110 duration-300 ease-in-out flex rounded-lg items-center text-white px-2 py-1">
        <Icon color="white" className="!w-5 !h-5" />
        <span className="text-md mt-1">{label}</span>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export function DesktopNavBar() {
  const { url } = usePage()

  return (
    <div className="bg-blue-400 top-0 left-0 right-0 py-2 px-56 h-fit flex">
      <div className="w-fit flex items-center">
        <h1 className="text-white text-xl text-bold">Bioway Logo</h1>
      </div>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <Link href={item.path || "#"} className="">
              <MenuLink key={item.label} label={item.label} Icon={item.icon} />
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export function MobileNavBar() {
  const { url } = usePage()

  return (
    <div className="bg-blue-400 fixed bottom-0 w-full p-2 flex items-center justify-center h-fit rounded-t-4xl">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-5 justify-center">
          {menuItems.map((item) => (
            <Link href={item.path || "#"} className="">
              <MenuLink key={item.label} label={item.label} Icon={item.icon} />
            </Link>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
