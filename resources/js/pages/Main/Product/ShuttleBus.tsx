import MainLayout from './MainProduct'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { PromoCarousel } from '@/components/global/PromoCarousel'
import { ShuttleBusCard } from '@/components/global/ShuttleBusCard'

export interface Event {
  id: number
  name: string
  poster_img: string
}

export interface ShuttleBuses {
  id: number
  from_location: {
    id: number
    city_name: string
  }
  to_location: {
    id: number
    city_name: string
  }
  price: number
  created_at: string
  updated_at: string
  car: {
    id: number
    model: string
    car_image: string
    luggage: number
    seat: number
  }
}

interface ShuttleBusProps {
  events: Event[];
  shuttleBuses: ShuttleBuses[];
}

function ShuttleBus({ events, shuttleBuses }: ShuttleBusProps) {
  const locations = Array.from(
    new Map(
      shuttleBuses.flatMap((shuttle) => [
        [shuttle.from_location.id, shuttle.from_location],
        [shuttle.to_location.id, shuttle.to_location]
      ])
    ).values()
  )

  const [selectedFrom, setSelectedFrom] = useState<number>(0)
  const [selectedTo, setSelectedTo] = useState<number>(0)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (locations.length > 0 && selectedFrom === 0 && selectedTo === 0) {
      setSelectedFrom(locations[0].id)
      setSelectedTo(locations[0].id)
    }
  }, [locations, selectedFrom, selectedTo])
  

  const filteredShuttles = shuttleBuses.filter((shuttle) => {
    const matchFrom = shuttle.from_location.id === selectedFrom
    const matchTo = shuttle.to_location.id === selectedTo
    return matchFrom && matchTo
  })

  const sortedShuttles = filteredShuttles.sort((a, b) => {
    if (sortDirection === 'asc') return a.price - b.price
    else return b.price - a.price
  })

  const itemsPerPage = 6
  const totalPages = Math.max(1, Math.ceil(sortedShuttles.length / itemsPerPage))
  const visibleShuttles = sortedShuttles.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const handleFromChange = (value: string) => {
    setSelectedFrom(parseInt(value))
    setPage(1)
  }

  const handleToChange = (value: string) => {
    setSelectedTo(parseInt(value))
    setPage(1)
  }

  return (
    <>
      <h1 className="text-4xl font-bold my-7">Promo Hari Ini</h1>
      <div>
        <PromoCarousel events={events} />
      </div>

      <h1 className="text-4xl font-bold my-7">
        Shuttle Bus dari {locations.find((loc) => loc.id === selectedFrom)?.city_name || '-'} ke {locations.find((loc) => loc.id === selectedTo)?.city_name || '-'}
      </h1>

      <div className="md:flex grid grid-cols-2 justify-between md:w-4/5 items-center gap-4 mb-12">
        <Button
          className="bg-blue-500 hover:bg-blue-400"
          onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
        >
          Sort by Price ({sortDirection === 'asc' ? 'Asc' : 'Desc'})
        </Button>

        {locations.length > 0 ? (
          <div className="flex gap-2">
            <select
              className="border rounded px-3 py-1"
              value={selectedFrom}
              onChange={(e) => handleFromChange(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.city_name}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-3 py-1"
              value={selectedTo}
              onChange={(e) => handleToChange(e.target.value)}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.city_name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Loading locations...</div>
        )}
      </div>

      {visibleShuttles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleShuttles.map((shuttle) => (
            <ShuttleBusCard
              key={shuttle.id}
              carName={shuttle.car.model}
              carImage={shuttle.car.car_image}
              seatCount={shuttle.car.seat}
              luggageCount={shuttle.car.luggage}
              price={shuttle.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center font-semibold text-gray-500 mt-20">
          No shuttle found for this route.
        </div>
      )}

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
  )
}

ShuttleBus.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default ShuttleBus
