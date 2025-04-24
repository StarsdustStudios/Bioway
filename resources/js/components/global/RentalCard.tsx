import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBriefcase2, IconArmchair } from "@tabler/icons-react";

interface RentalCardProps {
  carName: string;
  carImage: string;
  seatCount: number;
  luggageCount: number;
  price: number;
}

export function RentalCard({
  carName,
  carImage,
  seatCount,
  luggageCount,
  price,
}: RentalCardProps) {
  return (
    <Card className="flex p-4 gap-4 rounded-2xl shadow-md border-blue-300">
      <div className="flex items-center gap-4 py-0">
        <div className="aspect-video max-w-56">
          <img
            src={carImage}
            alt={carName}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h2 className="md:text-md text-sm font-semibold">{carName}</h2>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1">
              <IconArmchair size={18} /> {seatCount}
            </span>
            <span className="flex items-center gap-1">
              <IconBriefcase2 size={18} /> {luggageCount}
            </span>
          </div>
          <p className="md:text-lg text-base font-bold text-black">
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
