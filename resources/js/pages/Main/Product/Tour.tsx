import * as React from 'react';
import { useState } from 'react';
import MainProduct from './MainProduct';
import { PromoCarousel } from '@/components/global/PromoCarousel';
import { TourCard } from '@/components/global/TourCard';
import { Button } from '@/components/ui/button';

export interface Event {
  id: number;
  name: string;
  poster_img: string;
}

export interface Location {
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

export interface Tours {
  id: number;
  start: number;  // start is still a number (location ID)
  title: string;
  desc: string;
  price: number;
  tour_image: string;
  passenger: number;
  luggage: number;
  locations: Location[];
  created_at: string;
  updated_at: string;
}

interface TourProps {
  events: Event[];
  tours: Tours[];
  locations: Location[];
}

function Tour({ events, tours, locations }: TourProps) {
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [useDriver, setUseDriver] = useState(false);
  const firstLocationId = tours[0]?.locations[0].id ?? 'all'; // Fixed access to location
  const [selectedLocation, setSelectedLocation] = useState<'all' | number>(firstLocationId);

  const itemsPerPage = 9;

  const locationsSet = Array.from(new Set(tours.flatMap((r) => r.locations.map((loc) => loc.id)))).map((id) => {
    const match = tours.find((r) => r.locations.some((loc) => loc.id === id));
    return match?.locations.find((loc) => loc.id === id);
  }).filter(Boolean);

  // Find the city name for the start location (location ID)

  const filteredTours =
    selectedLocation === 'all'
      ? tours
      : tours.filter((r) => r.locations.some((loc) => loc.id === selectedLocation));

  // Sort
  const sortedTours = [...filteredTours].sort((a, b) =>
    sortDirection === 'asc' ? a.price - b.price : b.price - a.price
  );

  // Pagination
  const totalItems = sortedTours.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visibleTours = sortedTours.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <div>
        <PromoCarousel events={events} />
      </div>

      <h1 className="text-4xl font-bold my-7 mt-20 text-center">Tour Mobil Balikpapan</h1>

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
          <option value="all">All Locations</option>
          {locationsSet?.map((loc) => (
            <option key={loc!.id} value={loc!.id}>
              {loc!.city_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {visibleTours.map((tour) => (
  <TourCard
    key={tour.id}
    startLocation={locations.find((loc) => loc.id === tour.start)?.city_name ?? 'Unknown Location'}
    title={tour.title}
    desc={tour.desc}
    price={tour.price}
    tour_image={tour.tour_image}
    passenger={tour.passenger}
    luggage={tour.luggage}
    locations={tour.locations}
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

Tour.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Tour;
