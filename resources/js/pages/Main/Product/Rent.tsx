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
  const itemsPerPage = 9;
  const totalItems = rentals.length; // Get the total number of rentals
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisibleIndexes = () => {
    const start = (page - 1) * itemsPerPage;
    return rentals.slice(start, start + itemsPerPage);
  };

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <PromoCarousel events={events} />

      <h1 className="text-4xl font-bold my-7 text-center">Rental Mobil Balikpapan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {getVisibleIndexes().map((rental) => (
          <RentalCard
            key={rental.id}
            carName={rental.car.model}
            carImage={rental.car.car_image}
            seatCount={rental.car.seat}
            luggageCount={rental.car.luggage}
            price={rental.price}
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
      <div className="mb-20"></div>
    </>
  );
}

Rent.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Rent;
