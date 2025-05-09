import * as React from 'react';
import { useState } from 'react';
import MainProduct from './MainProduct';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { DeliveryCard } from '@/components/global/DeliveryCard';
import { Button } from '@/components/ui/button';

export interface Event {
  id: number;
  name: string;
  poster_img: string;
}

export interface Deliveries {
  id: number;
  location_id: number;
  size: string;
  price: number;
  created_at: string;
  updated_at: string;
  location: {
    id: number;
    city_name: string;
  };
}

interface DeliveryProps {
  events: Event[];
  deliveries: Deliveries[];
}

function Delivery({ events, deliveries }: DeliveryProps) {
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [useDriver, setUseDriver] = useState(false);
  const firstLocationId = deliveries[0]?.location.id ?? 'all';
  const [selectedLocation, setSelectedLocation] = useState<'all' | number>(firstLocationId);

  const itemsPerPage = 9;

  const locations = Array.from(new Set(deliveries.map((r) => r.location.id)))
    .map((id) => {
      const match = deliveries.find((r) => r.location.id === id);
      return match?.location;
    })
    .filter(Boolean);

  const filteredDeliveries =
    selectedLocation === 'all'
      ? deliveries
      : deliveries.filter((r) => r.location.id === selectedLocation);

  // Sort
  const sortedDeliveries = [...filteredDeliveries].sort((a, b) =>
    sortDirection === 'asc' ? a.price - b.price : b.price - a.price
  );

  // Pagination
  const totalItems = sortedDeliveries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleDeliveries = sortedDeliveries.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <div>
        <PromoCarousel events={events} />
      </div>
      
      <h1 className="text-2xl font-bold my-7 mt-20 text-center">Delivery Balikpapan</h1>

      <div className="md:flex grid grid-cols-2 justify-between md:w-4/5 items-center gap-4 mb-12">
        <Button className='bg-blue-500 hover:bg-blue-400' onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Sort by Price ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
        </Button>

        <select
          className="border rounded ml-auto px-3 py-1"
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
        {visibleDeliveries.map((delivery) => (
          <DeliveryCard
            key={delivery.id}
            location={delivery.location.city_name}
            luggageCount={delivery.size}
            price={delivery.price}
          />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button className='bg-blue-500 hover:bg-blue-400' onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </Button>
        <span className="flex items-center font-medium">
          Page {page} of {totalPages}
        </span>
        <Button className='bg-blue-500 hover:bg-blue-400' onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      <div className="mb-20" />
    </>
  );
}

Delivery.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Delivery;