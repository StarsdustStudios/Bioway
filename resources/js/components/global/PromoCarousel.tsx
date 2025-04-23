import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"

export interface Event {
  id: number
  name: string
  poster_img: string
}

export function PromoCarousel({ events }: { events: Event[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  )

  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[plugin.current]}
      className="w-full max-w-4xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {events.map((event) => (
          <CarouselItem key={event.id} className="basis">
            <div>
              <Card className="aspect-video p-0 overflow-hidden w-full h-full">
                <CardContent className="flex items-center p-0 !h-full">
                  <img
                    src={event.poster_img}
                    alt={event.name}
                    className="!w-full !h-full object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
