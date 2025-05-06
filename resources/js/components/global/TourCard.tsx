import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBriefcase2, IconArmchair } from "@tabler/icons-react";

interface Location {
  id: number;
  city_name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    tour_id: number;
    location_id: number;
    id: number;
  };
}

interface TourCardProps {
  startLocation: string; // Start location ID
  title: string;
  desc: string;
  price: number;
  tour_image: string;
  passenger: number;
  luggage: number;
  locations: Location[];
}

export function TourCard({
  startLocation,
  title,
  desc,
  price,
  tour_image,
  passenger,
  luggage,
  locations
}: TourCardProps) {
  // Find the starting location name from the locations array

  return (
    <Card className="flex p-4 gap-4 rounded-2xl shadow-md border-blue-300">
      <div className="items-center gap-4 py-0">
        <h2 className="md:text-2xl mb-3 text-sm font-semibold text-center">{title}</h2>
        <div className="aspect-video max-w-72 items-center mx-auto">
          <img
            src={tour_image} // Corrected from carImage to tour_image
            alt={title} // Corrected from carName to title
            className="object-cover w-full h-full rounded-md mx-auto"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">

          <p className="text-xs text-gray-500">{desc}</p>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1">
              <IconArmchair size={18} /> {passenger}
            </span>
            <span className="flex items-center gap-1">
              <IconBriefcase2 size={18} /> {luggage}
            </span>
          </div>
          <p className="md:text-lg text-base font-bold text-black">
            Rp {price.toLocaleString('id-ID')} / Hari
          </p>
          <p className="text-xs text-gray-600">Lokasi Awal: {startLocation}</p>
          <p className="text-xs text-gray-600">
            Rute: {locations
              .slice()
              .sort((a, b) => a.pivot.id - b.pivot.id)
              .map((loc) => loc.city_name)
              .join(' - ')}
          </p>
          <Button className="w-fit mt-2 bg-blue-600 hover:bg-blue-700 text-white md:text-base text-xs mx-auto">
            ORDER SEKARANG
          </Button>
        </div>
      </div>
    </Card>
  );
}
