import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    IconCar,
    IconUsersGroup,
    IconBus,
    IconLocation,
    IconTruckDelivery
} from "@tabler/icons-react"

// import { Inertia } from "@inertiajs/inertia"
import { Link, usePage } from "@inertiajs/react"

const menuItems = [
    { label: "Rental", icon: IconCar, path: '/produk/rental' },
    { label: "Carter", icon: IconUsersGroup, path: '/produk/carter' },
    { label: "Shuttle Bus", icon: IconBus, path: '/produk/shuttle-bus' },
    { label: "Travel", icon: IconLocation, path: '/produk/travel' },
    { label: "Delivery", icon: IconTruckDelivery, path: '/produk/delivery' },
]

export function ProductNav() {
    const { url } = usePage()

    return (
        <Menubar className="mt-4 md:p-10 flex flex-wrap p-4 bg-blue-400 h-fit rounded-2xl justify-center items-center gap-3 md:gap-5 ">
            {menuItems.map((item) => {
                return (
                    <MenubarMenu key={item.path}>
                        <Link href={item.path} className="">
                            <MenubarTrigger className={` `}>
                                <div className="flex bg-amber-50 flex-col items-center aspect-square justify-center md:p-2 p-3 md:!w-30 md:!h-30 rounded-2xl hover:text-white hover:bg-blue-300 hover:scale-105 transition-all duration-200 ease-in-out text-center text-xs md:text-base text-blue-500 font-bold !w-18 !h-18"> 
                                    <item.icon className="" />
                                    {item.label}
                                </div>
                            </MenubarTrigger>
                        </Link>
                    </MenubarMenu>
                )
            })}
        </Menubar>
    )
}
