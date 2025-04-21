import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { IconCar, IconUsersGroup, IconBus, IconLocation, IconTruckDelivery, IconMap2 } from '@tabler/icons-react';

// import { Inertia } from "@inertiajs/inertia"
import { Link, usePage } from '@inertiajs/react';

const menuItems = [
    { label: 'Rental', icon: IconCar, path: '/produk/rental' },
    { label: 'Carter', icon: IconUsersGroup, path: '/produk/carter' },
    { label: 'Shuttle Bus', icon: IconBus, path: '/produk/shuttle-bus' },
    // { label: "Travel", icon: IconLocation, path: '/produk/travel' },
    { label: 'Tour', icon: IconMap2, path: '/produk/tour' },
    { label: 'Delivery', icon: IconTruckDelivery, path: '/produk/delivery' },
];

export function ProductNav() {
    const { url } = usePage();

    return (
        <Menubar
            className="
                flex flex-wrap
                h-fit
                mt-4 p-4
                bg-blue-500
                rounded-2xl
                justify-center items-center gap-3
                md:p-10 md:gap-5
            "
        >
            {menuItems.map((item) => {
                return (
                    <MenubarMenu key={item.path}>
                        <Link
                            href={item.path}
                            className="
                                "
                                >
                                <MenubarTrigger
                                className={`
                            `}
                            >
                                <div
                                    className="
                                        flex flex-col
                                        p-3
                                        text-center text-xs text-blue-500 font-bold
                                        bg-amber-50
                                        rounded-2xl
                                        transition-all
                                        items-center aspect-square justify-center 
                                        hover:scale-110 hover:text-white hover:bg-blue-300
                                        duration-200 ease-in-out !w-18 !h-18
                                        md:p-2 md:text-base md:!w-30 md:!h-30
                                    "
                                >
                                    <item.icon
                                        className="

                                        "
                                    />
                                    {item.label}
                                </div>
                            </MenubarTrigger>
                        </Link>
                    </MenubarMenu>
                );
            })}
        </Menubar>
    );
}
