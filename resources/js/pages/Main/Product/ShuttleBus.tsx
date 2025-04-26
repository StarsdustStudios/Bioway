import MainLayout from './MainProduct'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PromoCarousel } from '@/components/global/PromoCarousel'

export interface Event {
    id: number
    name: string
    poster_img: string
}
function ShuttleBus({ events }: { events: Event[] }) {
    return (
        <>
            <h1 className='text-4xl font-bold my-7'>Promo Hari Ini</h1>
            <div>
                <PromoCarousel events={events} />
            </div>

            <h1 className='text-4xl font-bold my-7'>Shuttle Bus dari ** ke **</h1>

            {/* <div className="md:flex grid grid-cols-2 justify-between md:w-4/5 items-center gap-4 mb-12">
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
            </div>  */}

            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
            </div> */}


            {/* <div className="flex justify-center gap-4 mt-6">
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

            <div className="mb-20" /> */}
        </>
    )
}

ShuttleBus.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default ShuttleBus
