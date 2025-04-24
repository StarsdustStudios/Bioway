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

function Rent({ events }: { events: Event[] }) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 9;
    const totalItems = 27;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getVisibleIndexes = () => {
        const start = (page - 1) * itemsPerPage;
        return Array.from({ length: itemsPerPage }, (_, i) => start + i);
    };

    return (
        <>
            <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
            <PromoCarousel events={events} />

            <h1 className='text-4xl font-bold my-7 text-center'>Rental Mobil Balikpapan</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {getVisibleIndexes().map((i) => (
                    <RentalCard key={i} />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-6">
                <Button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                    Prev
                </Button>
                <span className="flex items-center font-medium">
                    Page {page} of {totalPages}
                </span>
                <Button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                    Next
                </Button>
            </div>

            <div className='mb-20'>

            </div>
        </>
    );
}

Rent.layout = (page: React.ReactNode) => <MainProduct>{page}</MainProduct>;

export default Rent;
