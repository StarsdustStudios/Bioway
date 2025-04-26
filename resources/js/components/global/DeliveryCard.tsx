import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBriefcase2, IconArmchair, IconBox, IconMapPin } from "@tabler/icons-react";

interface DeliveryCardProps {
  location: string;  
  luggageCount: string;
  price: number;
}

export function DeliveryCard({
  location,
  luggageCount,
  price,
}: DeliveryCardProps) {
  return (
    <Card className="flex p-4 gap-2 rounded-2xl shadow-md border-blue-300">
      <h2 className="md:text-xl text-sm font-semibold py-0">Delivery kapasitas {luggageCount}</h2>
      <div className="flex items-center gap-4 py-0">
        <div className="aspect-video max-w-56">
          <IconBox size={100} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-4 md:text-sm text-xs font-bold">
            <span className="flex items-center gap-1">
              <IconMapPin size={18} /> {location}
            </span>
          </div>
          <p className="md:text-lg text-[15px] font-bold text-black">
            Rp {price.toLocaleString('id-ID')} / Hari
          </p>
          <Button className="w-fit mt-2 bg-blue-600 hover:bg-blue-700 text-white md:text-base text-xs">
            ORDER SEKARANG
          </Button>
        </div>
      </div>
    </Card>
  );
}
