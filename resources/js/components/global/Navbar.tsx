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
    { label: "Home", icon: IconHomeFilled },
    { label: "Product", icon: IconStack2Filled },
    { label: "Blog", icon: IconNews },
    { label: "About", icon: IconInfoSquareFilled },
  ]
  
  function MenuLink({ label, Icon }: { label: string; Icon: React.ElementType }) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink className="hover:bg-blue-300 rounded-lg flex flex-col items-center text-white px-2 py-1">
          <Icon size={30} color="white" />
          <span className="text-xs mt-1">{label}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    )
  }
  
  export function DesktopNavBar() {
    return (
      <div className="bg-blue-400 absolute top-0 left-0 right-0 p-4 flex items-center justify-center h-fit">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((item) => (
              <MenuLink key={item.label} label={item.label} Icon={item.icon} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    )
  }
  
  export function MobileNavBar() {
    return (
      <div className="bg-blue-400 fixed bottom-0 w-full p-2 flex items-center justify-center h-fit rounded-t-4xl">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-5 justify-center">
            {menuItems.map((item) => (
              <MenuLink key={item.label} label={item.label} Icon={item.icon} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    )
  }
  