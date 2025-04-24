import * as React from 'react';
import { useState } from 'react';
import MainProduct from './MainProduct';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { CarterCard } from '@/components/global/CarterCard';
import { Button } from '@/components/ui/button';

export interface Event {
  id: number;
  name: string;
  poster_img: string;
}

export interface Carters {
  id: number;
  car_id: number;
  location_id: number;
  price: number;
  driver_fee: number;
  created_at: string;
  updated_at: string;
  car: {
    id: number;
    model: string;
    brand_id: number;
    car_image: string;
    luggage: number;
    seat: number;
  };
  location: {
    id: number;
    city_name: string;
  };
}

interface CarterProps {
  events: Event[];
  carters: Carters[];
}

function Carter({ events, carters }: CarterProps) {
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [useDriver, setUseDriver] = useState(false);
  const firstLocationId = carters[0]?.location.id ?? 'all';
  const [selectedLocation, setSelectedLocation] = useState<'all' | number>(firstLocationId);
  
  const itemsPerPage = 9;

  const locations = Array.from(new Set(carters.map((r) => r.location.id)))
    .map((id) => {
      const match = carters.find((r) => r.location.id === id);
      return match?.location;
    })
    .filter(Boolean);

  const filteredCarters =
    selectedLocation === 'all'
      ? carters
      : carters.filter((r) => r.location.id === selectedLocation);

  // Sort
  const sortedCarters = [...filteredCarters].sort((a, b) =>
    sortDirection === 'asc' ? a.price - b.price : b.price - a.price
  );

  // Pagination
  const totalItems = sortedCarters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleCarters = sortedCarters.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <PromoCarousel events={events} />

      <h1 className="text-4xl font-bold my-7 text-center">Carter Mobil Balikpapan</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Button onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Sort by Price ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
        </Button>

        <select
  className="border rounded px-3 py-1"
  value={selectedLocation}
  onChange={(e) =>
    setSelectedLocation(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
  }
>
  {locations.map((loc) => (
    <option key={loc!.id} value={loc!.id}>
      {loc!.city_name}
    </option>
  ))}
</select>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {visibleCarters.map((rental) => (
          <CarterCard
            key={rental.id}
            carName={rental.car.model}
            carImage={rental.car.car_image}
            seatCount={rental.car.seat}
            luggageCount={rental.car.luggage}
            price={useDriver ? rental.price + rental.driver_fee : rental.price}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </Button>
        <span className="flex items-center font-medium">
          Page {page} of {totalPages}
        </span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      <div className="mb-20" />
    </>
  );
}

Carter.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Carter;