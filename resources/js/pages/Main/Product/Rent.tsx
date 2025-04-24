import * as React from 'react';
import { useState } from 'react';
import MainProduct from './MainProduct';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { RentalCard } from '@/components/global/RentalCard';
import { Button } from '@/components/ui/button';

export interface Event {
  id: number;
  name: string;
  poster_img: string;
}

export interface Rental {
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

interface RentProps {
  events: Event[];
  rentals: Rental[];
}

function Rent({ events, rentals }: RentProps) {
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [useDriver, setUseDriver] = useState(false);
  const firstLocationId = rentals[0]?.location.id ?? 'all';
  const [selectedLocation, setSelectedLocation] = useState<'all' | number>(firstLocationId);

  const itemsPerPage = 9;

  // Get unique locations for the dropdown
  const locations = Array.from(new Set(rentals.map((r) => r.location.id)))
    .map((id) => {
      const match = rentals.find((r) => r.location.id === id);
      return match?.location;
    })
    .filter(Boolean);

  // Filter by location
  const filteredRentals =
    selectedLocation === 'all'
      ? rentals
      : rentals.filter((r) => r.location.id === selectedLocation);

  // Sort
  const sortedRentals = [...filteredRentals].sort((a, b) =>
    sortDirection === 'asc' ? a.price - b.price : b.price - a.price
  );

  // Pagination
  const totalItems = sortedRentals.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleRentals = sortedRentals.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <PromoCarousel events={events} />

      <h1 className="text-4xl font-bold my-7 text-center">Rental Mobil Balikpapan</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Button onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Sort by Price ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
        </Button>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useDriver}
            onChange={(e) => setUseDriver(e.target.checked)}
          />
          Use Driver
        </label>

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
        {visibleRentals.map((rental) => (
          <RentalCard
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

Rent.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Rent;
